'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePageCopyDataAttribute, useSanityDataAttribute } from '../cms/visualEditingAttributes';
import { useSiteContent } from '../content/SiteContentProvider';

export function NewsroomPreview() {
  const { newsroomItems, pageCopy } = useSiteContent();
  const copy = pageCopy.newsroomPreview;
  const featuredItems = newsroomItems.slice(0, 3);
  const pageCopyDataAttribute = usePageCopyDataAttribute();
  const sanityDataAttribute = useSanityDataAttribute();

  return (
    <section className="py-10 md:py-12">
      <div className="premium-shell">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-8 md:mb-10">
          <div className="max-w-2xl">
            <span
              data-sanity={pageCopyDataAttribute('newsroomPreview.kicker')}
              className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              {copy.kicker}
            </span>
            <h2
              data-sanity={pageCopyDataAttribute('newsroomPreview.title')}
              className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2rem,3.5vw,3.15rem)] leading-[1.04] tracking-[-0.02em] mb-4"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {copy.title}
            </h2>
            <p
              data-sanity={pageCopyDataAttribute('newsroomPreview.description')}
              className="premium-copy premium-reveal premium-reveal-delay-2 text-[14px] leading-[1.65]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              {copy.description}
            </p>
          </div>

          <Link
            href={copy.resourceCenterCtaPath}
            className="premium-link-btn inline-flex items-center gap-2 text-[14px] px-4 py-2.5 rounded-full"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            {copy.resourceCenterCtaLabel}
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
                data-sanity={pageCopyDataAttribute(
                  item.type === 'press-release' ? 'newsroomPreview.pressReleaseLabel' : 'newsroomPreview.resourceLabel',
                )}
                className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {item.type === 'press-release' ? copy.pressReleaseLabel : copy.resourceLabel}
              </span>
              <h3
                data-sanity={sanityDataAttribute('newsroomItem', item._id, 'title')}
                className="premium-card-heading text-[18px] mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                {item.title}
              </h3>
              <p
                data-sanity={sanityDataAttribute('newsroomItem', item._id, 'summary')}
                className="premium-copy text-[14px] leading-[1.65] mb-5"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                {item.summary}
              </p>
              {item.type === 'press-release' ? (
                <Link
                  href={`/newsroom/${item.slug}`}
                  className="premium-link-btn inline-flex items-center gap-2 text-[12px] px-4 py-2 rounded-[10px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {copy.brandUpdateCtaLabel}
                  <ArrowRight size={13} />
                </Link>
              ) : (
                <Link
                  href={copy.requestResourceCtaPath}
                  className="premium-link-btn inline-flex items-center gap-2 text-[12px] px-4 py-2 rounded-[10px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {copy.requestResourceCtaLabel}
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
