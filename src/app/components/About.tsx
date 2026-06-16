'use client';

import { Building2, Factory, RefreshCcw, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import {
  useAboutPageDataAttribute,
  useSanityDataAttribute,
} from '../cms/visualEditingAttributes';
import type { FeatureIconName } from '../content/siteContent';
import { useSiteContent } from '../content/SiteContentProvider';
import { getSiteNavigation } from './navigation/siteNavigation';
import { PageIntro } from './PageIntro';

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
  const aboutPageDataAttribute = useAboutPageDataAttribute(aboutPage._id);
  const sanityDataAttribute = useSanityDataAttribute();
  const navigation = getSiteNavigation(siteSettings);

  return (
    <div>
      <PageIntro
        label={aboutPage.intro.label}
        title={aboutPage.intro.title}
        description={aboutPage.intro.description}
        titleVisual={
          <span
            className={`premium-brand-logo-frame premium-page-title-logo-frame${
              navigation.logoSubtitle ? ' premium-page-title-logo-frame-stacked' : ''
            }`}
            aria-hidden="true"
          >
            <img
              data-sanity={aboutPageDataAttribute('titleLogoImage')}
              src={navigation.logoImage}
              alt=""
              className="premium-brand-logo premium-page-title-logo"
            />
            {navigation.logoSubtitle ? (
              <span className="premium-page-title-logo-subtitle">{navigation.logoSubtitle}</span>
            ) : null}
          </span>
        }
        breadcrumbs={[{ label: aboutPage.intro.breadcrumbLabel, dataSanity: aboutPageDataAttribute('intro.breadcrumbLabel') }]}
        dataSanity={{
          label: aboutPageDataAttribute('intro.label'),
          title: aboutPageDataAttribute('intro.title'),
          description: aboutPageDataAttribute('intro.description'),
        }}
      />

      <section className="pb-10 md:pb-12">
        <div className="premium-shell">
          <div className="premium-panel premium-split-grid p-7 md:p-9">
            <div className="premium-image-frame premium-image-animated w-full max-w-[42rem]">
              <img
                data-sanity={aboutPageDataAttribute('heroImageUrl')}
                src={aboutPage.heroImage}
                alt={aboutPage.heroImageAlt}
                className="w-full aspect-[5/4] object-cover"
              />
            </div>
            <div>
              <h2
                data-sanity={aboutPageDataAttribute('storyTitle')}
                className="premium-heading premium-heading-elevated text-[clamp(1.7rem,2.8vw,2.35rem)] leading-[1.06] mb-5"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {aboutPage.storyTitle}
              </h2>
              <div
                className="space-y-4 premium-copy text-[14px] leading-[1.65] mb-8"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                {aboutPage.storyParagraphs.map((paragraph, paragraphIndex) => (
                  <p key={paragraph} data-sanity={aboutPageDataAttribute(`storyParagraphs[${paragraphIndex}]`)}>
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="border-y border-[#c9a24d]/10 py-5 mb-8">
                <span
                  data-sanity={aboutPageDataAttribute('officeNetworkLabel')}
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
                        className="premium-card-heading premium-office-name text-[14px] mb-1"
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
                    </address>
                  ))}
                </div>
              </div>

              <div className="premium-compact-grid" data-sanity-edit-target>
                {aboutPage.metrics.map((metric, index) => {
                  const metricPath = metric._key ? `metrics[_key=="${metric._key}"]` : `metrics[${index}]`;

                  return (
                    <div key={metric.label}>
                      <span
                        data-sanity={aboutPageDataAttribute(`${metricPath}.value`)}
                        className="text-[#e6cb87] text-[clamp(1.25rem,2vw,1.8rem)] block mb-1"
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                      >
                        {metric.value}
                      </span>
                      <span
                        data-sanity={aboutPageDataAttribute(`${metricPath}.label`)}
                        className="text-[#8f835f] text-[11px] tracking-[0.12em] uppercase"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                      >
                        {metric.label}
                      </span>
                    </div>
                  );
                })}
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
                  data-sanity-edit-target
                  className="premium-panel-soft premium-card-animated premium-reveal p-6 md:p-7"
                  style={{ animationDelay: `${120 + index * 90}ms` }}
                >
                  <div className="premium-icon-wrap w-10 h-10 rounded-full flex items-center justify-center mb-4">
                    <Icon size={18} className="text-[#e6cb87]" />
                  </div>
                  <h3
                    data-sanity={aboutPageDataAttribute(`${card._key ? `cards[_key=="${card._key}"]` : `cards[${index}]`}.title`)}
                    className="premium-card-heading text-[16px] md:text-[17px] mb-2"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    {card.title}
                  </h3>
                  <p
                    data-sanity={aboutPageDataAttribute(`${card._key ? `cards[_key=="${card._key}"]` : `cards[${index}]`}.desc`)}
                    className="premium-copy text-[14px] leading-[1.65]"
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
                data-sanity={aboutPageDataAttribute('brandUpdateLabel')}
                className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {aboutPage.brandUpdateLabel}
              </span>
              <h2
                data-sanity={sanityDataAttribute('newsroomItem', pressRelease._id, 'title')}
                className="premium-heading text-[1.6rem] mb-3"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {pressRelease.title}
              </h2>
              <p
                data-sanity={sanityDataAttribute('newsroomItem', pressRelease._id, 'summary')}
                className="premium-copy text-[14px] leading-[1.65] mb-5 max-w-3xl"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                {pressRelease.summary}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/newsroom/${pressRelease.slug}`}
                  className="premium-link-btn inline-flex items-center gap-2 text-[14px] px-4 py-2.5 rounded-full"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {aboutPage.brandTransitionCtaLabel}
                </Link>
                <Link
                  href="/production"
                  className="premium-secondary-btn inline-flex items-center gap-2 text-[14px] px-4 py-2.5 rounded-full"
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
