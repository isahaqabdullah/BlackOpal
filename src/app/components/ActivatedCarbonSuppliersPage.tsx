'use client';

import {
  ArrowRight,
  CheckCircle2,
  Factory,
  PackageCheck,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import Link from 'next/link';
import { supplierLandingPagePath, supplierLandingPages } from '../content/supplierLandingPages';
import { useSiteContent } from '../content/SiteContentProvider';
import { formatPhoneNumbers } from '../utils/phone';
import { PageIntro } from './PageIntro';

const supplierCapabilities = [
  'Black Opal Group coconut shell activated carbon manufacturing heritage',
  'Company-owned facilities with quality control from raw material selection to final shipment',
  'Granular, powder, impregnated, and catalytic activated carbon products',
  'NSF 42, NSF 61, and Prop 65 aligned positioning for water-treatment applications',
  'Global customer coordination backed by Black Opal manufacturing and product support',
];

const evaluationPoints = [
  {
    icon: Factory,
    title: 'Coconut shell manufacturing',
    body: 'Selected coconut shell feedstock, controlled activation, particle sizing, and final assurance support consistent adsorption performance.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality and consistency',
    body: 'Company-owned and operated manufacturing facilities support the reliability, hardness, low ash, and attrition resistance expected from premium coconut carbon.',
  },
  {
    icon: PackageCheck,
    title: 'Application-matched grades',
    body: 'Granular, powder, impregnated, and catalytic products are positioned around water treatment, gold recovery, air and gas, oil and gas, and specialty purification.',
  },
  {
    icon: Truck,
    title: 'Global export support',
    body: 'Black Opal Carbons connects global export markets with the wider Black Opal product portfolio, technical support, and office network.',
  },
];

export function ActivatedCarbonSuppliersPage() {
  const { applications, products, siteSettings } = useSiteContent();

  return (
    <div>
      <PageIntro
        label="Activated Carbon Manufacturing"
        title="Premium coconut shell activated carbon manufacturing"
        description="Black Opal Carbons manufactures high-performance coconut shell activated carbon for water treatment, gold recovery, air and gas purification, oil and gas, catalytic carbon, and specialty industrial applications."
        breadcrumbs={[{ label: 'Activated carbon manufacturing' }]}
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
                  Manufacturing capability
                </span>
                <h2
                  className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2rem,3.5vw,3.05rem)] leading-[1.05] mb-5"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Pioneering activated carbon solutions from the Black Opal Group
                </h2>
                <p
                  className="premium-copy premium-reveal premium-reveal-delay-2 text-[14px] leading-[1.65] max-w-3xl mb-7"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  Black Opal Carbons carries forward the IndoCarb activated carbon legacy with coconut shell products
                  built for purity, performance, service, and reliability. The portfolio is shaped around application
                  needs, from drinking-water filtration and industrial process water to gold recovery, gas purification,
                  refinery service, and specialty catalytic carbon.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="premium-primary-btn inline-flex items-center gap-2 text-[14px] px-6 py-3 rounded-full"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    Contact Black Opal
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/products"
                    className="premium-secondary-btn inline-flex items-center gap-2 text-[14px] px-6 py-3 rounded-full"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    View product families
                  </Link>
                </div>
              </div>

              <div className="premium-panel-soft p-5 md:p-6">
                <span
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-4"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Core strengths
                </span>
                <div className="space-y-3">
                  {supplierCapabilities.map((capability) => (
                    <div
                      key={capability}
                      className="flex items-start gap-3 text-[15px] leading-[1.65] text-[#d7c7a2]"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    >
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#e6cb87]" />
                      <span>{capability}</span>
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
              Product families
            </span>
            <h2
              className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.08] mb-4"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Activated carbon products
            </h2>
            <p
              className="premium-copy premium-reveal premium-reveal-delay-2 text-[14px] leading-[1.65]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              The Black Opal portfolio covers the main coconut shell activated carbon categories used across liquid
              phase and vapor phase purification systems.
            </p>
          </div>

          <div className="premium-auto-grid">
            {products.map((product, index) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="premium-panel-soft premium-card-animated premium-reveal p-5 md:p-6"
                style={{ animationDelay: `${120 + index * 80}ms` }}
              >
                <span
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {product.shortName}
                </span>
                <h3
                  className="premium-card-heading text-[18px] mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  {product.name}
                </h3>
                <p
                  className="premium-copy text-[14px] leading-[1.65] mb-5"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {product.summary}
                </p>
                <span
                  className="inline-flex items-center gap-2 text-[#f2d78b] text-[13px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Product details
                  <ArrowRight size={14} />
                </span>
              </Link>
            ))}
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
              Product capability
            </span>
            <h2
              className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.08] mb-4"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Product and application pathways
            </h2>
            <p
              className="premium-copy premium-reveal premium-reveal-delay-2 text-[14px] leading-[1.65]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              Black Opal organizes its coconut shell activated carbon portfolio by product format, application
              environment, and performance requirement. These pages connect each carbon family with the treatment
              conditions it is built to serve.
            </p>
          </div>

          <div className="premium-auto-grid">
            {supplierLandingPages.map((page, index) => (
              <Link
                key={page.slug}
                href={supplierLandingPagePath(page.slug)}
                className="premium-panel-soft premium-card-animated premium-reveal p-5 md:p-6"
                style={{ animationDelay: `${120 + index * 45}ms` }}
              >
                <span
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {page.label}
                </span>
                <h3
                  className="premium-card-heading text-[17px] mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  {page.title}
                </h3>
                <p
                  className="premium-copy text-[14px] leading-[1.65] mb-5"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {page.description}
                </p>
                <span
                  className="inline-flex items-center gap-2 text-[#f2d78b] text-[13px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  View capability
                  <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="premium-shell">
          <div className="premium-compact-grid">
            {evaluationPoints.map((point, index) => {
              const Icon = point.icon;

              return (
                <div
                  key={point.title}
                  className="premium-panel-soft premium-card-animated premium-reveal p-5 md:p-6"
                  style={{ animationDelay: `${120 + index * 80}ms` }}
                >
                  <div className="premium-icon-wrap mb-5 flex h-11 w-11 items-center justify-center rounded-[8px] text-[#e6cb87]">
                    <Icon size={20} />
                  </div>
                  <h3
                    className="premium-card-heading text-[17px] mb-3"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    {point.title}
                  </h3>
                  <p
                    className="premium-copy text-[14px] leading-[1.65]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                  >
                    {point.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="premium-shell">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div className="premium-panel-soft p-6 md:p-7">
              <div className="premium-icon-wrap mb-5 flex h-11 w-11 items-center justify-center rounded-[8px] text-[#e6cb87]">
                <Factory size={20} />
              </div>
              <h2
                className="premium-heading premium-heading-elevated text-[clamp(1.85rem,3vw,2.5rem)] leading-[1.08] mb-4"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Black Opal Group heritage
              </h2>
              <p
                className="premium-copy text-[14px] leading-[1.65] mb-4"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                The group was established in 2010 through activated carbon manufacturing and field experience, with a
                reputation built on quality, innovation, service, and reliability.
              </p>
              <p
                className="premium-copy text-[14px] leading-[1.65]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                Company-owned manufacturing supports tighter control over coconut shell selection, activation, sizing,
                testing, and final assurance before shipment.
              </p>
            </div>

            <div className="premium-panel-soft p-6 md:p-7">
              <div className="premium-icon-wrap mb-5 flex h-11 w-11 items-center justify-center rounded-[8px] text-[#e6cb87]">
                <ShieldCheck size={20} />
              </div>
              <h2
                className="premium-heading premium-heading-elevated text-[clamp(1.85rem,3vw,2.5rem)] leading-[1.08] mb-4"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Quality from feedstock to final carbon
              </h2>
              <p
                className="premium-copy text-[14px] leading-[1.65] mb-4"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                Black Opal’s quality position starts with selected coconut shell raw material and continues through
                controlled activation, screening, washing or pH adjustment where required, packing, and final checks.
              </p>
              <p
                className="premium-copy text-[14px] leading-[1.65]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                The result is an application-focused carbon range with strong hardness, surface area, attrition
                resistance, and product consistency across water, mining, gas, refinery, and specialty markets.
              </p>
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
              Application support
            </span>
            <h2
              className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(1.9rem,3vw,2.6rem)] leading-[1.08] mb-4"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Activated carbon by application
            </h2>
          </div>

          <div className="premium-auto-grid">
            {applications.slice(0, 6).map((application, index) => (
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

      <section className="py-10 md:py-14">
        <div className="premium-shell">
          <div className="premium-panel p-6 md:p-8">
            <div className="grid gap-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div>
                <span
                  className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Office network
                </span>
                <h2
                  className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.08] mb-4"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  Connect with Black Opal Carbons
                </h2>
                <p
                  className="premium-copy premium-reveal premium-reveal-delay-2 text-[14px] leading-[1.65] mb-7"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  The Black Opal office network connects global export markets with coconut activated carbon product families,
                  technical support, and company-owned manufacturing capabilities.
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
                {siteSettings.officeNetwork.map((office) => {
                  const phones = formatPhoneNumbers(office.phone);

                  return (
                    <address
                      key={`${office.label}-${office.name}`}
                      className="not-italic rounded-[8px] border border-[#c9a24d]/12 bg-[#050505]/35 p-4"
                    >
                      <span
                        className="text-[#8f835f] text-[10px] tracking-[0.18em] uppercase block mb-1"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        {office.label}
                      </span>
                      <h3
                        className="premium-card-heading premium-office-name text-[15px] mb-1"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
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
