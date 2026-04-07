import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    'premium-input w-full px-4 py-3 text-[14px] transition-colors';

  return (
    <div>
      <section className="py-12 md:py-16">
        <div className="premium-shell">
          <span className="premium-kicker text-[11px] tracking-[0.24em] uppercase mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Contact</span>
          <h1 className="premium-heading text-[clamp(2.2rem,4.8vw,4rem)] leading-[1.02] tracking-[-0.03em] mb-6 max-w-3xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}>
            Request a quote or technical consultation
          </h1>
          <p className="premium-copy text-[15px] leading-[1.85] max-w-xl"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            Tell us your application, grade requirements, and volume — we respond
            to all inquiries within one business day.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="premium-shell">
          <div className="grid gap-10 xl:gap-14 xl:grid-cols-[minmax(18rem,0.78fr)_minmax(0,1.22fr)]">
            <div className="premium-panel-soft space-y-8 p-6 md:p-7">
              {[
                { icon: MapPin, label: 'Headquarters', value: 'Pittsburgh, PA' },
                { icon: Phone, label: 'Phone', value: '+1 (412) 555-0180' },
                { icon: Mail, label: 'Email', value: 'info@blackopalcarbon.com' },
                { icon: Clock, label: 'Response time', value: 'Within 1 business day' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="premium-icon-wrap w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon size={16} className="text-[#e6cb87]" />
                  </div>
                  <div>
                    <span className="text-[#8f835f] text-[11px] tracking-[0.18em] uppercase block mb-0.5"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>{item.label}</span>
                    <span className="text-[#f7efdb] text-[14px]"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>{item.value}</span>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <span className="text-[#8f835f] text-[11px] tracking-[0.18em] uppercase block mb-2"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>Warehouse locations</span>
                <p className="premium-copy text-[13px] leading-[1.75]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                  Pittsburgh, PA &middot; Houston, TX &middot; Los Angeles, CA &middot; Atlanta, GA
                </p>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="premium-panel p-8 text-center">
                  <h3 className="premium-heading text-[18px] mb-2"
                    style={{ fontFamily: "'DM Serif Display', serif" }}>Thank you for your inquiry</h3>
                  <p className="premium-copy text-[14px]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                    Our team will review your request and respond within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="premium-panel space-y-5 p-6 md:p-7" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                  <div className="premium-form-grid">
                    <div>
                      <label className="text-[12px] text-[#b8ab8b] mb-1.5 block">Name *</label>
                      <input type="text" required className={inputClass} placeholder="Full name" />
                    </div>
                    <div>
                      <label className="text-[12px] text-[#b8ab8b] mb-1.5 block">Company *</label>
                      <input type="text" required className={inputClass} placeholder="Company name" />
                    </div>
                  </div>
                  <div className="premium-form-grid">
                    <div>
                      <label className="text-[12px] text-[#b8ab8b] mb-1.5 block">Email *</label>
                      <input type="email" required className={inputClass} placeholder="you@company.com" />
                    </div>
                    <div>
                      <label className="text-[12px] text-[#b8ab8b] mb-1.5 block">Phone</label>
                      <input type="tel" className={inputClass} placeholder="Optional" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[12px] text-[#b8ab8b] mb-1.5 block">Application / Use Case *</label>
                    <select required className={`${inputClass} appearance-none`}>
                      <option value="">Select application</option>
                      <option>Water Treatment</option>
                      <option>Gold Recovery</option>
                      <option>Air & Gas Purification</option>
                      <option>Oil & Gas</option>
                      <option>Catalytic / Chloramine Removal</option>
                      <option>Other Industrial</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[12px] text-[#b8ab8b] mb-1.5 block">Product &amp; Volume</label>
                    <input type="text" className={inputClass} placeholder="e.g. Granular 8x30, 40,000 lbs/month" />
                  </div>
                  <div>
                    <label className="text-[12px] text-[#b8ab8b] mb-1.5 block">Additional Details</label>
                    <textarea rows={4} className={`${inputClass} resize-none`}
                      placeholder="Specifications, delivery requirements, or questions" />
                  </div>
                  <button type="submit"
                    className="premium-primary-btn text-[13px] px-10 py-3 rounded-full"
                    style={{ fontWeight: 500 }}>
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
