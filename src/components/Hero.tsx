import React, { useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE, HERO_IMAGE_URL } from '../data/properties';

export const Hero: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  const scrollToFarmhouses = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector('#farmhouses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative w-full min-h-[580px] lg:min-h-[680px] flex items-center bg-[#141615] overflow-hidden"
    >
      {/* Background Image with Zero-Broken-Image Policy Fallback */}
      <div className="absolute inset-0 z-0">
        {!imgError ? (
          <img
            src={HERO_IMAGE_URL}
            alt="Spacious luxury farmhouse estate with manicured green lawn and natural sandstone pavilion in Delhi NCR"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div
            className="w-full h-full bg-gradient-to-br from-[#141615] via-[#1B3B2B] to-[#233329]"
            aria-hidden="true"
          />
        )}
        {/* Measured Scrim for WCAG AA contrast across all luminance frames */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#141615]/90 via-[#141615]/75 to-[#141615]/45"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#141615] via-transparent to-[#141615]/40"
          aria-hidden="true"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 w-full">
        <div className="max-w-3xl">
          {/* Trust / Location Line (Unboxed clean metadata per Zero-Pill Discipline) */}
          <p className="text-xs sm:text-sm font-medium tracking-wider text-[#D9BD8B] mb-5">
            Faridabad • Gurgaon • Delhi NCR • Palwal • Sohna
          </p>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F7F5F0] leading-[1.12] tracking-tight mb-6">
            Find Your Perfect Farmhouse in NCR
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg lg:text-xl text-[#F7F5F0]/85 leading-relaxed max-w-2xl mb-9 font-normal">
            Explore farmhouse and private property options across Faridabad, Gurgaon, Delhi NCR,
            Palwal and Sohna.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="#farmhouses"
              onClick={scrollToFarmhouses}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm sm:text-base font-semibold text-[#141615] bg-[#D9BD8B] hover:bg-[#c9ab76] rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F5F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141615]"
            >
              <span>Explore Farmhouses</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>

            <a
              href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm sm:text-base font-semibold text-[#F7F5F0] bg-[#1B3B2B] hover:bg-[#234B37] border border-[#F7F5F0]/20 rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9BD8B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141615]"
            >
              <MessageCircle className="w-5 h-5 text-[#D9BD8B] shrink-0" aria-hidden="true" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
