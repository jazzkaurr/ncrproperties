import React from 'react';
import { FeatureCardItem } from '../types/property';

interface FeatureCardProps {
  feature: FeatureCardItem;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, className = '' }) => {
  return (
    <div
      className={`bg-white border border-[#181A18]/10 rounded-xl p-6 sm:p-8 flex flex-col justify-between ${className}`}
    >
      <div>
        <span className="block font-serif text-lg font-semibold text-[#9A7840] tabular-nums mb-3">
          {feature.index}.
        </span>
        <h3 className="font-serif text-2xl font-semibold text-[#141615] mb-2.5">
          {feature.title}
        </h3>
        <p className="text-sm sm:text-base text-[#181A18]/75 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </div>
  );
};
