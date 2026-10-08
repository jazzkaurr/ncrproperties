import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import {
  TEL_LINK,
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
} from '../data/properties';

export const WhatsAppButton: React.FC = () => {
  const whatsappUrl = getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);

  return (
    <>
      {/* Floating Bottom-Right WhatsApp Button (Positioned above mobile bar on small screens so it never covers content) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with NCR Properties on WhatsApp"
        className="fixed bottom-16 md:bottom-6 right-4 md:right-6 z-40 inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#1B3B2B] hover:bg-[#142C20] text-[#F7F5F0] border border-[#D9BD8B]/40 shadow-lg transition-transform duration-150 hover:scale-103 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9BD8B] focus-visible:ring-offset-2"
      >
        <MessageCircle className="w-5 h-5 text-[#D9BD8B] shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline text-xs font-semibold whitespace-nowrap">
          WhatsApp Us
        </span>
      </a>

      {/* Fixed Bottom Mobile Action Bar: Call | WhatsApp */}
      <div
        role="region"
        aria-label="Quick Mobile Contact Actions"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#141615] border-t border-[#F7F5F0]/15 grid grid-cols-2 divide-x divide-[#F7F5F0]/15 h-13"
      >
        <a
          href={TEL_LINK}
          className="flex items-center justify-center gap-2 text-sm font-semibold text-[#F7F5F0] active:bg-[#181A18] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D9BD8B]"
        >
          <Phone className="w-4 h-4 text-[#D9BD8B] shrink-0" aria-hidden="true" />
          <span>Call</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-sm font-semibold text-[#F7F5F0] bg-[#1B3B2B] active:bg-[#142C20] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D9BD8B]"
        >
          <MessageCircle className="w-4 h-4 text-[#D9BD8B] shrink-0" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
};
