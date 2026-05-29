'use client';

import { Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { useSiteContent } from '../content/SiteContentProvider';
import { PageIntro } from './PageIntro';

export function ContactPage() {
  const { contactPage, siteSettings } = useSiteContent();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setIsSubmitting(true);
    setSubmissionError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error || 'Message could not be sent. Please email us directly.');
      }

      form.reset();
      setSubmitted(true);
    } catch (error) {
      setSubmissionError(error instanceof Error ? error.message : 'Message could not be sent. Please email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = 'premium-input w-full px-4 py-3 text-[14px] transition-colors';

  return (
    <div>
      <PageIntro
        label={contactPage.intro.label}
        title={contactPage.intro.title}
        description={contactPage.intro.description}
        breadcrumbs={[{ label: contactPage.intro.breadcrumbLabel }]}
        enableBreadcrumbEditing={false}
      />

      <section className="pb-12 md:pb-14">
        <div className="premium-shell">
          <div className="grid gap-10 xl:gap-14 xl:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)]">
            <div className="space-y-6">
              <div className="premium-panel-soft p-6 md:p-7">
                <span
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-4"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {contactPage.officesTitle}
                </span>
                <div className="grid gap-3">
                  {siteSettings.officeNetwork.map((office) => (
                    <address
                      key={`${office.label}-${office.name}`}
                      className="not-italic rounded-[6px] border border-[#c9a24d]/12 bg-[#050505]/35 p-4"
                    >
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
                          key={`${office.label}-${line}`}
                          className="premium-copy text-[13px] leading-[1.7]"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                        >
                          {line}
                        </p>
                      ))}
                      <div className="mt-4 space-y-2">
                        {office.phone ? (
                          <a
                            href={`tel:${office.phone.replace(/[^+\d]/g, '')}`}
                            className="flex items-center gap-2 text-[#f7efdb] transition-colors hover:text-[#f2d78b]"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                          >
                            <Phone size={14} className="shrink-0 text-[#e6cb87]" />
                            <span className="text-[13px] leading-[1.5]">{office.phone}</span>
                          </a>
                        ) : null}
                        {office.email ? (
                          <a
                            href={`mailto:${office.email}`}
                            className="flex items-center gap-2 text-[#f7efdb] transition-colors hover:text-[#f2d78b]"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                          >
                            <Mail size={14} className="shrink-0 text-[#e6cb87]" />
                            <span className="text-[13px] leading-[1.5] break-all">{office.email}</span>
                          </a>
                        ) : null}
                      </div>
                    </address>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="premium-panel p-8 text-center">
                  <h3
                    className="premium-heading text-[18px] mb-2"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {contactPage.successTitle}
                  </h3>
                  <p
                    className="premium-copy text-[14px]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                  >
                    {contactPage.successMessage}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="premium-panel space-y-5 p-6 md:p-7"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                >
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />
                  <div className="premium-form-grid">
                    <div>
                      <label
                        className="text-[12px] text-[#b8ab8b] mb-1.5 block"
                      >
                        {contactPage.firstNameLabel}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        autoComplete="given-name"
                        className={inputClass}
                        placeholder={contactPage.firstNamePlaceholder}
                      />
                    </div>
                    <div>
                      <label
                        className="text-[12px] text-[#b8ab8b] mb-1.5 block"
                      >
                        {contactPage.lastNameLabel}
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        autoComplete="family-name"
                        className={inputClass}
                        placeholder={contactPage.lastNamePlaceholder}
                      />
                    </div>
                  </div>

                  <div className="premium-form-grid">
                    <div>
                      <label
                        className="text-[12px] text-[#b8ab8b] mb-1.5 block"
                      >
                        {contactPage.emailLabel}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        className={inputClass}
                        placeholder={contactPage.emailPlaceholder}
                      />
                    </div>
                    <div>
                      <label
                        className="text-[12px] text-[#b8ab8b] mb-1.5 block"
                      >
                        {contactPage.companyLabel}
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        autoComplete="organization"
                        className={inputClass}
                        placeholder={contactPage.companyPlaceholder}
                      />
                    </div>
                  </div>

                  <div className="premium-form-grid">
                    <div>
                      <label
                        className="text-[12px] text-[#b8ab8b] mb-1.5 block"
                      >
                        {contactPage.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        className={inputClass}
                        placeholder={siteSettings.websiteContact.phone}
                      />
                    </div>
                    <div>
                      <label
                        className="text-[12px] text-[#b8ab8b] mb-1.5 block"
                      >
                        Region
                      </label>
                      <input
                        type="text"
                        name="region"
                        required
                        autoComplete="country-name"
                        className={inputClass}
                        placeholder="Country or region"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="text-[12px] text-[#b8ab8b] mb-1.5 block"
                    >
                      {contactPage.subjectLabel}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      className={inputClass}
                      placeholder={contactPage.subjectPlaceholder}
                    />
                  </div>

                  <div>
                    <label
                      className="text-[12px] text-[#b8ab8b] mb-1.5 block"
                    >
                      {contactPage.applicationLabel}
                    </label>
                    <select
                      name="application"
                      required
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="">{contactPage.applicationPlaceholder}</option>
                      {contactPage.applicationOptions.map((option) => (
                        <option key={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      className="text-[12px] text-[#b8ab8b] mb-1.5 block"
                    >
                      {contactPage.messageLabel}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className={`${inputClass} resize-none`}
                      placeholder={contactPage.messagePlaceholder}
                    />
                  </div>

                  {submissionError ? (
                    <p
                      id="contact-form-error"
                      className="text-[13px] leading-[1.6] text-[#f1a69d]"
                      role="alert"
                    >
                      {submissionError}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="premium-primary-btn text-[13px] px-10 py-3 rounded-full"
                    style={{ fontWeight: 500 }}
                  >
                    {isSubmitting ? 'Sending...' : contactPage.submitLabel}
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
