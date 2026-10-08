import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InquiryForm } from './components/InquiryForm';
import { PropertyCard } from './components/PropertyCard';
import { PropertyModal } from './components/PropertyModal';
import { LocationCard } from './components/LocationCard';
import { CategoryCard } from './components/CategoryCard';
import { FeatureCard } from './components/FeatureCard';
import { HowItWorks } from './components/HowItWorks';
import { AboutSection } from './components/AboutSection';
import { FAQ } from './components/FAQ';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { LegalPages } from './components/LegalPages';
import {
  FEATURED_PROPERTIES,
  NCR_LOCATIONS,
  PROPERTY_CATEGORIES,
  WHY_CHOOSE_US_FEATURES,
  DISPLAY_PHONE,
  TEL_LINK,
  getWhatsAppUrl,
  DEFAULT_WHATSAPP_MESSAGE,
} from './data/properties';
import { Property, LocationOption, PropertyTypeOption } from './types/property';

export default function App() {
  const [activeLegalPage, setActiveLegalPage] = useState<'privacy' | 'terms' | null>(null);
  const [selectedPropertyModal, setSelectedPropertyModal] = useState<Property | null>(null);

  // State for pre-filling the inquiry form when a user clicks "Enquire Now" or a Location/Category card
  const [preselectedLocation, setPreselectedLocation] = useState<LocationOption | ''>('');
  const [preselectedPropertyType, setPreselectedPropertyType] = useState<PropertyTypeOption | ''>('');
  const [preselectedPropertyTitle, setPreselectedPropertyTitle] = useState<string>('');

  // Client-side filter for Featured Properties
  const [locationFilter, setLocationFilter] = useState<string>('All');

  const scrollToInquiry = () => {
    const el = document.querySelector('#quick-inquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnquireProperty = (property: Property) => {
    setPreselectedLocation(property.location);
    setPreselectedPropertyType(property.propertyType);
    setPreselectedPropertyTitle(property.title);
    scrollToInquiry();
  };

  const handleSelectLocation = (locationName: LocationOption) => {
    setPreselectedLocation(locationName);
    setPreselectedPropertyTitle('');
    scrollToInquiry();
  };

  const handleSelectCategory = (propertyType: PropertyTypeOption) => {
    setPreselectedPropertyType(propertyType);
    setPreselectedPropertyTitle('');
    scrollToInquiry();
  };

  const handleClearPreselection = () => {
    setPreselectedLocation('');
    setPreselectedPropertyType('');
    setPreselectedPropertyTitle('');
  };

  const filteredProperties =
    locationFilter === 'All'
      ? FEATURED_PROPERTIES
      : FEATURED_PROPERTIES.filter((p) => p.location === locationFilter);

  const filterTabs = ['All', 'Sohna', 'Faridabad', 'Gurgaon / Gurugram', 'Palwal'];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#181A18]">
      <Navbar onNavigateHome={() => setActiveLegalPage(null)} />

      {activeLegalPage ? (
        <main className="flex-grow">
          <LegalPages
            activePage={activeLegalPage}
            onBackHome={() => setActiveLegalPage(null)}
            onSwitchPage={(page) => setActiveLegalPage(page)}
          />
        </main>
      ) : (
        <main className="flex-grow">
          {/* 1. HERO SECTION */}
          <Hero />

          {/* 2. QUICK INQUIRY SECTION (Immediately below Hero) */}
          <section
            id="quick-inquiry"
            aria-label="Quick Property Enquiry"
            className="relative z-20 -mt-10 sm:-mt-14 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
          >
            <InquiryForm
              id="top-enquiry-form"
              heading="Looking for a Farmhouse?"
              subtext="Tell us what you are looking for and our property team will help you explore suitable options."
              preselectedLocation={preselectedLocation}
              preselectedPropertyType={preselectedPropertyType}
              preselectedPropertyTitle={preselectedPropertyTitle}
              onClearPreselection={handleClearPreselection}
            />
          </section>

          {/* 3. FEATURED PROPERTIES SECTION */}
          <section id="farmhouses" className="py-16 sm:py-24 bg-[#F7F5F0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-[#9A7840] mb-2">
                    NCR Farmhouse Collection
                  </p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141615]">
                    Featured Farmhouse Properties
                  </h2>
                  <p className="text-sm sm:text-base text-[#181A18]/75 mt-2 max-w-2xl">
                    Explore farmhouse and land configurations across NCR. Contact our team to
                    receive available options tailored to your requirements.
                  </p>
                </div>

                {/* Interactive Filter Tabs */}
                <div
                  role="tablist"
                  aria-label="Filter properties by location"
                  className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EFECE4] rounded-lg self-start"
                >
                  {filterTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={locationFilter === tab}
                      onClick={() => setLocationFilter(tab)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B] ${
                        locationFilter === tab
                          ? 'bg-white text-[#141615] shadow-xs'
                          : 'text-[#181A18]/70 hover:text-[#141615]'
                      }`}
                    >
                      {tab === 'All' ? 'All Locations' : tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewProperty={(prop) => setSelectedPropertyModal(prop)}
                    onEnquireProperty={handleEnquireProperty}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* 4. LOCATION SECTION */}
          <section id="locations" className="py-16 sm:py-24 bg-[#EFECE4] border-y border-[#181A18]/8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mb-12">
                <p className="text-xs sm:text-sm font-semibold text-[#9A7840] mb-2">
                  Regional Coverage
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141615] mb-3">
                  Farmhouses Across NCR
                </h2>
                <p className="text-sm sm:text-base text-[#181A18]/75">
                  Select your preferred location below to enquire about farmhouse and private land
                  options in that belt.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {NCR_LOCATIONS.map((loc, idx) => (
                  <div
                    key={loc.id}
                    className={idx === 0 ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'}
                  >
                    <LocationCard location={loc} onSelectLocation={handleSelectLocation} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. PROPERTY CATEGORIES SECTION */}
          <section className="py-16 sm:py-24 bg-white border-b border-[#181A18]/8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mb-12">
                <p className="text-xs sm:text-sm font-semibold text-[#9A7840] mb-2">
                  Property Categories
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141615]">
                  Find a Property That Fits Your Needs
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PROPERTY_CATEGORIES.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onSelectCategory={handleSelectCategory}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* 6. WHY CHOOSE US SECTION */}
          <section id="why-us" className="py-16 sm:py-24 bg-[#F7F5F0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mb-12">
                <p className="text-xs sm:text-sm font-semibold text-[#9A7840] mb-2">
                  Our Approach
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141615]">
                  Why Buyers Choose Us
                </h2>
              </div>

              {/* Asymmetric Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                {WHY_CHOOSE_US_FEATURES.map((feature, index) => {
                  const spanClass =
                    index < 2 ? 'lg:col-span-3' : 'lg:col-span-2';
                  return (
                    <FeatureCard
                      key={feature.id}
                      feature={feature}
                      className={spanClass}
                    />
                  );
                })}
              </div>
            </div>
          </section>

          {/* 7. HOW IT WORKS SECTION */}
          <HowItWorks />

          {/* 8. ABOUT SECTION */}
          <AboutSection />

          {/* 9. FAQ SECTION */}
          <FAQ />

          {/* 10. FINAL CTA SECTION */}
          <CTA />

          {/* 11. CONTACT SECTION */}
          <section id="contact" className="py-16 sm:py-24 bg-[#F7F5F0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                {/* Left Column: Contact Details */}
                <div className="lg:col-span-4 space-y-8">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-[#9A7840] mb-2">
                      Get in Touch
                    </p>
                    <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141615] mb-4">
                      Let&apos;s Find Your Property
                    </h2>
                    <p className="text-sm sm:text-base text-[#181A18]/75 leading-relaxed">
                      Reach out to our team directly via phone or WhatsApp, or share your
                      requirements using the enquiry form.
                    </p>
                  </div>

                  <div className="bg-white border border-[#181A18]/10 rounded-xl p-6 space-y-6">
                    <div>
                      <div className="text-xs font-semibold text-[#9A7840] mb-2">
                        Call / WhatsApp
                      </div>
                      <a
                        href={TEL_LINK}
                        className="font-serif text-2xl font-semibold text-[#141615] hover:text-[#1B3B2B] transition-colors block mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B] rounded-xs"
                      >
                        {DISPLAY_PHONE}
                      </a>
                      <div className="flex flex-wrap gap-2.5">
                        <a
                          href={TEL_LINK}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#141615] bg-[#F7F5F0] hover:bg-[#E8E4DB] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
                        >
                          <Phone className="w-3.5 h-3.5 text-[#1B3B2B]" aria-hidden="true" />
                          <span>Call Now</span>
                        </a>
                        <a
                          href={getWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#F7F5F0] bg-[#1B3B2B] hover:bg-[#142C20] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#D9BD8B]" aria-hidden="true" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>

                    <div className="h-px bg-[#181A18]/10" />

                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#9A7840] mb-2">
                        <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Locations</span>
                      </div>
                      <p className="text-sm font-medium text-[#141615] leading-relaxed">
                        Faridabad • Gurgaon • Delhi NCR • Palwal • Sohna
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Secondary Inquiry Form */}
                <div className="lg:col-span-8">
                  <InquiryForm
                    id="contact-enquiry-form"
                    heading="Send Us Your Requirement"
                    subtext="Fill in your details below and our property team will get back to you with suitable farmhouse options."
                    compact
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* 12. FOOTER */}
      <Footer
        onNavigateHome={() => setActiveLegalPage(null)}
        onOpenLegalPage={(page) => setActiveLegalPage(page)}
      />

      {/* 13. FLOATING WHATSAPP BUTTON & MOBILE BOTTOM BAR */}
      <WhatsAppButton />

      {/* 14. SAMPLE PROPERTY DETAILS MODAL */}
      <PropertyModal
        property={selectedPropertyModal}
        onClose={() => setSelectedPropertyModal(null)}
        onEnquire={handleEnquireProperty}
      />
    </div>
  );
}
