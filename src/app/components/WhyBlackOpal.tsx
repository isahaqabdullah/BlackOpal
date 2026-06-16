'use client';

import { Building2, Factory, Headphones, Layers, RefreshCcw, ShieldCheck, Target, TreePalm, Truck } from 'lucide-react';
import { useHomePageDataAttribute } from '../cms/visualEditingAttributes';
import { useSiteContent } from '../content/SiteContentProvider';
import type { FeatureIconName } from '../content/siteContent';

const icons: Record<FeatureIconName, typeof TreePalm> = {
  'building-2': Building2,
  factory: Factory,
  headphones: Headphones,
  layers: Layers,
  'refresh-ccw': RefreshCcw,
  'shield-check': ShieldCheck,
  target: Target,
  'tree-palm': TreePalm,
  truck: Truck,
};

export function WhyBlackOpal() {
  const { homePage } = useSiteContent();
  const homePageDataAttribute = useHomePageDataAttribute(homePage._id);

  return (
    <section className="py-10 md:py-12">
      <div className="premium-shell">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <span
            data-sanity={homePageDataAttribute('whyKicker')}
            className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            {homePage.whyKicker}
          </span>
          <h2
            data-sanity={homePageDataAttribute('whyTitle')}
            className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2rem,3.5vw,3.15rem)] leading-[1.04] tracking-[-0.02em]"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {homePage.whyTitle}
          </h2>
        </div>

        <div className="premium-auto-grid gap-y-8">
          {homePage.whyReasons.map((r, index) => {
            const Icon = icons[r.icon] ?? Layers;
            const reasonPath = r._key ? `whyReasons[_key=="${r._key}"]` : `whyReasons[${index}]`;

            return (
              <div
                key={r.title}
                data-sanity-edit-target
                className="premium-panel-soft premium-card-animated premium-reveal p-6 md:p-7"
                style={{ animationDelay: `${120 + index * 90}ms` }}
              >
                <div className="premium-icon-wrap w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <Icon size={18} className="text-[#e6cb87]" />
                </div>
                <h3
                  data-sanity={homePageDataAttribute(`${reasonPath}.title`)}
                  className="premium-card-heading text-[16px] md:text-[17px] mb-2 max-w-[18ch]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  {r.title}
                </h3>
                <p
                  data-sanity={homePageDataAttribute(`${reasonPath}.desc`)}
                  className="premium-copy text-[14px] leading-[1.65]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {r.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
