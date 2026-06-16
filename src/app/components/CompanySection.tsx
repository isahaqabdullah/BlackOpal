'use client';

import Link from 'next/link';
import { useSiteContent } from '../content/SiteContentProvider';
import { useHomePageDataAttribute } from '../cms/visualEditingAttributes';

export function CompanySection() {
  const { homePage } = useSiteContent();
  const homePageDocumentId = homePage._id;
  const homePageDataAttribute = useHomePageDataAttribute(homePageDocumentId);

  return (
    <section className="py-10 md:py-12">
      <div className="premium-shell">
        <div className="premium-split-grid">
          <div className="premium-image-frame premium-image-animated premium-reveal premium-reveal-delay-1 w-full max-w-[42rem]">
            <img
              data-sanity={homePageDataAttribute('companyImage')}
              src={homePage.companyImage}
              alt={homePage.companyImageAlt}
              className="w-full aspect-[5/4] object-cover"
            />
          </div>
          <div data-sanity-edit-target>
            <span
              data-sanity={homePageDataAttribute('companyEyebrow')}
              className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              {homePage.companyEyebrow}
            </span>
            <h2
              data-sanity={homePageDataAttribute('companyTitle')}
              className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2rem,3.5vw,3.15rem)] leading-[1.04] tracking-[-0.02em] mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {homePage.companyTitle}
            </h2>
            <div
              className="space-y-4 premium-copy premium-reveal premium-reveal-delay-2 text-[14px] leading-[1.65] mb-10"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              <p>
                <span data-sanity={homePageDataAttribute('companyBodyPrimary')}>
                  {homePage.companyBodyPrimary}
                </span>
              </p>
              <p>
                <span data-sanity={homePageDataAttribute('companyBodySecondary')}>
                  {homePage.companyBodySecondary}
                </span>
              </p>
            </div>
            <div className="premium-compact-grid premium-reveal premium-reveal-delay-3 border-t border-[#c9a24d]/10 pt-6 mb-7">
              {homePage.companyMetrics.map((s, index) => {
                const metricPath = s._key ? `companyMetrics[_key=="${s._key}"]` : `companyMetrics[${index}]`;

                return (
                  <div key={s.label} className={index === 0 ? '' : 'xl:border-l xl:border-[#c9a24d]/10 xl:pl-4'}>
                    <span
                      data-sanity={homePageDataAttribute(`${metricPath}.value`)}
                      className="text-[#e6cb87] text-[clamp(1.3rem,2vw,1.8rem)] block mb-0.5"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {s.value}
                    </span>
                    <span
                      data-sanity={homePageDataAttribute(`${metricPath}.label`)}
                      className="text-[#8f835f] text-[11px] tracking-[0.12em] uppercase"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={homePage.companyAboutCtaPath}
                className="premium-primary-btn text-[14px] px-6 py-2.5 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {homePage.companyAboutCtaLabel}
              </Link>
              <Link
                href={homePage.companyProductionCtaPath}
                className="premium-secondary-btn text-[14px] px-6 py-2.5 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {homePage.companyProductionCtaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
