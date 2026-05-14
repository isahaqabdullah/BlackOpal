'use client';

import type { ReactNode } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useSiteContent } from '../content/SiteContentProvider';

type Breadcrumb = {
  label: string;
  to?: string;
};

type PageIntroProps = {
  label: string;
  title: string;
  titleVisual?: ReactNode;
  description?: string;
  breadcrumbs?: Breadcrumb[];
};

export function PageIntro({ label, title, titleVisual, description, breadcrumbs = [] }: PageIntroProps) {
  const { siteSettings } = useSiteContent();

  return (
    <section className="pt-10 pb-6 md:pt-12 md:pb-8">
      <div className="premium-shell">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <nav
            aria-label={siteSettings.pageIntro.breadcrumbAriaLabel}
            className="flex flex-wrap items-center gap-2 text-[12px] text-[#8f835f]"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            <Link href={siteSettings.pageIntro.homePath} className="hover:text-[#f2d78b] transition-colors">
              {siteSettings.pageIntro.homeLabel}
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-2">
                <ChevronRight size={12} className="text-[#6f654c]" />
                {crumb.to ? (
                  <Link href={crumb.to} className="hover:text-[#f2d78b] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#d7c7a2]">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>

          <Link
            href={siteSettings.pageIntro.backHomePath}
            className="premium-link-btn inline-flex items-center gap-2 text-[12px] px-4 py-2 rounded-full"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            <ArrowLeft size={13} />
            {siteSettings.pageIntro.backHomeLabel}
          </Link>
        </div>

        <span
          className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          {label}
        </span>
        <h1
          className={`premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2.2rem,4.8vw,4rem)] leading-[1.02] tracking-[-0.03em] max-w-4xl${description ? ' mb-5' : ''}${titleVisual ? ' premium-page-title-visual' : ''}`}
          aria-label={titleVisual ? title : undefined}
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          {titleVisual ?? title}
        </h1>
        {description ? (
          <p
            className="premium-copy premium-reveal premium-reveal-delay-2 text-[15px] leading-[1.85] max-w-3xl"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          >
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
