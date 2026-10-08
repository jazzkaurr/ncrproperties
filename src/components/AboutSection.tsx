import React from 'react';
import { ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const scrollToProperties = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.querySelector('#farmhouses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#141615] text-[#F7F5F0] rounded-2xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="text-xs sm:text-sm font-medium text-[#D9BD8B] mb-3">
              About NCR Properties
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#F7F5F0] mb-6 leading-tight">
              Your Farmhouse Search, Made Simple
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-[#F7F5F0]/85 leading-relaxed mb-8">
              <p>
                We help buyers explore farmhouse and land opportunities across key NCR locations
                including Faridabad, Gurgaon, Delhi NCR, Palwal and Sohna.
              </p>
              <p>
                Whether you are looking for a weekend farmhouse, private property or a larger piece
                of land, our goal is to make the property search simple and convenient.
              </p>
            </div>

            <a
              href="#farmhouses"
              onClick={scrollToProperties}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-[#141615] bg-[#D9BD8B] hover:bg-[#c9ab76] rounded-lg transition-colors duration-150 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F5F0]"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
          </div>

          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#F7F5F0]/15 pt-8 lg:pt-0 lg:pl-10 space-y-6">
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#D9BD8B] mb-2">
                Key NCR Coverage Areas
              </h3>
              <p className="text-sm text-[#F7F5F0]/75 leading-relaxed">
                Faridabad · Gurgaon / Gurugram · Delhi NCR · Palwal · Sohna
              </p>
            </div>
            <div className="h-px bg-[#F7F5F0]/10" />
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#D9BD8B] mb-2">
                Property Focus
              </h3>
              <p className="text-sm text-[#F7F5F0]/75 leading-relaxed">
                Farmhouses · Luxury Farmhouses · Farm Land · Weekend Homes
              </p>
            </div>
            <div className="h-px bg-[#F7F5F0]/10" />
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#D9BD8B] mb-2">
                Direct Team Consultation
              </h3>
              <p className="text-sm text-[#F7F5F0]/75 leading-relaxed">
                Share your requirements via phone or WhatsApp at +91 98999 90140 to discuss
                suitable options and schedule visits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
