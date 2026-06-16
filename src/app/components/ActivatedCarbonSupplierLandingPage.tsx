'use client';

import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Factory,
  Globe2,
  PackageCheck,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import {
  type SupplierLandingPage,
} from '../content/supplierLandingPages';
import { useSiteContent } from '../content/SiteContentProvider';
import { formatPhoneNumbers } from '../utils/phone';
import { PageIntro } from './PageIntro';

type ActivatedCarbonSupplierLandingPageProps = {
  page: SupplierLandingPage;
};

function defined<T>(value: T | undefined): value is T {
  return Boolean(value);
}

export function ActivatedCarbonSupplierLandingPage({ page }: ActivatedCarbonSupplierLandingPageProps) {
  const { applicationMap, productMap, siteSettings } = useSiteContent();
  const selectedProducts = page.productSlugs.map((slug) => productMap[slug]).filter(defined);
  const selectedApplications = page.applicationSlugs.map((slug) => applicationMap[slug]).filter(defined);

  return (
    <div>
      <PageIntro
        label={page.label}
        title={page.title}
        description={page.description}
        breadcrumbs={[
          { label: 'Activated carbon supply', to: '/activated-carbon-suppliers' },
          { label: page.breadcrumbLabel },
        ]}
        enableBreadcrumbEditing={false}
      />

      <section className="pb-10 md:pb-12">
        <div className="premium-shell">
          <div className="premium-panel p-6 md:p-8">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)]">
              <div>
                <span
                  className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Manufacturing focus
                </span>
                <h2
                  className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2rem,3.5vw,3.05rem)] leading-[1.05] mb-5"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {page.introTitle}
                </h2>
                <p
                  className="premium-copy premium-reveal premium-reveal-delay-2 text-[14px] leading-[1.65] max-w-3xl mb-7"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {page.intro}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="premium-primary-btn inline-flex items-center gap-2 text-[14px] px-6 py-3 rounded-full"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    {page.ctaLabel}
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/products"
                    className="premium-secondary-btn inline-flex items-center gap-2 text-[14px] px-6 py-3 rounded-full"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    View product range
                  </Link>
                </div>
              </div>

              <div className="premium-panel-soft p-5 md:p-6">
                <div className="premium-icon-wrap mb-5 flex h-11 w-11 items-center justify-center rounded-[8px] text-[#e6cb87]">
                  <Globe2 size={20} />
                </div>
                <span
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-4"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Quality and export readiness
                </span>
                <div className="space-y-3">
                  {page.highlights.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-start gap-3 text-[15px] leading-[1.65] text-[#d7c7a2]"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    >
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#e6cb87]" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="premium-shell">
          <div className="mb-7 max-w-3xl">
            <span
              className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Industrial requirements
            </span>
            <h2
              className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.08] mb-4"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Built around industrial requirements and specification control
            </h2>
            <p
              className="premium-copy premium-reveal premium-reveal-delay-2 text-[14px] leading-[1.65]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              Black Opal supports industrial requirements that depend on consistent lots, clear specifications,
              practical packing, export documentation, and dependable shipment planning.
            </p>
          </div>

          <div className="premium-compact-grid">
            {page.capabilitySignals.map((signal, index) => (
              <div
                key={signal.title}
                className="premium-panel-soft premium-card-animated premium-reveal p-5 md:p-6"
                style={{ animationDelay: `${120 + index * 80}ms` }}
              >
                <div className="premium-icon-wrap mb-5 flex h-11 w-11 items-center justify-center rounded-[8px] text-[#e6cb87]">
                  {index === 0 ? <ClipboardList size={20} /> : index === 1 ? <ShieldCheck size={20} /> : <Factory size={20} />}
                </div>
                <h3
                  className="premium-card-heading text-[17px] mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  {signal.title}
                </h3>
                <p
                  className="premium-copy text-[14px] leading-[1.65]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {signal.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="premium-shell">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="premium-panel-soft p-6 md:p-7">
              <div className="premium-icon-wrap mb-5 flex h-11 w-11 items-center justify-center rounded-[8px] text-[#e6cb87]">
                <PackageCheck size={20} />
              </div>
              <span
                className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                Grade selection
              </span>
              <h2
                className="premium-heading premium-heading-elevated text-[clamp(1.85rem,3vw,2.5rem)] leading-[1.08] mb-4"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Technical details needed for grade selection
              </h2>
              <div className="space-y-3">
                {page.specificationNotes.map((note) => (
                  <div
                    key={note}
                    className="flex items-start gap-3 text-[15px] leading-[1.75] text-[#d7c7a2]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                  >
                    <span className="w-1.5 h-1.5 bg-[#d4ae5b] rounded-full mt-2 shrink-0 shadow-[0_0_12px_rgba(212,174,91,0.65)]" />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="premium-panel-soft p-6 md:p-7">
              <span
                className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-4"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                Product match
              </span>
              <div className="grid gap-3 sm:grid-cols-2">
                {selectedProducts.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    className="rounded-[8px] border border-[#c9a24d]/12 bg-[#050505]/35 p-4 transition-colors hover:border-[#d4ae5b]/25"
                  >
                    <span
                      className="text-[#8f835f] text-[10px] tracking-[0.18em] uppercase block mb-2"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      {product.shortName}
                    </span>
                    <h3
                      className="premium-card-heading text-[15px] mb-2"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                    >
                      {product.name}
                    </h3>
                    <p
                      className="premium-copy text-[14px] leading-[1.65] mb-3"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                    >
                      {product.summary}
                    </p>
                    <span
                      className="inline-flex items-center gap-2 text-[#f2d78b] text-[12px]"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      Product details
                      <ArrowRight size={13} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedApplications.length ? (
        <section className="py-10 md:py-12">
          <div className="premium-shell">
            <div className="mb-7 max-w-3xl">
              <span
                className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                Applications
              </span>
              <h2
                className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.08] mb-4"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Common applications for this carbon range
              </h2>
            </div>

            <div className="premium-auto-grid">
              {selectedApplications.map((application, index) => (
                <Link
                  key={application.slug}
                  href={`/applications/${application.slug}`}
                  className="premium-panel-soft premium-card-animated premium-reveal p-5 md:p-6"
                  style={{ animationDelay: `${120 + index * 80}ms` }}
                >
                  <h3
                    className="premium-card-heading text-[17px] mb-3"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    {application.name}
                  </h3>
                  <p
                    className="premium-copy text-[14px] leading-[1.65] mb-5"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                  >
                    {application.summary}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 text-[#f2d78b] text-[13px]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    Application details
                    <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="py-10 md:py-14">
        <div className="premium-shell">
          <div className="premium-panel p-6 md:p-8">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div>
                <span
                  className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Talk to Black Opal
                </span>
                <h2
                  className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.08] mb-4"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {page.ctaTitle}
                </h2>
                <p
                  className="premium-copy premium-reveal premium-reveal-delay-2 text-[14px] leading-[1.65] mb-7"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {page.ctaDescription}
                </p>
                <Link
                  href="/contact"
                  className="premium-primary-btn inline-flex items-center gap-2 text-[14px] px-6 py-3 rounded-full"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Contact sales
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {siteSettings.officeNetwork.slice(0, 4).map((office) => {
                  const phones = formatPhoneNumbers(office.phone);

                  return (
                    <address
                      key={`${office.label}-${office.name}`}
                      className="not-italic rounded-[8px] border border-[#c9a24d]/12 bg-[#050505]/35 p-4"
                    >
                      <h3
                        className="premium-card-heading text-[15px] mb-1"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                      >
                        {office.label}
                      </h3>
                      <p
                        className="premium-copy premium-office-name text-[14px] leading-[1.6] mb-2"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                      >
                        {office.name}
                      </p>
                      {office.address.map((line) => (
                        <p
                          key={`${office.label}-${line}`}
                          className="premium-copy text-[14px] leading-[1.65]"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                        >
                          {line}
                        </p>
                      ))}
                      <div className="mt-4 space-y-1.5">
                        {phones.map((phone) => (
                          <a
                            key={phone.href}
                            href={phone.href}
                            className="block w-fit text-[13px] text-[#f7efdb] transition-colors hover:text-[#f2d78b]"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                          >
                            {phone.display}
                          </a>
                        ))}
                        {office.email ? (
                          <a
                            href={`mailto:${office.email}`}
                            className="block w-fit break-all text-[13px] text-[#f7efdb] transition-colors hover:text-[#f2d78b]"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                          >
                            {office.email}
                          </a>
                        ) : null}
                      </div>
                    </address>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
