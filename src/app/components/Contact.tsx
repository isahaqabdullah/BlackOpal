'use client';

import { Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { useContactPageDataAttribute, useSiteSettingsDataAttribute } from '../cms/visualEditingAttributes';
import { useSiteContent } from '../content/SiteContentProvider';
import { PageIntro } from './PageIntro';

export function ContactPage() {
  const { contactPage, siteSettings } = useSiteContent();
  const contactPageDataAttribute = useContactPageDataAttribute(contactPage._id);
  const siteSettingsDataAttribute = useSiteSettingsDataAttribute(siteSettings._id);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass = 'premium-input w-full px-4 py-3 text-[14px] transition-colors';

  return (
    <div>
      <PageIntro
        label={contactPage.intro.label}
        title={contactPage.intro.title}
        description={contactPage.intro.description}
        breadcrumbs={[{ label: contactPage.intro.breadcrumbLabel, dataSanity: contactPageDataAttribute('intro.breadcrumbLabel') }]}
        dataSanity={{
          label: contactPageDataAttribute('intro.label'),
          title: contactPageDataAttribute('intro.title'),
          description: contactPageDataAttribute('intro.description'),
        }}
      />

      <section className="pb-12 md:pb-14">
        <div className="premium-shell">
          <div className="grid gap-10 xl:gap-14 xl:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)]">
            <div className="space-y-6">
              <div className="premium-panel-soft p-6 md:p-7">
                <span
                  data-sanity={contactPageDataAttribute('officesTitle')}
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-4"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {contactPage.officesTitle}
                </span>
                <div className="grid gap-3">
                  {siteSettings.officeNetwork.map((office, index) => {
                    const officePath = office._key ? `officeNetwork[_key=="${office._key}"]` : `officeNetwork[${index}]`;

                    return (
                    <address
                      key={`${office.label}-${office.name}`}
                      data-sanity-edit-target
                      className="not-italic rounded-[6px] border border-[#c9a24d]/12 bg-[#050505]/35 p-4"
                    >
                      <span
                        data-sanity={siteSettingsDataAttribute(`${officePath}.label`)}
                        className="text-[#8f835f] text-[10px] tracking-[0.18em] uppercase block mb-1"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        {office.label}
                      </span>
                      <h3
                        data-sanity={siteSettingsDataAttribute(`${officePath}.name`)}
                        className="premium-card-heading text-[15px] mb-1"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                      >
                        {office.name}
                      </h3>
                      {office.address.map((line, lineIndex) => (
                        <p
                          key={`${office.label}-${line}`}
                          data-sanity={siteSettingsDataAttribute(`${officePath}.address[${lineIndex}]`)}
                          className="premium-copy text-[13px] leading-[1.7]"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                        >
                          {line}
                        </p>
                      ))}
                      <div className="mt-4 space-y-2">
                        {office.phone ? (
                          <a
                            data-sanity={siteSettingsDataAttribute(`${officePath}.phone`)}
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
                            data-sanity={siteSettingsDataAttribute(`${officePath}.email`)}
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
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="premium-panel p-8 text-center">
                  <h3
                    data-sanity={contactPageDataAttribute('successTitle')}
                    className="premium-heading text-[18px] mb-2"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {contactPage.successTitle}
                  </h3>
                  <p
                    data-sanity={contactPageDataAttribute('successMessage')}
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
                  <div className="premium-form-grid">
                    <div>
                      <label
                        data-sanity={contactPageDataAttribute('firstNameLabel')}
                        className="text-[12px] text-[#b8ab8b] mb-1.5 block"
                      >
                        {contactPage.firstNameLabel}
                      </label>
                      <input
                        data-sanity={contactPageDataAttribute('firstNamePlaceholder')}
                        type="text"
                        required
                        className={inputClass}
                        placeholder={contactPage.firstNamePlaceholder}
                      />
                    </div>
                    <div>
                      <label
                        data-sanity={contactPageDataAttribute('lastNameLabel')}
                        className="text-[12px] text-[#b8ab8b] mb-1.5 block"
                      >
                        {contactPage.lastNameLabel}
                      </label>
                      <input
                        data-sanity={contactPageDataAttribute('lastNamePlaceholder')}
                        type="text"
                        required
                        className={inputClass}
                        placeholder={contactPage.lastNamePlaceholder}
                      />
                    </div>
                  </div>

                  <div className="premium-form-grid">
                    <div>
                      <label
                        data-sanity={contactPageDataAttribute('emailLabel')}
                        className="text-[12px] text-[#b8ab8b] mb-1.5 block"
                      >
                        {contactPage.emailLabel}
                      </label>
                      <input
                        data-sanity={contactPageDataAttribute('emailPlaceholder')}
                        type="email"
                        required
                        className={inputClass}
                        placeholder={contactPage.emailPlaceholder}
                      />
                    </div>
                    <div>
                      <label
                        data-sanity={contactPageDataAttribute('companyLabel')}
                        className="text-[12px] text-[#b8ab8b] mb-1.5 block"
                      >
                        {contactPage.companyLabel}
                      </label>
                      <input
                        data-sanity={contactPageDataAttribute('companyPlaceholder')}
                        type="text"
                        required
                        className={inputClass}
                        placeholder={contactPage.companyPlaceholder}
                      />
                    </div>
                  </div>

                  <div className="premium-form-grid">
                    <div>
                      <label
                        data-sanity={contactPageDataAttribute('phoneLabel')}
                        className="text-[12px] text-[#b8ab8b] mb-1.5 block"
                      >
                        {contactPage.phoneLabel}
                      </label>
                      <input
                        data-sanity={siteSettingsDataAttribute('websiteContact.phone')}
                        type="tel"
                        className={inputClass}
                        placeholder={siteSettings.websiteContact.phone}
                      />
                    </div>
                    <div>
                      <label
                        data-sanity={contactPageDataAttribute('subjectLabel')}
                        className="text-[12px] text-[#b8ab8b] mb-1.5 block"
                      >
                        {contactPage.subjectLabel}
                      </label>
                      <input
                        data-sanity={contactPageDataAttribute('subjectPlaceholder')}
                        type="text"
                        required
                        className={inputClass}
                        placeholder={contactPage.subjectPlaceholder}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      data-sanity={contactPageDataAttribute('applicationLabel')}
                      className="text-[12px] text-[#b8ab8b] mb-1.5 block"
                    >
                      {contactPage.applicationLabel}
                    </label>
                    <select
                      data-sanity={contactPageDataAttribute('applicationPlaceholder')}
                      required
                      className={`${inputClass} appearance-none`}
                    >
                      <option value="">{contactPage.applicationPlaceholder}</option>
                      {contactPage.applicationOptions.map((option, optionIndex) => (
                        <option key={option} data-sanity={contactPageDataAttribute(`applicationOptions[${optionIndex}]`)}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      data-sanity={contactPageDataAttribute('messageLabel')}
                      className="text-[12px] text-[#b8ab8b] mb-1.5 block"
                    >
                      {contactPage.messageLabel}
                    </label>
                    <textarea
                      data-sanity={contactPageDataAttribute('messagePlaceholder')}
                      rows={5}
                      required
                      className={`${inputClass} resize-none`}
                      placeholder={contactPage.messagePlaceholder}
                    />
                  </div>

                  <button
                    type="submit"
                    className="premium-primary-btn text-[13px] px-10 py-3 rounded-full"
                    style={{ fontWeight: 500 }}
                  >
                    {contactPage.submitLabel}
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
