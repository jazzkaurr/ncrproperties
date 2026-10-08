import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { BUSINESS_NAME, DISPLAY_PHONE, getWhatsAppUrl } from '../data/properties';

interface LegalPagesProps {
  activePage: 'privacy' | 'terms';
  onBackHome: () => void;
  onSwitchPage: (page: 'privacy' | 'terms') => void;
}

export const LegalPages: React.FC<LegalPagesProps> = ({
  activePage,
  onBackHome,
  onSwitchPage,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#141615] bg-white border border-[#181A18]/15 hover:bg-[#EFECE4] rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3B2B]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 bg-[#EFECE4] p-1 rounded-lg">
            <button
              type="button"
              onClick={() => onSwitchPage('privacy')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                activePage === 'privacy'
                  ? 'bg-[#1B3B2B] text-[#F7F5F0]'
                  : 'text-[#181A18]/75 hover:text-[#141615]'
              }`}
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onSwitchPage('terms')}
              className={`px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                activePage === 'terms'
                  ? 'bg-[#1B3B2B] text-[#F7F5F0]'
                  : 'text-[#181A18]/75 hover:text-[#141615]'
              }`}
            >
              Terms &amp; Conditions
            </button>
          </div>
        </div>

        <article className="bg-white border border-[#181A18]/10 rounded-xl p-6 sm:p-10 lg:p-12 space-y-6 text-[#181A18]/85 leading-relaxed">
          {activePage === 'privacy' ? (
            <>
              <div className="border-b border-[#181A18]/10 pb-6">
                <p className="text-xs font-semibold text-[#9A7840] mb-2">Legal Information</p>
                <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141615]">
                  Privacy Policy
                </h1>
                <p className="text-xs text-[#181A18]/60 mt-2">
                  Effective Year: 2026 · {BUSINESS_NAME}
                </p>
              </div>

              <section className="space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#141615]">
                  1. Information Collected Through Enquiry Forms
                </h2>
                <p className="text-sm sm:text-base">
                  When you submit a property enquiry on {BUSINESS_NAME}, we collect only the
                  essential information you voluntarily provide: your full name, mobile phone
                  number, preferred NCR location, preferred property type, indicative budget range,
                  and any specific property requirement notes you choose to share. We do not collect
                  passwords, sensitive financial credentials, or unnecessary personal details.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#141615]">
                  2. Why Customer Information Is Collected
                </h2>
                <p className="text-sm sm:text-base">
                  We collect your contact and requirement details solely to understand your
                  farmhouse or land preferences across Faridabad, Gurgaon, Delhi NCR, Palwal, and
                  Sohna, and to respond to your enquiry with relevant property options.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#141615]">
                  3. How Enquiry Information Is Used
                </h2>
                <p className="text-sm sm:text-base">
                  Your submitted information is used by our property team to:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base">
                  <li>Shortlist farmhouse or land options matching your stated criteria.</li>
                  <li>Communicate property details and answer your questions.</li>
                  <li>Coordinate and schedule site visits when requested by you.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#141615]">
                  4. Contact Through WhatsApp &amp; Phone
                </h2>
                <p className="text-sm sm:text-base">
                  By checking the consent box on our enquiry form or clicking our WhatsApp buttons,
                  you consent to being contacted by {BUSINESS_NAME} via phone call or WhatsApp at
                  the number you provide. Submitting our enquiry form also prepares a pre-filled
                  WhatsApp message to our official business number ({DISPLAY_PHONE}) so you can
                  connect with our team immediately.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#141615]">
                  5. Data Security
                </h2>
                <p className="text-sm sm:text-base">
                  We implement input validation, rate limiting, and HTTPS encryption in production
                  to protect enquiry submissions against unauthorized access, spam, or misuse. We
                  never expose private customer enquiries publicly on this website.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#141615]">
                  6. Third-Party Services
                </h2>
                <p className="text-sm sm:text-base">
                  When you choose to communicate via WhatsApp, your interaction is governed by
                  WhatsApp&apos;s privacy policy and terms of service. If internal CRM or notification
                  tools are used by {BUSINESS_NAME} to manage enquiries, your details are accessed
                  strictly for handling your property request and are never sold to third-party
                  marketers.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#141615]">
                  7. Your Rights &amp; How to Request Deletion or Correction
                </h2>
                <p className="text-sm sm:text-base">
                  You have the right to request access to, correction of, or deletion of any
                  personal contact details you have shared with us, or to opt out of future
                  follow-ups at any time. To request correction or deletion of your information,
                  please contact us directly via phone or WhatsApp at{' '}
                  <a
                    href={getWhatsAppUrl('Hello, I would like to update or delete my enquiry contact details.')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#1B3B2B] underline"
                  >
                    {DISPLAY_PHONE}
                  </a>
                  .
                </p>
              </section>
            </>
          ) : (
            <>
              <div className="border-b border-[#181A18]/10 pb-6">
                <p className="text-xs font-semibold text-[#9A7840] mb-2">Legal Information</p>
                <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#141615]">
                  Terms &amp; Conditions
                </h1>
                <p className="text-xs text-[#181A18]/60 mt-2">
                  Effective Year: 2026 · {BUSINESS_NAME}
                </p>
              </div>

              <section className="space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#141615]">
                  1. General Information &amp; Property Listings
                </h2>
                <p className="text-sm sm:text-base">
                  The content and property listings displayed on {BUSINESS_NAME} are provided for
                  general informational purposes regarding farmhouse and land categories across
                  Faridabad, Gurgaon, Delhi NCR, Palwal, and Sohna. Website listings do not
                  constitute a binding offer, reservation, or guarantee of availability.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#141615]">
                  2. Independent Legal &amp; Due Diligence Verification
                </h2>
                <p className="text-sm sm:text-base">
                  Prospective buyers are strongly advised to conduct independent legal, technical,
                  title, land-use, and regulatory due diligence before entering into any property
                  transaction. Do not rely on website descriptions as a substitute for formal legal
                  or professional property verification.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#141615]">
                  3. Permitted Use of Website
                </h2>
                <p className="text-sm sm:text-base">
                  Visitors may use our enquiry forms and WhatsApp links for genuine property
                  enquiries. Automated scraping, spam submissions, or attempts to disrupt website
                  functionality are strictly prohibited.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#141615]">
                  4. Contact
                </h2>
                <p className="text-sm sm:text-base">
                  For any questions regarding these Terms &amp; Conditions, please contact{' '}
                  {BUSINESS_NAME} at {DISPLAY_PHONE}.
                </p>
              </section>
            </>
          )}
        </article>
      </div>
    </div>
  );
};
