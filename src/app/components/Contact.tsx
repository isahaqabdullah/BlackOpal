import { Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { companyDetails } from '../content/siteContent';
import { siteConfig } from '../config/siteConfig';
import { PageIntro } from './PageIntro';

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = 'premium-input w-full px-4 py-3 text-[14px] transition-colors';

  return (
    <div>
      <PageIntro
        label="Contact"
        title={siteConfig.contactTitle}
        description={siteConfig.contactDescription}
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="pb-12 md:pb-14">
        <div className="premium-shell">
          <div className="grid gap-10 xl:gap-14 xl:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)]">
            <div className="space-y-6">
              <div className="premium-panel-soft p-6 md:p-7 space-y-7">
                {[
                  {
                    icon: MapPin,
                    label: companyDetails.headquartersLabel,
                    value: `${companyDetails.headquarters.name}\n${companyDetails.headquarters.line1}\n${companyDetails.headquarters.line2}`,
                  },
                  companyDetails.fax
                    ? {
                        icon: Phone,
                        label: 'Phone',
                        value: `${companyDetails.phoneDisplay}\nFax: ${companyDetails.fax}`,
                      }
                    : {
                        icon: Phone,
                        label: 'Phone',
                        value: companyDetails.phoneDisplay,
                      },
                  {
                    icon: Mail,
                    label: 'Email',
                    value:
                      companyDetails.infoEmail === companyDetails.salesEmail
                        ? companyDetails.infoEmail
                        : `${companyDetails.infoEmail}\n${companyDetails.salesEmail}`,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="premium-icon-wrap w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={16} className="text-[#e6cb87]" />
                    </div>
                    <div>
                      <span
                        className="text-[#8f835f] text-[11px] tracking-[0.18em] uppercase block mb-1"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                      >
                        {item.label}
                      </span>
                      {item.value.split('\n').map((line) => (
                        <div
                          key={line}
                          className="text-[#f7efdb] text-[14px]"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {companyDetails.additionalOffices.length ? (
                <div className="premium-panel-soft p-6 md:p-7">
                  <span
                    className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-4"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    {siteConfig.additionalOfficesTitle}
                  </span>
                  <div className="space-y-5">
                    {companyDetails.additionalOffices.map((office) => (
                      <div key={`${office.label}-${office.name}`}>
                        <span
                          className="text-[#8f835f] text-[10px] tracking-[0.18em] uppercase block mb-1"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                        >
                          {office.label}
                        </span>
                        <h3
                          className="premium-card-heading text-[15px] mb-1"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                        >
                          {office.name}
                        </h3>
                        {office.address.map((line) => (
                          <p
                            key={line}
                            className="premium-copy text-[13px] leading-[1.7]"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                          >
                            {line}
                          </p>
                        ))}
                        {office.phone ? (
                          <p
                            className="premium-copy text-[13px] leading-[1.7] mt-2"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                          >
                            Tel: {office.phone}
                          </p>
                        ) : null}
                        {office.email ? (
                          <p
                            className="premium-copy text-[13px] leading-[1.7]"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                          >
                            Email: {office.email}
                          </p>
                        ) : null}
                        {office.note ? (
                          <p
                            className="premium-copy text-[12px] leading-[1.7] mt-2 text-[#8f835f]"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                          >
                            {office.note}
                          </p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div>
              {submitted ? (
                <div className="premium-panel p-8 text-center">
                  <h3
                    className="premium-heading text-[18px] mb-2"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    Thank you for your enquiry
                  </h3>
                  <p
                    className="premium-copy text-[14px]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                  >
                    Thank you for your enquiry. For urgent requirements, use the listed phone or email details for the
                    fastest Black Opal response.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="premium-panel space-y-5 p-6 md:p-7"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                >
                  <div className="premium-form-grid">
                    <div>
                      <label className="text-[12px] text-[#b8ab8b] mb-1.5 block">First Name *</label>
                      <input type="text" required className={inputClass} placeholder="First name" />
                    </div>
                    <div>
                      <label className="text-[12px] text-[#b8ab8b] mb-1.5 block">Last Name *</label>
                      <input type="text" required className={inputClass} placeholder="Last name" />
                    </div>
                  </div>

                  <div className="premium-form-grid">
                    <div>
                      <label className="text-[12px] text-[#b8ab8b] mb-1.5 block">Email *</label>
                      <input type="email" required className={inputClass} placeholder="you@company.com" />
                    </div>
                    <div>
                      <label className="text-[12px] text-[#b8ab8b] mb-1.5 block">Company *</label>
                      <input type="text" required className={inputClass} placeholder="Company name" />
                    </div>
                  </div>

                  <div className="premium-form-grid">
                    <div>
                      <label className="text-[12px] text-[#b8ab8b] mb-1.5 block">Phone</label>
                      <input type="tel" className={inputClass} placeholder={companyDetails.phoneDisplay} />
                    </div>
                    <div>
                      <label className="text-[12px] text-[#b8ab8b] mb-1.5 block">Subject *</label>
                      <input type="text" required className={inputClass} placeholder="Quote request, enquiry, technical support" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[12px] text-[#b8ab8b] mb-1.5 block">Application / Use Case *</label>
                    <select required className={`${inputClass} appearance-none`}>
                      <option value="">Select application</option>
                      <option>Water Treatment</option>
                      <option>Gold Recovery</option>
                      <option>Air &amp; Gas</option>
                      <option>Oil &amp; Gas</option>
                      <option>Catalytic / Chloramine Removal</option>
                      <option>Other Applications</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[12px] text-[#b8ab8b] mb-1.5 block">Message *</label>
                    <textarea
                      rows={5}
                      required
                      className={`${inputClass} resize-none`}
                      placeholder="Tell Black Opal what product family, application, volume, and performance target you need."
                    />
                  </div>

                  <button
                    type="submit"
                    className="premium-primary-btn text-[13px] px-10 py-3 rounded-full"
                    style={{ fontWeight: 500 }}
                  >
                    Send enquiry
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
