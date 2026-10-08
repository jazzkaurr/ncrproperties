import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/properties';

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#EFECE4] border-y border-[#181A18]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold text-[#9A7840] mb-2">
            Simple 4-Step Process
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141615]">
            How It Works
          </h2>
        </div>

        {/* Horizontal layout on desktop, vertical timeline/card layout on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div
              key={step.number}
              className="relative bg-[#F7F5F0] border border-[#181A18]/10 rounded-xl p-6 sm:p-7 flex flex-col justify-between"
            >
              {/* Mobile vertical timeline connector */}
              {index < HOW_IT_WORKS_STEPS.length - 1 && (
                <div
                  className="lg:hidden absolute left-8 -bottom-6 w-px h-6 bg-[#B69256]/50"
                  aria-hidden="true"
                />
              )}

              <div>
                <div className="inline-flex items-center gap-2 font-serif text-xl sm:text-2xl font-semibold text-[#1B3B2B] tabular-nums mb-3">
                  <span>{step.number}</span>
                  <span className="text-[#B69256]" aria-hidden="true">
                    —
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#141615] mb-2.5">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-[#181A18]/75 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
