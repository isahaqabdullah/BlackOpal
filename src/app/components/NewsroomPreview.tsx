import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useSiteContent } from '../content/SiteContentProvider';

export function NewsroomPreview() {
  const { newsroomItems } = useSiteContent();
  const featuredItems = newsroomItems.slice(0, 3);

  return (
    <section className="py-10 md:py-12">
      <div className="premium-shell">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8 md:mb-10">
          <div className="max-w-2xl">
            <span
              className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Newsroom
            </span>
            <h2
              className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2rem,3.5vw,3.15rem)] leading-[1.04] tracking-[-0.02em] mb-4"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Resources and brand updates
            </h2>
            <p
              className="premium-copy premium-reveal premium-reveal-delay-2 text-[14px] leading-[1.8]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              Technical notes and brand notices stay tied to the same products, facilities, and support channels buyers
              already work with.
            </p>
          </div>

          <Link
            to="/newsroom"
            className="premium-link-btn inline-flex items-center gap-2 text-[13px] px-4 py-2.5 rounded-full"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Resource center
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="premium-auto-grid">
          {featuredItems.map((item, index) => (
            <div
              key={item.slug}
              data-sanity-edit-target
              className="premium-panel-soft premium-card-animated premium-reveal p-6 md:p-7"
              style={{ animationDelay: `${120 + index * 90}ms` }}
            >
              <span
                className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {item.type === 'press-release' ? 'Press release' : 'Resource'}
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
              {item.type === 'press-release' ? (
                <Link
                  to={`/newsroom/${item.slug}`}
                  className="premium-link-btn inline-flex items-center gap-2 text-[12px] px-4 py-2 rounded-[10px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Brand update
                  <ArrowRight size={13} />
                </Link>
              ) : (
                <Link
                  to="/contact"
                  className="premium-link-btn inline-flex items-center gap-2 text-[12px] px-4 py-2 rounded-[10px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Request resource
                  <ArrowRight size={13} />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
