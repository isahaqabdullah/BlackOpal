'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePageCopyDataAttribute } from '../cms/visualEditingAttributes';
import { useSiteContent } from '../content/SiteContentProvider';

export function NotFoundPage() {
  const { pageCopy } = useSiteContent();
  const copy = pageCopy.notFoundPage;
  const pageCopyDataAttribute = usePageCopyDataAttribute();

  return (
    <section className="py-20 md:py-28">
      <div className="premium-shell">
        <div className="premium-panel text-center px-6 py-10 md:px-10 md:py-12">
          <span
            data-sanity={pageCopyDataAttribute('notFoundPage.label')}
            className="premium-kicker text-[11px] tracking-[0.24em] uppercase mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            {copy.label}
          </span>
          <h1
            data-sanity={pageCopyDataAttribute('notFoundPage.title')}
            className="premium-heading premium-heading-elevated text-[clamp(2rem,4vw,3.4rem)] leading-[1.04] tracking-[-0.02em] mb-4"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {copy.title}
          </h1>
          <p
            data-sanity={pageCopyDataAttribute('notFoundPage.description')}
            className="premium-copy text-[14px] leading-[1.65] max-w-2xl mx-auto mb-8"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          >
            {copy.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={copy.homeCtaPath}
              className="premium-primary-btn inline-flex items-center gap-2 text-[14px] px-6 py-3 rounded-full"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              <ArrowLeft size={14} />
              {copy.homeCtaLabel}
            </Link>
            <Link
              href={copy.secondaryCtaPath}
              className="premium-secondary-btn inline-flex items-center gap-2 text-[14px] px-6 py-3 rounded-full"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              {copy.secondaryCtaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
