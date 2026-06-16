'use client';

import Link from 'next/link';
import { Droplets, Gem, Wind, Fuel, FlaskConical, Cog, ArrowRight } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentProvider';
import { useHomePageDataAttribute, useSanityDataAttribute } from '../cms/visualEditingAttributes';

const iconMap = {
  'water-treatment': Droplets,
  'gold-recovery': Gem,
  'air-gas': Wind,
  'oil-gas': Fuel,
  'catalytic-carbon': FlaskConical,
  'other-applications': Cog,
};

function getApplicationIcon(slug: string) {
  return iconMap[slug as keyof typeof iconMap] ?? Cog;
}

export function ApplicationsGrid() {
  const { applications, homePage } = useSiteContent();
  const homePageDocumentId = homePage._id;
  const homePageDataAttribute = useHomePageDataAttribute(homePageDocumentId);
  const sanityDataAttribute = useSanityDataAttribute();

  return (
    <section className="py-10 md:py-12">
      <div className="premium-shell">
        <div className="mb-8 md:mb-10" data-sanity-edit-target>
          <span
            data-sanity={homePageDataAttribute('applicationSectionKicker')}
            className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            {homePage.applicationSectionKicker}
          </span>
          <h2
            data-sanity={homePageDataAttribute('applicationSectionTitle')}
            className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2rem,3.5vw,3.15rem)] leading-[1.04] tracking-[-0.02em] max-w-2xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {homePage.applicationSectionTitle}
          </h2>
        </div>

        <div className="premium-auto-grid">
          {applications.map((a, index) => {
            const Icon = getApplicationIcon(a.slug);

            return (
              <Link
                key={a.slug}
                data-sanity-edit-target
                href={`/applications/${a.slug}`}
                className="premium-panel-soft premium-card-animated premium-reveal p-6 transition-colors group hover:border-[#d4ae5b]/20"
                style={{ animationDelay: `${120 + index * 90}ms` }}
              >
                <div className="premium-icon-wrap w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <Icon size={18} className="text-[#e6cb87]" />
                </div>
                <h3
                  data-sanity={sanityDataAttribute('application', a._id, 'name')}
                  className="premium-card-heading text-[16px] md:text-[17px] mb-2 max-w-[16ch]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  {a.name}
                </h3>
                <p
                  data-sanity={sanityDataAttribute('application', a._id, 'summary')}
                  className="premium-copy text-[14px] leading-[1.65] mb-4"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {a.summary}
                </p>
                <span className="premium-link-btn inline-flex items-center gap-2 text-[12px] px-3.5 py-2 rounded-[8px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  {homePage.applicationCardCtaLabel} <ArrowRight size={12} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
