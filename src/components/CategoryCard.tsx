import React from 'react';
import { Home, Sparkles, Trees, Sun, ArrowRight } from 'lucide-react';
import { CategoryCardItem, PropertyTypeOption } from '../types/property';

interface CategoryCardProps {
  category: CategoryCardItem;
  onSelectCategory: (propertyType: PropertyTypeOption) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onSelectCategory,
}) => {
  const renderIcon = () => {
    switch (category.iconName) {
      case 'home':
        return <Home className="w-5 h-5 text-[#1B3B2B]" aria-hidden="true" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-[#1B3B2B]" aria-hidden="true" />;
      case 'trees':
        return <Trees className="w-5 h-5 text-[#1B3B2B]" aria-hidden="true" />;
      case 'sun':
        return <Sun className="w-5 h-5 text-[#1B3B2B]" aria-hidden="true" />;
    }
  };

  return (
    <div className="bg-[#F7F5F0] border border-[#181A18]/10 rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#1B3B2B]/35 transition-colors duration-150">
      <div>
        <div className="w-11 h-11 rounded-lg bg-[#1B3B2B]/8 flex items-center justify-center mb-5">
          {renderIcon()}
        </div>
        <h3 className="font-serif text-2xl font-semibold text-[#141615] mb-2">
          {category.title}
        </h3>
        <p className="text-sm text-[#181A18]/75 leading-relaxed mb-6">
          {category.description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onSelectCategory(category.propertyType)}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1B3B2B] hover:text-[#142C20] transition-colors cursor-pointer whitespace-nowrap self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B] rounded-xs"
      >
        <span>Enquire for {category.title}</span>
        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
    </div>
  );
};
