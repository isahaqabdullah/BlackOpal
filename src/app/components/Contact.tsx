'use client';

import { Mail, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { useSiteContent } from '../content/SiteContentProvider';
import { formatPhoneNumbers } from '../utils/phone';
import { PageIntro } from './PageIntro';

const attachmentLimits = {
  maxFiles: 3,
  maxFileSize: 5 * 1024 * 1024,
  maxTotalSize: 15 * 1024 * 1024,
};

const acceptedAttachmentTypes = [
  '.pdf',
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.doc',
  '.docx',
  '.xls',
  '.xlsx',
].join(',');

const acceptedAttachmentExtensions = new Set(
  acceptedAttachmentTypes.split(',').map((extension) => extension.slice(1)),
);

const CONTACT_PAGE_HEADING = 'Product Enquiry and Technical Guidance.';

function fileExtension(filename: string) {
  return filename.split('.').pop()?.toLowerCase() ?? '';
}

function formatFileSize(bytes: number) {
  return `${Math.round((bytes / 1024 / 1024) * 10) / 10} MB`;
}

export function ContactPage() {
  const { contactPage, siteSettings } = useSiteContent();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const attachments = formData
      .getAll('attachments')
      .filter((value): value is File => value instanceof File && value.size > 0);

    setIsSubmitting(true);
    setSubmissionError('');

    if (attachments.length > attachmentLimits.maxFiles) {
      setSubmissionError(`Please attach no more than ${attachmentLimits.maxFiles} files.`);
      setIsSubmitting(false);
      return;
    }

    const totalAttachmentSize = attachments.reduce((total, file) => total + file.size, 0);
    const invalidAttachment = attachments.find((file) => {
      const extension = fileExtension(file.name);
      return !acceptedAttachmentExtensions.has(extension) || file.size > attachmentLimits.maxFileSize;
    });

    if (invalidAttachment) {
      setSubmissionError(
        `${invalidAttachment.name} is not supported or is larger than ${formatFileSize(attachmentLimits.maxFileSize)}.`,
      );
      setIsSubmitting(false);
      return;
    }

    if (totalAttachmentSize > attachmentLimits.maxTotalSize) {
      setSubmissionError(`Attachments must be under ${formatFileSize(attachmentLimits.maxTotalSize)} total.`);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
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
        title={CONTACT_PAGE_HEADING}
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
                  {siteSettings.officeNetwork.map((office) => {
                    const phones = formatPhoneNumbers(office.phone);

                    return (
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
                          className="premium-card-heading premium-office-name text-[15px] mb-1"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                        >
                          {office.name}
                        </h3>
                        {office.address.map((line) => (
                          <p
                            key={`${office.label}-${line}`}
                            className="premium-copy text-[14px] leading-[1.65]"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                          >
                            {line}
                          </p>
                        ))}
                        <div className="mt-4 space-y-2">
                          {phones.map((phone) => (
                            <a
                              key={phone.href}
                              href={phone.href}
                              className="flex items-center gap-2 text-[#b8ab8b] transition-colors hover:text-[#f2d78b]"
                              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                            >
                              <Phone size={14} className="shrink-0 text-[#b8ab8b]" />
                              <span className="text-[13px] leading-[1.5]">{phone.display}</span>
                            </a>
                          ))}
                          {office.email ? (
                            <a
                              href={`mailto:${office.email}`}
                              className="flex items-center gap-2 text-[#b8ab8b] transition-colors hover:text-[#f2d78b]"
                              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                            >
                              <Mail size={14} className="shrink-0 text-[#b8ab8b]" />
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
                        className="text-[13px] text-[#b8ab8b] mb-1.5 block"
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
                        className="text-[13px] text-[#b8ab8b] mb-1.5 block"
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
                        className="text-[13px] text-[#b8ab8b] mb-1.5 block"
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
                        className="text-[13px] text-[#b8ab8b] mb-1.5 block"
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
                        className="text-[13px] text-[#b8ab8b] mb-1.5 block"
                      >
                        {contactPage.phoneLabel}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        className="text-[13px] text-[#b8ab8b] mb-1.5 block"
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
                  </div>

                  <div>
                    <label
                      className="text-[13px] text-[#b8ab8b] mb-1.5 block"
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
                      className="text-[13px] text-[#b8ab8b] mb-1.5 block"
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

                  <div>
                    <label
                      className="text-[13px] text-[#b8ab8b] mb-1.5 block"
                    >
                      Attach photos or documents
                    </label>
                    <input
                      type="file"
                      name="attachments"
                      multiple
                      accept={acceptedAttachmentTypes}
                      className={`${inputClass} file:mr-4 file:rounded-full file:border-0 file:bg-[#c9a24d]/15 file:px-4 file:py-2 file:text-[12px] file:font-semibold file:text-[#f2d78b] hover:file:bg-[#c9a24d]/22`}
                    />
                    <p
                      className="mt-2 text-[12px] leading-[1.6] text-[#8f835f]"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    >
                      Up to 3 files, 5 MB each. PDF, images, Word, and Excel files only.
                    </p>
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
                    className="premium-primary-btn text-[14px] px-10 py-3 rounded-full"
                    style={{ fontWeight: 500 }}
                  >
                    {isSubmitting ? 'Sending...' : contactPage.submitLabel}
                  </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {submitted ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#050505]/75 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-success-title"
          aria-describedby="contact-success-message"
        >
          <div className="premium-panel relative w-full max-w-md p-7 text-center shadow-2xl">
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#c9a24d]/20 text-[#b8ab8b] transition-colors hover:border-[#d4ae5b]/45 hover:text-[#f2d78b]"
              aria-label="Close confirmation"
            >
              <X size={16} aria-hidden="true" />
            </button>
            <h3
              id="contact-success-title"
              className="premium-heading mb-3 pr-8 text-[22px]"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {contactPage.successTitle}
            </h3>
            <p
              id="contact-success-message"
              className="premium-copy text-[14px] leading-[1.65]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              {contactPage.successMessage}
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="premium-primary-btn mt-6 rounded-full px-8 py-3 text-[14px]"
              style={{ fontWeight: 500 }}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
