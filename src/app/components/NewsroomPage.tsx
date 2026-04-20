import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { newsroomItems } from '../content/siteContent';
import { PageIntro } from './PageIntro';

const pressRelease = newsroomItems.find((item) => item.type === 'press-release');
const resourceItems = newsroomItems.filter((item) => item.type === 'resource');

export function NewsroomPage() {
  return (
    <div>
      <PageIntro
        label="Newsroom"
        title="Legacy resource index and company updates"
        description="The original website exposed a small newsroom with collateral titles and a name-change announcement. This route preserves those references in a cleaner format."
        breadcrumbs={[{ label: 'Newsroom' }]}
      />

      {pressRelease ? (
        <section className="pb-12 md:pb-16">
          <div className="premium-shell">
            <div className="premium-panel premium-split-grid p-7 md:p-9">
              <div>
                <span
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Featured update
                </span>
                <h2
                  className="premium-heading premium-heading-elevated text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.06] mb-4"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {pressRelease.title}
                </h2>
                <p
                  className="premium-copy text-[14px] leading-[1.85] mb-6"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {pressRelease.summary}
                </p>
                <div className="space-y-3 mb-6">
                  {pressRelease.bullets?.map((bullet) => (
                    <div
                      key={bullet}
                      className="flex items-start gap-3 text-[13px] text-[#d7c7a2]"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    >
                      <span className="w-1.5 h-1.5 bg-[#d4ae5b] rounded-full mt-2 shrink-0 shadow-[0_0_12px_rgba(212,174,91,0.65)]" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to={`/newsroom/${pressRelease.slug}`}
                  className="premium-primary-btn inline-flex items-center gap-2 text-[13px] px-6 py-3 rounded-full"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Read press release
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="premium-panel-soft p-6 md:p-7 self-start">
                <span
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Why it matters
                </span>
                <p
                  className="premium-copy text-[14px] leading-[1.8]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  The press release is the clearest explanation on the legacy site of how the Black Opal brand
                  replaced INDOCARB AC while keeping products, facilities, pricing, and support continuity intact.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="pb-16 md:pb-20">
        <div className="premium-shell">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <h2
                className="premium-heading premium-heading-elevated text-[clamp(1.7rem,2.8vw,2.35rem)] leading-[1.06] mb-3"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Resource titles carried forward from the original site
              </h2>
              <p
                className="premium-copy text-[14px] leading-[1.8] max-w-3xl"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                The legacy newsroom listed these collateral items by title. Where a live download was not available in
                this workspace, the rebuild keeps the title and routes buyers to contact sales for the current copy.
              </p>
            </div>
            <Link
              to="/contact"
              className="premium-secondary-btn inline-flex items-center gap-2 text-[13px] px-5 py-2.5 rounded-full"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Request current collateral
            </Link>
          </div>

          <div className="premium-auto-grid">
            {resourceItems.map((item, index) => (
              <div
                key={item.slug}
                className="premium-panel-soft premium-card-animated premium-reveal p-6 md:p-7"
                style={{ animationDelay: `${120 + index * 90}ms` }}
              >
                <span
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Legacy resource title
                </span>
                <h3
                  className="premium-card-heading text-[18px] mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  {item.title}
                </h3>
                <p
                  className="premium-copy text-[13px] leading-[1.75] mb-5"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {item.summary}
                </p>
                <Link
                  to="/contact"
                  className="premium-link-btn inline-flex items-center gap-2 text-[12px] px-4 py-2 rounded-[10px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Request latest version
                  <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
