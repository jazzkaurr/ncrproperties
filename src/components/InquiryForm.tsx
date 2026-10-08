import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Loader2, MessageCircle, Send, X } from 'lucide-react';
import {
  LOCATION_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  BUDGET_OPTIONS,
  WHATSAPP_NUMBER,
  DISPLAY_PHONE,
} from '../data/properties';
import { LocationOption, PropertyTypeOption } from '../types/property';

interface InquiryFormProps {
  id?: string;
  heading?: string;
  subtext?: string;
  preselectedLocation?: LocationOption | '';
  preselectedPropertyType?: PropertyTypeOption | '';
  preselectedPropertyTitle?: string;
  onClearPreselection?: () => void;
  compact?: boolean;
}

interface FieldErrors {
  fullName?: string;
  mobileNumber?: string;
  preferredLocation?: string;
  consentAccepted?: string;
}

function validateIndianMobile(raw: string): string | null {
  const digits = raw.replace(/\D/g, '');
  let normalized = digits;
  if (digits.length === 12 && digits.startsWith('91')) {
    normalized = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    normalized = digits.slice(1);
  }
  if (/^[6-9]\d{9}$/.test(normalized)) {
    return normalized;
  }
  return null;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({
  id,
  heading = 'Looking for a Farmhouse?',
  subtext = 'Tell us what you are looking for and our property team will help you explore suitable options.',
  preselectedLocation = '',
  preselectedPropertyType = '',
  preselectedPropertyTitle = '',
  onClearPreselection,
  compact = false,
}) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [preferredLocation, setPreferredLocation] = useState<LocationOption | ''>('');
  const [propertyType, setPropertyType] = useState<PropertyTypeOption | ''>('');
  const [budget, setBudget] = useState('');
  const [requirement, setRequirement] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false); // Must NOT be preselected
  const [companyWebsite, setCompanyWebsite] = useState(''); // Honeypot spam trap

  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');

  useEffect(() => {
    if (preselectedLocation) {
      setPreferredLocation(preselectedLocation);
      setErrors((prev) => ({ ...prev, preferredLocation: undefined }));
    }
  }, [preselectedLocation]);

  useEffect(() => {
    if (preselectedPropertyType) {
      setPropertyType(preselectedPropertyType);
    }
  }, [preselectedPropertyType]);

  useEffect(() => {
    if (preselectedPropertyTitle) {
      setRequirement((prev) => {
        const prefix = `Interested in options similar to "${preselectedPropertyTitle}".`;
        if (prev.includes(preselectedPropertyTitle)) return prev;
        return prev ? `${prefix} ${prev}` : prefix;
      });
    }
  }, [preselectedPropertyTitle]);

  const validateForm = (): { valid: boolean; cleanedPhone: string | null } => {
    const newErrors: FieldErrors = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your name.';
    }

    const cleanedPhone = validateIndianMobile(mobileNumber);
    if (!cleanedPhone) {
      newErrors.mobileNumber = 'Please enter a valid mobile number.';
    }

    if (!preferredLocation) {
      newErrors.preferredLocation = 'Please select your preferred location.';
    }

    if (!consentAccepted) {
      newErrors.consentAccepted =
        'Please agree to be contacted regarding your property enquiry.';
    }

    setErrors(newErrors);
    return {
      valid: Object.keys(newErrors).length === 0,
      cleanedPhone,
    };
  };

  const buildClientWhatsAppUrl = (cleanedPhone: string): string => {
    const lines = [
      'New Farmhouse Enquiry',
      '',
      `Name: ${fullName.trim()}`,
      `Phone: ${cleanedPhone}`,
      `Preferred Location: ${preferredLocation}`,
      `Property Type: ${propertyType || 'Not specified'}`,
      `Budget: ${budget || 'Not specified'}`,
    ];

    if (preselectedPropertyTitle) {
      lines.push(`Reference Listing: ${preselectedPropertyTitle}`);
    }

    if (requirement.trim()) {
      lines.push(`Requirement: ${requirement.trim()}`);
    }

    lines.push('', 'Please contact the customer.');

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const triggerExternalLink = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const { valid, cleanedPhone } = validateForm();
    if (!valid || !cleanedPhone) {
      return;
    }

    setStatus('submitting');
    const fallbackWaUrl = buildClientWhatsAppUrl(cleanedPhone);

    try {
      const response = await fetch('./api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          mobileNumber: cleanedPhone,
          preferredLocation,
          propertyType,
          budget,
          requirement: requirement.trim(),
          selectedPropertyTitle: preselectedPropertyTitle || undefined,
          consentAccepted,
          companyWebsite,
        }),
      });

      const contentType = response.headers.get('content-type') || '';

      // If hosted on a static platform like GitHub Pages (404/405 or HTML response),
      // complete the enquiry client-side via WhatsApp lead flow.
      if (response.status === 404 || response.status === 405 || !contentType.includes('application/json')) {
        setGeneratedWhatsAppUrl(fallbackWaUrl);
        setStatus('success');
        triggerExternalLink(fallbackWaUrl);
        return;
      }

      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatus('error');
        setServerError(
          data.error ||
            `Something went wrong. Please try again or contact us directly on WhatsApp at ${DISPLAY_PHONE}.`
        );
        return;
      }

      const finalWaUrl = data.whatsappUrl || fallbackWaUrl;
      setGeneratedWhatsAppUrl(finalWaUrl);
      setStatus('success');

      // Open WhatsApp lead message to +91 98999 90140
      triggerExternalLink(finalWaUrl);
    } catch {
      // On static hosts or offline fallback, still allow seamless WhatsApp enquiry
      setGeneratedWhatsAppUrl(fallbackWaUrl);
      setStatus('success');
      triggerExternalLink(fallbackWaUrl);
    }
  };

  const handleReset = () => {
    setFullName('');
    setMobileNumber('');
    setPreferredLocation('');
    setPropertyType('');
    setBudget('');
    setRequirement('');
    setConsentAccepted(false);
    setErrors({});
    setStatus('idle');
    setServerError('');
    if (onClearPreselection) {
      onClearPreselection();
    }
  };

  return (
    <div
      id={id}
      className={`bg-white border border-[#181A18]/10 rounded-xl shadow-sm ${
        compact ? 'p-6 sm:p-8' : 'p-6 sm:p-10'
      }`}
    >
      <div className="mb-6 sm:mb-8">
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#141615] mb-2">
          {heading}
        </h2>
        <p className="text-sm sm:text-base text-[#181A18]/75 leading-relaxed">{subtext}</p>

        {preselectedPropertyTitle && (
          <div className="mt-4 flex items-center justify-between gap-3 px-4 py-2.5 bg-[#F7F5F0] border border-[#1B3B2B]/20 rounded-lg text-xs sm:text-sm text-[#1B3B2B]">
            <span>
              Enquiring regarding: <strong className="font-semibold">{preselectedPropertyTitle}</strong>
            </span>
            {onClearPreselection && (
              <button
                type="button"
                onClick={onClearPreselection}
                aria-label="Clear selected property"
                className="p-1 text-[#181A18]/60 hover:text-[#181A18] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {status === 'success' ? (
        <div
          role="status"
          aria-live="polite"
          className="bg-[#1B3B2B]/5 border border-[#1B3B2B]/25 rounded-xl p-6 sm:p-8 text-center"
        >
          <div className="w-12 h-12 rounded-full bg-[#1B3B2B] text-[#F7F5F0] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-6 h-6 text-[#D9BD8B]" aria-hidden="true" />
          </div>
          <h3 className="font-serif text-2xl font-semibold text-[#141615] mb-2">
            Enquiry Received
          </h3>
          <p className="text-sm sm:text-base text-[#181A18]/80 max-w-lg mx-auto mb-6">
            Thank you! Your enquiry has been received. Our property team will contact you shortly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {generatedWhatsAppUrl && (
              <a
                href={generatedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#F7F5F0] bg-[#1B3B2B] hover:bg-[#142C20] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
              >
                <MessageCircle className="w-4 h-4 text-[#D9BD8B]" aria-hidden="true" />
                <span>Send Enquiry on WhatsApp</span>
              </a>
            )}
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3.5 text-sm font-medium text-[#181A18] bg-[#F7F5F0] hover:bg-[#E8E4DB] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
            >
              Submit Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Honeypot field hidden from human visitors */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor={`company-website-${id || 'default'}`}>Website</label>
            <input
              id={`company-website-${id || 'default'}`}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
            />
          </div>

          {status === 'error' && serverError && (
            <div
              role="alert"
              className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3 text-red-900 text-sm"
            >
              <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="flex-1">
                <p className="font-medium">{serverError}</p>
                {generatedWhatsAppUrl && (
                  <a
                    href={generatedWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 font-semibold text-[#1B3B2B] underline hover:text-[#142C20]"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Click here to send your enquiry directly via WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* 1. Full Name */}
            <div>
              <label
                htmlFor={`fullName-${id || 'main'}`}
                className="block text-xs sm:text-sm font-semibold text-[#141615] mb-1.5"
              >
                Full Name <span className="text-red-700">*</span>
              </label>
              <input
                id={`fullName-${id || 'main'}`}
                type="text"
                required
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                }}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? `err-name-${id || 'main'}` : undefined}
                className={`w-full px-4 py-3 text-sm bg-[#F7F5F0]/60 border rounded-lg text-[#141615] placeholder-[#181A18]/45 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B3B2B] ${
                  errors.fullName ? 'border-red-600' : 'border-[#181A18]/20'
                }`}
              />
              {errors.fullName && (
                <p
                  id={`err-name-${id || 'main'}`}
                  className="mt-1.5 text-xs font-medium text-red-700 flex items-center gap-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.fullName}</span>
                </p>
              )}
            </div>

            {/* 2. Mobile Number */}
            <div>
              <label
                htmlFor={`mobileNumber-${id || 'main'}`}
                className="block text-xs sm:text-sm font-semibold text-[#141615] mb-1.5"
              >
                Mobile Number <span className="text-red-700">*</span>
              </label>
              <input
                id={`mobileNumber-${id || 'main'}`}
                type="tel"
                inputMode="numeric"
                required
                placeholder="10-digit mobile number"
                value={mobileNumber}
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                  if (errors.mobileNumber) setErrors({ ...errors, mobileNumber: undefined });
                }}
                aria-invalid={Boolean(errors.mobileNumber)}
                aria-describedby={errors.mobileNumber ? `err-phone-${id || 'main'}` : undefined}
                className={`w-full px-4 py-3 text-sm bg-[#F7F5F0]/60 border rounded-lg text-[#141615] placeholder-[#181A18]/45 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B3B2B] ${
                  errors.mobileNumber ? 'border-red-600' : 'border-[#181A18]/20'
                }`}
              />
              {errors.mobileNumber && (
                <p
                  id={`err-phone-${id || 'main'}`}
                  className="mt-1.5 text-xs font-medium text-red-700 flex items-center gap-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.mobileNumber}</span>
                </p>
              )}
            </div>

            {/* 3. Preferred Location */}
            <div>
              <label
                htmlFor={`preferredLocation-${id || 'main'}`}
                className="block text-xs sm:text-sm font-semibold text-[#141615] mb-1.5"
              >
                Preferred Location <span className="text-red-700">*</span>
              </label>
              <select
                id={`preferredLocation-${id || 'main'}`}
                required
                value={preferredLocation}
                onChange={(e) => {
                  setPreferredLocation(e.target.value as LocationOption | '');
                  if (errors.preferredLocation)
                    setErrors({ ...errors, preferredLocation: undefined });
                }}
                aria-invalid={Boolean(errors.preferredLocation)}
                aria-describedby={
                  errors.preferredLocation ? `err-loc-${id || 'main'}` : undefined
                }
                className={`w-full px-4 py-3 text-sm bg-[#F7F5F0]/60 border rounded-lg text-[#141615] transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B3B2B] ${
                  errors.preferredLocation ? 'border-red-600' : 'border-[#181A18]/20'
                }`}
              >
                <option value="">Select preferred location</option>
                {LOCATION_OPTIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              {errors.preferredLocation && (
                <p
                  id={`err-loc-${id || 'main'}`}
                  className="mt-1.5 text-xs font-medium text-red-700 flex items-center gap-1"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.preferredLocation}</span>
                </p>
              )}
            </div>

            {/* 4. Property Type */}
            <div>
              <label
                htmlFor={`propertyType-${id || 'main'}`}
                className="block text-xs sm:text-sm font-semibold text-[#141615] mb-1.5"
              >
                Property Type
              </label>
              <select
                id={`propertyType-${id || 'main'}`}
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as PropertyTypeOption | '')}
                className="w-full px-4 py-3 text-sm bg-[#F7F5F0]/60 border border-[#181A18]/20 rounded-lg text-[#141615] transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B3B2B]"
              >
                <option value="">Select property type</option>
                {PROPERTY_TYPE_OPTIONS.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Budget */}
            <div>
              <label
                htmlFor={`budget-${id || 'main'}`}
                className="block text-xs sm:text-sm font-semibold text-[#141615] mb-1.5"
              >
                Budget Range
              </label>
              <select
                id={`budget-${id || 'main'}`}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-[#F7F5F0]/60 border border-[#181A18]/20 rounded-lg text-[#141615] transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B3B2B]"
              >
                <option value="">Select budget range</option>
                {BUDGET_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* 6. Requirement / Message */}
            <div className="md:col-span-2 lg:col-span-1">
              <label
                htmlFor={`requirement-${id || 'main'}`}
                className="block text-xs sm:text-sm font-semibold text-[#141615] mb-1.5"
              >
                Requirement / Message <span className="text-[#181A18]/50 font-normal">(Optional)</span>
              </label>
              <input
                id={`requirement-${id || 'main'}`}
                type="text"
                placeholder="Plot size, bedrooms, or specific preferences"
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-[#F7F5F0]/60 border border-[#181A18]/20 rounded-lg text-[#141615] placeholder-[#181A18]/45 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1B3B2B]"
              />
            </div>
          </div>

          {/* Consent Checkbox & Submit Row */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#181A18]/10">
            <div>
              <label className="inline-flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={consentAccepted}
                  onChange={(e) => {
                    setConsentAccepted(e.target.checked);
                    if (errors.consentAccepted)
                      setErrors({ ...errors, consentAccepted: undefined });
                  }}
                  aria-invalid={Boolean(errors.consentAccepted)}
                  className="mt-1 w-4 h-4 rounded border-[#181A18]/30 text-[#1B3B2B] focus:ring-[#1B3B2B]"
                />
                <span className="text-xs sm:text-sm text-[#181A18]/80">
                  I agree to be contacted regarding my property enquiry.{' '}
                  <span className="text-red-700">*</span>
                </span>
              </label>
              {errors.consentAccepted && (
                <p className="mt-1.5 text-xs font-medium text-red-700 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.consentAccepted}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-[#F7F5F0] bg-[#1B3B2B] hover:bg-[#142C20] disabled:opacity-60 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B] focus-visible:ring-offset-2"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>Sending Enquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#D9BD8B]" aria-hidden="true" />
                  <span>Get Property Options</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
