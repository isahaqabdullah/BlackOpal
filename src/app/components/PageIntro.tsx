'use client';

import type { ReactNode } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useSiteSettingsDataAttribute } from '../cms/visualEditingAttributes';
import { useSiteContent } from '../content/SiteContentProvider';

type Breadcrumb = {
  label: string;
  to?: string;
  dataSanity?: string;
};

type PageIntroProps = {
  label: string;
  title: string;
  titleVisual?: ReactNode;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  enableBreadcrumbEditing?: boolean;
  titleClassName?: string;
  dataSanity?: {
    label?: string;
    title?: string;
    description?: string;
  };
};

export function PageIntro({
  label,
  title,
  titleVisual,
  description,
  breadcrumbs = [],
  enableBreadcrumbEditing = true,
  titleClassName = 'text-[clamp(2.2rem,4.8vw,4rem)] tracking-[-0.03em]',
  dataSanity,
}: PageIntroProps) {
  const { siteSettings } = useSiteContent();
  const siteSettingsDataAttribute = useSiteSettingsDataAttribute(siteSettings._id);

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
              <span data-sanity={enableBreadcrumbEditing ? siteSettingsDataAttribute('pageIntro.homeLabel') : undefined}>
                {siteSettings.pageIntro.homeLabel}
              </span>
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`} className="inline-flex items-center gap-2">
                <ChevronRight size={12} className="text-[#6f654c]" />
                {crumb.to ? (
                  <Link href={crumb.to} className="hover:text-[#f2d78b] transition-colors">
                    <span data-sanity={crumb.dataSanity}>{crumb.label}</span>
                  </Link>
                ) : (
                  <span data-sanity={crumb.dataSanity} className="text-[#d7c7a2]">
                    {crumb.label}
                  </span>
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
          data-sanity={dataSanity?.label}
          className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
        >
          {label}
        </span>
        <h1
          data-sanity={dataSanity?.title}
          className={`premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 ${titleClassName} leading-[1.02] max-w-4xl${description ? ' mb-5' : ''}${titleVisual ? ' premium-page-title-visual' : ''}`}
          aria-label={titleVisual ? title : undefined}
          style={{ fontFamily: "'DM Serif Display', serif" }}
        >
          {titleVisual ?? title}
        </h1>
        {description ? (
          <p
            data-sanity={dataSanity?.description}
            className="premium-copy premium-reveal premium-reveal-delay-2 text-[14px] leading-[1.65] max-w-3xl"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          >
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
