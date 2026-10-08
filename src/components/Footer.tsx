import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import {
  BUSINESS_NAME,
  DISPLAY_PHONE,
  TEL_LINK,
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
} from '../data/properties';

interface FooterProps {
  onNavigateHome: () => void;
  onOpenLegalPage: (page: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome, onOpenLegalPage }) => {
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Farmhouses', href: '#farmhouses' },
    { label: 'Locations', href: '#locations' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigateHome();
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 30);
  };

  return (
    <footer className="bg-[#141615] text-[#F7F5F0] border-t border-[#F7F5F0]/10 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div>
            <a
              href="#home"
              onClick={(e) => handleAnchorClick(e, '#home')}
              className="font-serif text-2xl sm:text-3xl font-semibold text-[#F7F5F0] inline-block mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9BD8B] rounded-xs"
            >
              {BUSINESS_NAME}
            </a>
            <p className="text-sm text-[#F7F5F0]/75 leading-relaxed mb-4">
              Farmhouse &amp; property options across NCR.
            </p>
            <p className="text-xs text-[#D9BD8B]">
              Faridabad • Gurgaon • Delhi NCR • Palwal • Sohna
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#F7F5F0] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className="text-[#F7F5F0]/75 hover:text-[#D9BD8B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9BD8B] rounded-xs"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#F7F5F0] mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={TEL_LINK}
                  className="inline-flex items-center gap-2 text-[#F7F5F0]/80 hover:text-[#D9BD8B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9BD8B] rounded-xs"
                >
                  <Phone className="w-4 h-4 text-[#D9BD8B] shrink-0" aria-hidden="true" />
                  <span>{DISPLAY_PHONE}</span>
                </a>
              </li>
              <li>
                <a
                  href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#F7F5F0]/80 hover:text-[#D9BD8B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9BD8B] rounded-xs"
                >
                  <MessageCircle className="w-4 h-4 text-[#D9BD8B] shrink-0" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#F7F5F0] mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalPage('privacy')}
                  className="text-[#F7F5F0]/75 hover:text-[#D9BD8B] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9BD8B] rounded-xs"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegalPage('terms')}
                  className="text-[#F7F5F0]/75 hover:text-[#D9BD8B] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9BD8B] rounded-xs"
                >
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-[#F7F5F0]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F5F0]/60">
          <p>© 2026 NCR Properties. All rights reserved.</p>
          <p>
            Independent legal and documentation verification is recommended prior to any property
            transaction.
          </p>
        </div>
      </div>
    </footer>
  );
};
