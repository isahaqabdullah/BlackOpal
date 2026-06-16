'use client';

import Link from 'next/link';
import { useSiteContent } from '../content/SiteContentProvider';
import { useHomePageDataAttribute } from '../cms/visualEditingAttributes';

export function CTABand() {
  const { homePage } = useSiteContent();
  const homePageDocumentId = homePage._id;
  const homePageDataAttribute = useHomePageDataAttribute(homePageDocumentId);

  return (
    <section className="py-10 md:py-12">
      <div className="premium-shell">
        <div
          className="premium-panel relative overflow-hidden text-center px-6 py-10 md:px-10 md:py-12"
          data-sanity-edit-target
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[8%] top-[20%] h-32 w-32 rounded-full bg-[#c9a24d]/12 blur-3xl" />
            <div className="absolute right-[6%] bottom-[10%] h-40 w-40 rounded-full bg-[#8c6526]/14 blur-3xl" />
          </div>
          <h2
            data-sanity={homePageDataAttribute('ctaTitle')}
            className="premium-heading premium-heading-elevated premium-reveal text-[clamp(2rem,3.5vw,3.15rem)] leading-[1.04] tracking-[-0.02em] mb-4 relative z-10"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {homePage.ctaTitle}
          </h2>
          <p
            data-sanity={homePageDataAttribute('ctaDescription')}
            className="premium-copy premium-reveal premium-reveal-delay-1 text-[14px] mb-8 max-w-lg mx-auto relative z-10"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          >
            {homePage.ctaDescription}
          </p>
          <div className="premium-reveal premium-reveal-delay-2 flex flex-wrap justify-center gap-3 relative z-10">
            <Link
              href={homePage.ctaPrimaryPath}
              className="premium-primary-btn text-[14px] px-8 py-3 rounded-full"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              {homePage.ctaPrimaryLabel}
            </Link>
            <Link
              href={homePage.ctaSecondaryPath}
              className="premium-secondary-btn text-[14px] px-8 py-3 rounded-full"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              {homePage.ctaSecondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
