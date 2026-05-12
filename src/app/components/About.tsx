'use client';

import { Building2, Factory, RefreshCcw, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { companyDetails, siteMetrics } from '../content/siteContent';
import { useSiteContent } from '../content/SiteContentProvider';
import { PageIntro } from './PageIntro';
const heroLogo = '/images/black-opal-hero-logo-transparent.png';

const aboutCards = [
  {
    icon: Factory,
    title: 'Joint venture roots',
    desc:
      'The group was established in 2010 as a joint venture between a leading South India coconut shell activated carbon manufacturer and experienced activated carbon entrepreneurs.',
  },
  {
    icon: Building2,
    title: companyDetails.marketBaseTitle,
    desc: companyDetails.marketBaseDescription,
  },
  {
    icon: ShieldCheck,
    title: 'Quality and reliability',
    desc:
      'Company-owned and operated manufacturing facilities support tighter quality control, stronger reliability, and more consistent coconut activated carbon performance.',
  },
  {
    icon: RefreshCcw,
    title: 'Brand transition',
    desc:
      'The INDOCARB AC transition to Black Opal Carbons preserved the products, facilities, pricing structure, and support team customers already worked with.',
  },
];

export function AboutPage() {
  const { newsroomMap } = useSiteContent();
  const pressRelease = newsroomMap['name-change-press-release'];

  return (
    <div>
      <PageIntro
        label="About"
        title="Black Opal Carbons"
        titleVisual={
          <span className="premium-brand-logo-frame premium-page-title-logo-frame" aria-hidden="true">
            <img src={heroLogo} alt="" className="premium-brand-logo premium-page-title-logo" />
          </span>
        }
        breadcrumbs={[{ label: 'About' }]}
      />

      <section className="pb-10 md:pb-12">
        <div className="premium-shell">
          <div className="premium-panel premium-split-grid p-7 md:p-9">
            <div className="premium-image-frame premium-image-animated w-full max-w-[42rem]">
              <img
                src="https://images.unsplash.com/photo-1554070211-e3953a3de374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFudWZhY3R1cmluZyUyMHdhcmVob3VzZSUyMGZhY3RvcnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzU0NzU0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Black Opal manufacturing and warehousing"
                className="w-full aspect-[5/4] object-cover"
              />
            </div>
            <div>
              <h2
                className="premium-heading premium-heading-elevated text-[clamp(1.7rem,2.8vw,2.35rem)] leading-[1.06] mb-5"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Reliability, consistency, and service since 2010
              </h2>
              <div
                className="space-y-4 premium-copy text-[14px] leading-[1.85] mb-8"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                <p>
                  The group was established in 2010 as a joint venture between the largest privately owned coconut shell
                  activated carbon manufacturer in South India and highly experienced activated carbon entrepreneurs
                  with more than 50 years of combined field experience.
                </p>
                <p>
                  Over the years, Black Opal Carbons has become one of the most recognized brands in the activated
                  carbon industry, with a reputation built on quality, innovation, service, and reliability.
                </p>
                <p>
                  Company-owned and operated manufacturing facilities give the group direct control over raw material
                  selection, activation, processing, and final quality assurance. That operating model supports higher
                  standards, dependable supply, and consistent product performance.
                </p>
                <p>
                  The state-of-the-art factory in South India has an annual production capacity of 50 million pounds of
                  coconut activated carbon for export markets. The team is committed to value-added products and
                  services, open communication, and customer support focused on satisfaction 24 hours a day, 7 days a
                  week.
                </p>
              </div>

              <div className="border-y border-[#c9a24d]/10 py-5 mb-8">
                <span
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-4"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Office network
                </span>
                <div className="grid gap-5 lg:grid-cols-3">
                  {companyDetails.officeNetwork.map((office) => (
                    <div key={`${office.label}-${office.name}`}>
                      <span
                        className="text-[#8f835f] text-[10px] tracking-[0.18em] uppercase block mb-1"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        {office.label}
                      </span>
                      <h3
                        className="premium-card-heading text-[14px] mb-1"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                      >
                        {office.name}
                      </h3>
                      {office.address.map((line) => (
                        <p
                          key={`${office.label}-${line}`}
                          className="premium-copy text-[12px] leading-[1.65]"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                        >
                          {line}
                        </p>
                      ))}
                      {office.phone ? (
                        <p
                          className="premium-copy text-[12px] leading-[1.65] mt-2"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                        >
                          Tel: {office.phone}
                        </p>
                      ) : null}
                      {office.email ? (
                        <p
                          className="premium-copy text-[12px] leading-[1.65]"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                        >
                          Email: {office.email}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              <div className="premium-compact-grid">
                {siteMetrics.map((metric) => (
                  <div key={metric.label}>
                    <span
                      className="text-[#e6cb87] text-[clamp(1.25rem,2vw,1.8rem)] block mb-1"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {metric.value}
                    </span>
                    <span
                      className="text-[#8f835f] text-[11px] tracking-[0.12em] uppercase"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    >
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="premium-shell">
          <div className="premium-auto-grid">
            {aboutCards.map((card, index) => (
              <div
                key={card.title}
                className="premium-panel-soft premium-card-animated premium-reveal p-6 md:p-7"
                style={{ animationDelay: `${120 + index * 90}ms` }}
              >
                <div className="premium-icon-wrap w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <card.icon size={18} className="text-[#e6cb87]" />
                </div>
                <h3
                  className="premium-card-heading text-[16px] md:text-[17px] mb-2"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  {card.title}
                </h3>
                <p
                  className="premium-copy text-[13px] leading-[1.75]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {pressRelease ? (
        <section className="py-10 md:py-12">
          <div className="premium-shell">
            <div className="premium-panel-soft p-6 md:p-7">
              <span
                className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                Brand update
              </span>
              <h2
                className="premium-heading text-[1.6rem] mb-3"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {pressRelease.title}
              </h2>
              <p
                className="premium-copy text-[14px] leading-[1.8] mb-5 max-w-3xl"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                {pressRelease.summary}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/newsroom/${pressRelease.slug}`}
                  className="premium-link-btn inline-flex items-center gap-2 text-[13px] px-4 py-2.5 rounded-full"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Brand transition
                </Link>
                <Link
                  href="/production"
                  className="premium-secondary-btn inline-flex items-center gap-2 text-[13px] px-4 py-2.5 rounded-full"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Production capability
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
