import { Link } from 'react-router';
import { useSiteContent } from '../content/SiteContentProvider';
import { homePageDataAttribute } from '../cms/visualEditingAttributes';
import axionVideo from '../../public/images/axionvideo1.mp4';
import heroLogo from '../../public/images/black-opal-hero-logo-transparent.png';

export function Hero() {
  const { homePage } = useSiteContent();
  const homePageDocumentId = homePage._id;

  return (
    <section className="relative overflow-hidden border-b border-[#c9a24d]/10">
      <div className="pointer-events-none absolute inset-0">
        <div className="premium-flow-lines absolute inset-x-[-10%] top-[10%] bottom-[-12%]" />
        <div className="absolute left-[10%] top-[8%] h-48 w-48 rounded-full bg-[#c9a24d]/10 blur-3xl" />
        <div className="absolute right-[5%] top-[18%] h-64 w-64 rounded-full bg-[#8b6725]/14 blur-3xl" />
      </div>

      <div className="premium-shell pt-14 pb-8 md:pt-20 md:pb-10 relative z-10">
        <h1
          className="premium-brand-title premium-reveal"
          aria-label="Black Opal Carbons"
        >
          <span className="premium-brand-logo-frame" aria-hidden="true">
            <img src={heroLogo} alt="" className="premium-brand-logo" />
          </span>
        </h1>
        <div className="premium-split-grid premium-hero-grid">
          <div data-sanity-edit-target>
            <span
              data-sanity={homePageDataAttribute('heroKicker', homePageDocumentId)}
              className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-5"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              {homePage.heroKicker}
            </span>
            <h2
              data-sanity={homePageDataAttribute('heroTitle', homePageDocumentId)}
              className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2.4rem,5vw,4.7rem)] leading-[0.98] tracking-[-0.03em] mb-6 max-w-xl"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {homePage.heroTitle}
            </h2>
            <p
              data-sanity={homePageDataAttribute('heroDescription', homePageDocumentId)}
              className="premium-copy premium-hero-copy premium-reveal premium-reveal-delay-2 text-[16px] md:text-[18px] leading-[1.72] mb-9 max-w-2xl"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              {homePage.heroDescription}
            </p>
            <div className="premium-reveal premium-reveal-delay-3 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="premium-primary-btn text-[13px] px-7 py-3 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                Request a Quote
              </Link>
              <Link
                to="/contact"
                className="premium-secondary-btn text-[13px] px-7 py-3 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                Talk to Technical Sales
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-[58rem] xl:justify-self-end">
            <div className="pointer-events-none absolute inset-x-[12%] bottom-[-7%] h-24 rounded-full bg-[#c9a24d]/12 blur-3xl" />
            <div className="premium-image-frame premium-image-animated premium-reveal premium-reveal-delay-1">
              <div className="relative overflow-hidden rounded-[1.15rem]">
                <video
                  src={axionVideo}
                  className="block w-full aspect-video object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Axion production video"
                >
                  Your browser does not support the video tag.
                </video>

                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.06),transparent_34%),linear-gradient(180deg,rgba(5,5,5,0.02),rgba(5,5,5,0.22))]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
