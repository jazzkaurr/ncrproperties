import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Limit JSON payload size to prevent malformed/large payload attacks
app.use(express.json({ limit: '16kb' }));

// Security headers middleware
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Simple in-memory rate limiter per IP (protects against excessive requests & spam)
interface RateRecord {
  count: number;
  resetTime: number;
}
const rateLimitStore = new Map<string, RateRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 10;

function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown';

  const now = Date.now();
  const record = rateLimitStore.get(clientIp);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      error:
        'Too many enquiry requests from this connection. Please wait a few minutes or contact us directly on WhatsApp at +91 98999 90140.',
    });
  }

  record.count += 1;
  return next();
}

// Input sanitization helper to strip HTML tags, control chars, and prevent injection
function sanitizeString(input: unknown, maxLength = 300): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>?/gm, '') // strip HTML tags
    .replace(/[\u0000-\u001F\u007F]/g, ' ') // strip control characters
    .trim()
    .slice(0, maxLength);
}

// Validate Indian mobile number (accepts 10 digits starting with 6-9, with optional +91 or 0 prefix)
function cleanAndValidateIndianPhone(rawPhone: string): string | null {
  const digitsOnly = rawPhone.replace(/\D/g, '');
  let normalized = digitsOnly;

  if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    normalized = digitsOnly.slice(2);
  } else if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
    normalized = digitsOnly.slice(1);
  }

  if (/^[6-9]\d{9}$/.test(normalized)) {
    return normalized;
  }
  return null;
}

const ALLOWED_LOCATIONS = [
  'Faridabad',
  'Gurgaon / Gurugram',
  'Delhi NCR',
  'Palwal',
  'Sohna',
  'Other',
];

const ALLOWED_PROPERTY_TYPES = [
  'Farmhouse',
  'Luxury Farmhouse',
  'Farm Land',
  'Weekend Home',
  'Other',
  '',
];

app.post('/api/enquiries', rateLimiter, async (req: Request, res: Response) => {
  try {
    const body = req.body || {};

    // Honeypot check for automated spam bots
    if (body.companyWebsite && String(body.companyWebsite).trim().length > 0) {
      // Silently return success to fool bots without processing
      return res.status(200).json({
        success: true,
        message: 'Thank you! Your enquiry has been received.',
      });
    }

    const fullName = sanitizeString(body.fullName, 100);
    const rawMobile = sanitizeString(body.mobileNumber, 20);
    const preferredLocation = sanitizeString(body.preferredLocation, 60);
    const propertyType = sanitizeString(body.propertyType, 60);
    const budget = sanitizeString(body.budget, 80);
    const requirement = sanitizeString(body.requirement, 600);
    const selectedPropertyTitle = sanitizeString(body.selectedPropertyTitle, 150);
    const consentAccepted = Boolean(body.consentAccepted);

    if (!fullName || fullName.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your name.',
      });
    }

    const validMobile = cleanAndValidateIndianPhone(rawMobile);
    if (!validMobile) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid 10-digit Indian mobile number.',
      });
    }

    if (!preferredLocation || !ALLOWED_LOCATIONS.includes(preferredLocation)) {
      return res.status(400).json({
        success: false,
        error: 'Please select a preferred location.',
      });
    }

    if (propertyType && !ALLOWED_PROPERTY_TYPES.includes(propertyType)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid property type selected.',
      });
    }

    if (!consentAccepted) {
      return res.status(400).json({
        success: false,
        error: 'Please agree to be contacted regarding your property enquiry.',
      });
    }

    // Build formatted WhatsApp lead message
    const messageLines = [
      'New Farmhouse Enquiry',
      '',
      `Name: ${fullName}`,
      `Phone: ${validMobile}`,
      `Preferred Location: ${preferredLocation}`,
      `Property Type: ${propertyType || 'Not specified'}`,
      `Budget: ${budget || 'Not specified'}`,
    ];

    if (selectedPropertyTitle) {
      messageLines.push(`Reference Listing: ${selectedPropertyTitle}`);
    }

    if (requirement) {
      messageLines.push(`Requirement: ${requirement}`);
    }

    messageLines.push('', 'Please contact the customer.');

    const whatsappMessage = messageLines.join('\n');
    const whatsappUrl = `https://wa.me/919899990140?text=${encodeURIComponent(whatsappMessage)}`;

    // Optional server-side CRM / Webhook integration if configured via environment variables
    const webhookUrl = process.env.ENQUIRY_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.startsWith('https://')) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: 'NCR Properties Website',
            submittedAt: new Date().toISOString(),
            fullName,
            mobileNumber: validMobile,
            preferredLocation,
            propertyType: propertyType || 'Not specified',
            budget: budget || 'Not specified',
            selectedPropertyTitle: selectedPropertyTitle || null,
            requirement: requirement || null,
            consentAccepted,
          }),
        });
      } catch (webhookErr) {
        console.error('Optional CRM webhook error:', webhookErr);
      }
    }

    return res.status(200).json({
      success: true,
      message:
        'Thank you! Your enquiry has been received. Our property team will contact you shortly.',
      whatsappUrl,
    });
  } catch (error) {
    console.error('Error processing enquiry:', error);
    return res.status(500).json({
      success: false,
      error:
        'Something went wrong. Please try again or contact us directly on WhatsApp at +91 98999 90140.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NCR Properties server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
