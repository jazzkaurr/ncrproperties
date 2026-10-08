import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import {
  DISPLAY_PHONE,
  TEL_LINK,
  getWhatsAppUrl,
  CTA_WHATSAPP_MESSAGE,
} from '../data/properties';

export const CTA: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-[#1B3B2B] text-[#F7F5F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs sm:text-sm font-medium text-[#D9BD8B] mb-3">
          Direct Property Assistance
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F7F5F0] mb-4">
          Looking for a Farmhouse in NCR?
        </h2>
        <p className="text-base sm:text-lg text-[#F7F5F0]/85 max-w-2xl mx-auto mb-8 leading-relaxed">
          Tell us your requirements and let us help you explore suitable property options.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
          <a
            href={TEL_LINK}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm sm:text-base font-semibold text-[#141615] bg-[#D9BD8B] hover:bg-[#c9ab76] rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F5F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B3B2B]"
          >
            <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Call {DISPLAY_PHONE}</span>
          </a>

          <a
            href={getWhatsAppUrl(CTA_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm sm:text-base font-semibold text-[#F7F5F0] bg-[#141615] hover:bg-[#181A18] border border-[#F7F5F0]/20 rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9BD8B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B3B2B]"
          >
            <MessageCircle className="w-5 h-5 text-[#D9BD8B] shrink-0" aria-hidden="true" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
    </section>
  );
};
