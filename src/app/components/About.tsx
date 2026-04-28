import { Building2, Factory, RefreshCcw, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';
import { companyDetails, newsroomMap, siteMetrics } from '../content/siteContent';
import { siteConfig } from '../config/siteConfig';
import { PageIntro } from './PageIntro';

const aboutCards = [
  {
    icon: Factory,
    title: 'Joint venture roots',
    desc:
      'Black Opal was established in 2010 as a joint venture between one of the largest privately owned coconut shell activated carbon manufacturers in India and experienced activated carbon entrepreneurs.',
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
      'Black Opal ties its reputation to quality, innovation, service, reliability, and company-owned manufacturing rather than third-party trading.',
  },
  {
    icon: RefreshCcw,
    title: 'Brand transition',
    desc:
      'The newsroom explains how INDOCARB AC transitioned to Black Opal Carbons without changing products, facilities, pricing, or the support team customers already worked with.',
  },
];

export function AboutPage() {
  const pressRelease = newsroomMap['name-change-press-release'];

  return (
    <div>
      <PageIntro
        label="About"
        title={`${siteConfig.siteName}${companyDetails.legacyName ? `, formerly ${companyDetails.legacyName}` : ''}`}
        description="Company story, manufacturing credibility, and brand context for buyers evaluating Black Opal activated carbon supply."
        breadcrumbs={[{ label: 'About' }]}
      />

      <section className="pb-12 md:pb-16">
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
                  Black Opal was established in 2010 with over 50 years of combined industry experience behind it. That
                  origin story remains central to the Black Opal brand positioning.
                </p>
                <p>
                  Black Opal frames its company-owned manufacturing facilities in India as the foundation for higher
                  quality standards, consistency, and dependable supply into the {siteConfig.marketName} market.
                </p>
                <p>
                  The {companyDetails.headquartersDescriptor} remains the commercial point of contact for sales,
                  inquiries, and support:
                  {` ${companyDetails.headquarters.line1}, ${companyDetails.headquarters.line2}.`}
                </p>
              </div>

              <div className="premium-compact-grid border-t border-[#c9a24d]/10 pt-6">
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

      <section className="py-12 md:py-16">
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
        <section className="py-12 md:py-16">
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
                  to="/newsroom/name-change-press-release"
                  className="premium-link-btn inline-flex items-center gap-2 text-[13px] px-4 py-2.5 rounded-full"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Read the release
                </Link>
                <Link
                  to="/production"
                  className="premium-secondary-btn inline-flex items-center gap-2 text-[13px] px-4 py-2.5 rounded-full"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  View production page
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
