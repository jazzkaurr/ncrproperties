import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { BUSINESS_NAME, getWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '../data/properties';

interface NavbarProps {
  onNavigateHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateHome }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Farmhouses', href: '#farmhouses' },
    { label: 'Locations', href: '#locations' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    onNavigateHome();
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 30);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#181A18]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Zone 1: Single text element Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="font-serif text-2xl sm:text-[28px] font-semibold tracking-tight text-[#141615] whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B] rounded-sm"
        >
          {BUSINESS_NAME}
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#181A18]/80"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="py-1 text-[#181A18]/80 hover:text-[#1B3B2B] border-b-2 border-transparent hover:border-[#B69256] transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B] rounded-xs"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#F7F5F0] bg-[#1B3B2B] hover:bg-[#142C20] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B69256] focus-visible:ring-offset-2"
          >
            <MessageCircle className="w-4 h-4 text-[#B69256] shrink-0" aria-hidden="true" />
            <span>WhatsApp Us</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#141615] hover:bg-[#181A18]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="lg:hidden bg-[#F7F5F0] border-b border-[#181A18]/10 px-4 pt-2 pb-5 space-y-1"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="block px-3 py-3 rounded-lg text-base font-medium text-[#181A18] hover:bg-[#1B3B2B]/8 hover:text-[#1B3B2B] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};
