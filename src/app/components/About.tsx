'use client';

import { Building2, Factory, RefreshCcw, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import type { FeatureIconName } from '../content/siteContent';
import { useSiteContent } from '../content/SiteContentProvider';
import { PageIntro } from './PageIntro';
const heroLogo = '/images/black-opal-hero-logo-transparent.png';

const icons: Record<FeatureIconName, typeof Factory> = {
  'building-2': Building2,
  factory: Factory,
  headphones: Building2,
  layers: Building2,
  'refresh-ccw': RefreshCcw,
  'shield-check': ShieldCheck,
  target: Building2,
  'tree-palm': Factory,
  truck: Building2,
};

export function AboutPage() {
  const { aboutPage, newsroomMap, siteSettings } = useSiteContent();
  const pressRelease = newsroomMap['name-change-press-release'];

  return (
    <div>
      <PageIntro
        label={aboutPage.intro.label}
        title={aboutPage.intro.title}
        description={aboutPage.intro.description}
        titleVisual={
          <span className="premium-brand-logo-frame premium-page-title-logo-frame" aria-hidden="true">
            <img src={heroLogo} alt="" className="premium-brand-logo premium-page-title-logo" />
          </span>
        }
        breadcrumbs={[{ label: aboutPage.intro.breadcrumbLabel }]}
      />

      <section className="pb-10 md:pb-12">
        <div className="premium-shell">
          <div className="premium-panel premium-split-grid p-7 md:p-9">
            <div className="premium-image-frame premium-image-animated w-full max-w-[42rem]">
              <img
                src={aboutPage.heroImage}
                alt={aboutPage.heroImageAlt}
                className="w-full aspect-[5/4] object-cover"
              />
            </div>
            <div>
              <h2
                className="premium-heading premium-heading-elevated text-[clamp(1.7rem,2.8vw,2.35rem)] leading-[1.06] mb-5"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {aboutPage.storyTitle}
              </h2>
              <div
                className="space-y-4 premium-copy text-[14px] leading-[1.85] mb-8"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                {aboutPage.storyParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="border-y border-[#c9a24d]/10 py-5 mb-8">
                <span
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-4"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {aboutPage.officeNetworkLabel}
                </span>
                <div className="grid gap-3 lg:grid-cols-3">
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
                    </address>
                  ))}
                </div>
              </div>

              <div className="premium-compact-grid">
                {aboutPage.metrics.map((metric) => (
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
            {aboutPage.cards.map((card, index) => {
              const Icon = icons[card.icon] ?? Factory;

              return (
              <div
                key={card.title}
                className="premium-panel-soft premium-card-animated premium-reveal p-6 md:p-7"
                style={{ animationDelay: `${120 + index * 90}ms` }}
              >
                <div className="premium-icon-wrap w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <Icon size={18} className="text-[#e6cb87]" />
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
              );
            })}
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
                {aboutPage.brandUpdateLabel}
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
                  {aboutPage.brandTransitionCtaLabel}
                </Link>
                <Link
                  href="/production"
                  className="premium-secondary-btn inline-flex items-center gap-2 text-[13px] px-4 py-2.5 rounded-full"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {aboutPage.productionCapabilityCtaLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
