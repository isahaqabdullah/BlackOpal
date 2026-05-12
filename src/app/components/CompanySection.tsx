import { Link } from 'react-router';
import { siteMetrics } from '../content/siteContent';
import { useSiteContent } from '../content/SiteContentProvider';
import { homePageDataAttribute } from '../cms/visualEditingAttributes';

export function CompanySection() {
  const { homePage } = useSiteContent();
  const homePageDocumentId = homePage._id;

  return (
    <section className="py-10 md:py-12">
      <div className="premium-shell">
        <div className="premium-split-grid">
          <div className="premium-image-frame premium-image-animated premium-reveal premium-reveal-delay-1 w-full max-w-[42rem]">
            <img
              src="https://images.unsplash.com/photo-1554070211-e3953a3de374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFudWZhY3R1cmluZyUyMHdhcmVob3VzZSUyMGZhY3RvcnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzU0NzU0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Manufacturing facility"
              className="w-full aspect-[5/4] object-cover"
            />
          </div>
          <div data-sanity-edit-target>
            <span
              data-sanity={homePageDataAttribute('companyEyebrow', homePageDocumentId)}
              className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              {homePage.companyEyebrow}
            </span>
            <h2
              data-sanity={homePageDataAttribute('companyTitle', homePageDocumentId)}
              className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2rem,3.5vw,3.15rem)] leading-[1.04] tracking-[-0.02em] mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {homePage.companyTitle}
            </h2>
            <div
              className="space-y-4 premium-copy premium-reveal premium-reveal-delay-2 text-[14px] leading-[1.85] mb-10"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              <p>
                <span data-sanity={homePageDataAttribute('companyBodyPrimary', homePageDocumentId)}>
                  {homePage.companyBodyPrimary}
                </span>
              </p>
              <p>
                <span data-sanity={homePageDataAttribute('companyBodySecondary', homePageDocumentId)}>
                  {homePage.companyBodySecondary}
                </span>
              </p>
            </div>
            <div className="premium-compact-grid premium-reveal premium-reveal-delay-3 border-t border-[#c9a24d]/10 pt-6 mb-7">
              {siteMetrics.map((s, index) => (
                <div key={s.label} className={index === 0 ? '' : 'xl:border-l xl:border-[#c9a24d]/10 xl:pl-4'}>
                  <span
                    className="text-[#e6cb87] text-[clamp(1.3rem,2vw,1.8rem)] block mb-0.5"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="text-[#8f835f] text-[11px] tracking-[0.12em] uppercase"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/about"
                className="premium-primary-btn text-[13px] px-6 py-2.5 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                About Black Opal
              </Link>
              <Link
                to="/production"
                className="premium-secondary-btn text-[13px] px-6 py-2.5 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                View production
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
