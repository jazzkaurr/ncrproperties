import React, { useEffect, useState } from 'react';
import { X, MessageCircle, MessageSquare, Home } from 'lucide-react';
import { Property } from '../types/property';
import { getWhatsAppUrl } from '../data/properties';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onEnquire: (property: Property) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  onClose,
  onEnquire,
}) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [property]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (property) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [property, onClose]);

  if (!property) return null;

  const customWhatsAppMsg = `Hello, I am interested in farmhouse properties in ${property.location} (${property.title} - ${property.propertyType}). Please share the available options.`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-property-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#141615]/75 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#F7F5F0] border border-[#181A18]/15 rounded-xl overflow-hidden shadow-xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Image with explicit height for mobile, tablet, and desktop */}
        <div className="relative w-full h-60 sm:h-80 bg-[#141615] overflow-hidden">
          {!imgError ? (
            <img
              src={property.image}
              alt={`${property.title} in ${property.location}`}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="block w-full h-full object-cover object-center"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-[#F7F5F0] p-6">
              <Home className="w-10 h-10 text-[#D9BD8B] mb-2" aria-hidden="true" />
              <span className="font-serif text-xl">{property.title}</span>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close property details"
            className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-[#141615]/80 text-[#F7F5F0] hover:bg-[#141615] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9BD8B]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Details Body */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#181A18]/65 mb-2">
            <span className="text-[#9A7840] font-semibold">{property.location}</span>
            <span aria-hidden="true">·</span>
            <span>{property.propertyType}</span>
          </div>

          <h2
            id="modal-property-title"
            className="font-serif text-2xl sm:text-3xl font-semibold text-[#141615] mb-3"
          >
            {property.title}
          </h2>

          <p className="text-sm sm:text-base text-[#181A18]/80 leading-relaxed mb-6">
            {property.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 px-5 bg-white border border-[#181A18]/10 rounded-lg mb-6 text-sm">
            <div>
              <div className="text-xs text-[#181A18]/55">Location</div>
              <div className="font-semibold text-[#141615] mt-0.5">{property.location}</div>
            </div>
            <div>
              <div className="text-xs text-[#181A18]/55">Area</div>
              <div className="font-semibold text-[#141615] mt-0.5">{property.area}</div>
            </div>
            <div>
              <div className="text-xs text-[#181A18]/55">Price</div>
              <div className="font-semibold text-[#1B3B2B] mt-0.5">{property.price}</div>
            </div>
            {property.bedrooms && (
              <div>
                <div className="text-xs text-[#181A18]/55">Configuration</div>
                <div className="font-semibold text-[#141615] mt-0.5">{property.bedrooms}</div>
              </div>
            )}
            {property.bathrooms && (
              <div>
                <div className="text-xs text-[#181A18]/55">Bathrooms</div>
                <div className="font-semibold text-[#141615] mt-0.5">{property.bathrooms}</div>
              </div>
            )}
            <div>
              <div className="text-xs text-[#181A18]/55">Category</div>
              <div className="font-semibold text-[#141615] mt-0.5">{property.propertyType}</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-semibold text-[#181A18]/60 uppercase tracking-wider mb-2.5">
              Key Highlights
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-sm text-[#141615]">
              {property.features.map((feature, index) => (
                <React.Fragment key={feature}>
                  <span>{feature}</span>
                  {index < property.features.length - 1 && (
                    <span className="text-[#B69256]" aria-hidden="true">
                      ·
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onEnquire(property);
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#F7F5F0] bg-[#1B3B2B] hover:bg-[#142C20] rounded-lg transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
            >
              <MessageSquare className="w-4 h-4 text-[#D9BD8B]" aria-hidden="true" />
              <span>Enquire via Form</span>
            </button>

            <a
              href={getWhatsAppUrl(customWhatsAppMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#141615] bg-white hover:bg-[#E8E4DB] border border-[#181A18]/20 rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
            >
              <MessageCircle className="w-4 h-4 text-[#1B3B2B]" aria-hidden="true" />
              <span>WhatsApp About This Property</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
