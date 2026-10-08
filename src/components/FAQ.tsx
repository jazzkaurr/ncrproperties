import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/properties';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-[#EFECE4] border-t border-[#181A18]/8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-14">
          <p className="text-xs sm:text-sm font-semibold text-[#9A7840] mb-2">
            Common Questions
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141615]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white border border-[#181A18]/10 rounded-xl overflow-hidden"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${item.id}`}
                    id={`faq-btn-${item.id}`}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#F7F5F0]/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1B3B2B]"
                  >
                    <span className="font-serif text-lg sm:text-xl font-semibold text-[#141615]">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#1B3B2B] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                {isOpen && (
                  <div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${item.id}`}
                    className="px-6 pb-5 pt-1 text-sm sm:text-base text-[#181A18]/80 leading-relaxed border-t border-[#181A18]/5"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
