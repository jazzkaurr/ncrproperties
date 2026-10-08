import React, { useState } from 'react';
import { Home, ArrowUpRight, MessageSquare } from 'lucide-react';
import { Property } from '../types/property';

interface PropertyCardProps {
  property: Property;
  onViewProperty: (property: Property) => void;
  onEnquireProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onViewProperty,
  onEnquireProperty,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group bg-white border border-[#181A18]/10 rounded-xl overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5">
      <div>
        {/* Image Container with explicit responsive heights so mobile & tablet browsers always display the image */}
        <div className="relative w-full h-56 sm:h-60 md:h-56 lg:h-52 shrink-0 bg-[#1B3B2B]/10 overflow-hidden">
          {!imgError ? (
            <img
              src={property.image}
              alt={`${property.title} - ${property.propertyType} in ${property.location}`}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="block w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-103"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1B3B2B] to-[#141615] flex flex-col items-center justify-center p-6 text-center text-[#F7F5F0]">
              <Home className="w-8 h-8 text-[#D9BD8B] mb-2" aria-hidden="true" />
              <span className="font-serif text-lg">{property.title}</span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Quiet unboxed metadata line */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#181A18]/65 mb-2">
            <span className="text-[#9A7840] font-semibold">{property.location}</span>
            <span aria-hidden="true">·</span>
            <span>{property.propertyType}</span>
          </div>

          {/* Property Title */}
          <h3 className="font-serif text-2xl font-semibold text-[#141615] mb-2 leading-snug">
            {property.title}
          </h3>

          {/* Area & Price Line */}
          <div className="flex flex-wrap items-baseline justify-between gap-2 py-3 my-3 border-y border-[#181A18]/10 text-sm">
            <div>
              <span className="text-[#181A18]/60">Area: </span>
              <span className="font-medium text-[#141615]">{property.area}</span>
            </div>
            <div className="font-semibold text-[#1B3B2B]">{property.price}</div>
          </div>

          {/* Key Features */}
          <p className="text-xs text-[#181A18]/75 leading-relaxed mb-3">
            {property.features.map((feat, idx) => (
              <React.Fragment key={feat}>
                <span>{feat}</span>
                {idx < property.features.length - 1 && (
                  <span className="mx-1.5 text-[#B69256]" aria-hidden="true">
                    ·
                  </span>
                )}
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 pt-1 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onViewProperty(property)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#141615] bg-[#F7F5F0] hover:bg-[#E8E4DB] rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
        >
          <span>View Property</span>
          <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => onEnquireProperty(property)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-[#F7F5F0] bg-[#1B3B2B] hover:bg-[#142C20] rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#D9BD8B] shrink-0" aria-hidden="true" />
          <span>Enquire Now</span>
        </button>
      </div>
    </article>
  );
};
