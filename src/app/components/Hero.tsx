'use client';

import Link from 'next/link';
import { useSiteContent } from '../content/SiteContentProvider';
import { useHomePageDataAttribute } from '../cms/visualEditingAttributes';

export function Hero() {
  const { homePage } = useSiteContent();
  const activeSiteId = process.env.NEXT_PUBLIC_SITE_ID || homePage.siteId || 'black-opal-india';
  const isIndiaSite = activeSiteId === 'black-opal-india';
  const heroLogoImage = isIndiaSite ? '/images/black-opal-india-logo-original.png' : homePage.heroLogoImage;
  const heroLogoAlt = isIndiaSite ? 'Black Opal logo' : homePage.heroLogoAlt;
  const heroLogoCaption = isIndiaSite ? 'WHERE PURITY BEGINS' : '';
  const heroTitle = isIndiaSite ? 'Premium Coconut Shell Activated Carbon' : homePage.heroTitle;
  const videoBrandLogoImage = isIndiaSite ? '/images/black-opal-india-logo-original.png' : '/images/black-opal-nav-logo-transparent.png';
  const videoBrandLogoClassName = `premium-video-brand-logo${isIndiaSite ? ' premium-video-brand-logo-india' : ''}`;
  const homePageDocumentId = homePage._id;
  const homePageDataAttribute = useHomePageDataAttribute(homePageDocumentId);

  return (
    <section className="relative overflow-hidden border-b border-[#c9a24d]/10">
      <div className="pointer-events-none absolute inset-0">
        <div className="premium-flow-lines absolute inset-x-[-10%] top-[10%] bottom-[-12%]" />
        <div className="absolute left-[10%] top-[8%] h-48 w-48 rounded-full bg-[#c9a24d]/10 blur-3xl" />
        <div className="absolute right-[5%] top-[18%] h-64 w-64 rounded-full bg-[#8b6725]/14 blur-3xl" />
      </div>

      <div className="premium-shell pt-14 pb-8 md:pt-20 md:pb-10 relative z-10">
        <div className="premium-brand-title premium-reveal">
          <span className={`premium-brand-logo-frame${heroLogoCaption ? ' premium-brand-logo-frame-stacked' : ''}`}>
            <img
              src={heroLogoImage}
              alt={heroLogoAlt}
              className="premium-brand-logo"
            />
            {heroLogoCaption ? (
              <span className="premium-brand-logo-caption" aria-hidden="true">
                {heroLogoCaption}
                <span className="premium-brand-logo-divider" />
              </span>
            ) : null}
          </span>
        </div>
        <div className="premium-split-grid premium-hero-grid">
          <div data-sanity-edit-target>
            <span
              data-sanity={homePageDataAttribute('heroKicker')}
              className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-5"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              {homePage.heroKicker}
            </span>
            <h1
              data-sanity={homePageDataAttribute('heroTitle')}
              className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2.25rem,4.6vw,4.35rem)] leading-[0.98] tracking-normal mb-6 max-w-xl"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {heroTitle}
            </h1>
            <p
              data-sanity={homePageDataAttribute('heroDescription')}
              className="premium-copy premium-hero-copy premium-reveal premium-reveal-delay-2 text-[16px] md:text-[18px] leading-[1.72] mb-9 max-w-2xl"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              {homePage.heroDescription}
            </p>
            <div className="premium-reveal premium-reveal-delay-3 flex flex-wrap gap-3">
              <Link
                href={homePage.heroPrimaryCtaPath}
                className="premium-primary-btn text-[13px] px-7 py-3 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {homePage.heroPrimaryCtaLabel}
              </Link>
              <Link
                href={homePage.heroSecondaryCtaPath}
                className="premium-secondary-btn text-[13px] px-7 py-3 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {homePage.heroSecondaryCtaLabel}
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-[58rem] xl:justify-self-end">
            <div className="pointer-events-none absolute inset-x-[12%] bottom-[-7%] h-24 rounded-full bg-[#c9a24d]/12 blur-3xl" />
            <div className="premium-image-frame premium-image-animated premium-reveal premium-reveal-delay-1">
              <div className="relative overflow-hidden rounded-[1.15rem]">
                <video
                  data-sanity={homePageDataAttribute('heroVideoUrl')}
                  src={homePage.heroVideoUrl}
                  className="block w-full aspect-video object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={homePage.heroVideoLabel}
                >
                  {homePage.heroVideoFallback}
                </video>

                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.06),transparent_34%),linear-gradient(180deg,rgba(5,5,5,0.02),rgba(5,5,5,0.22))]" />
                <div className="premium-video-brand-mark" aria-hidden="true">
                  <img
                    src={videoBrandLogoImage}
                    alt=""
                    className={videoBrandLogoClassName}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
