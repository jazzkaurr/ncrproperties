import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LocationCardItem, LocationOption } from '../types/property';

interface LocationCardProps {
  location: LocationCardItem;
  onSelectLocation: (locationName: LocationOption) => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location,
  onSelectLocation,
}) => {
  return (
    <div className="group bg-white border border-[#181A18]/10 hover:border-[#1B3B2B]/40 rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-colors duration-150">
      <div>
        <p className="text-xs font-medium text-[#9A7840] mb-2">{location.highlights}</p>
        <h3 className="font-serif text-2xl sm:text-[26px] font-semibold text-[#141615] mb-2.5">
          {location.name}
        </h3>
        <p className="text-sm sm:text-base text-[#181A18]/75 leading-relaxed mb-6">
          {location.description}
        </p>
      </div>

      <div>
        <button
          type="button"
          onClick={() => onSelectLocation(location.name)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1B3B2B] group-hover:text-[#142C20] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B] rounded-xs"
        >
          <span>Explore Properties</span>
          <ArrowRight
            className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};
