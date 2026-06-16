'use client';

import { ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';
import type { ResourceDetailPage as ResourceDetailPageContent } from '../content/resourcePages';
import { PageIntro } from './PageIntro';

type ResourceDetailPageProps = {
  page: ResourceDetailPageContent;
};

export function ResourceDetailPage({ page }: ResourceDetailPageProps) {
  return (
    <div>
      <PageIntro
        label={page.label}
        title={page.title}
        description={page.description}
        breadcrumbs={[
          { label: 'Resources', to: '/resources' },
          { label: page.title },
        ]}
        enableBreadcrumbEditing={false}
      />

      <section className="pb-12 md:pb-14">
        <div className="premium-shell">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.12fr)_minmax(18rem,0.88fr)]">
            <article className="premium-panel p-7 md:p-9">
              <div className="space-y-5">
                {page.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="premium-copy text-[14px] leading-[1.7]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>

            <aside className="premium-panel-soft p-6 md:p-7 self-start">
              <div className="premium-icon-wrap mb-5 flex h-11 w-11 items-center justify-center rounded-[8px] text-[#e6cb87]">
                <FileText size={20} />
              </div>
              <span
                className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                Documentation review
              </span>
              <p
                className="premium-copy text-[14px] leading-[1.65] mb-6"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                Product family, application, packing format, and destination-market documentation are confirmed before
                detailed grade information is shared.
              </p>
              <Link
                href={page.ctaHref}
                className="premium-primary-btn inline-flex items-center gap-2 text-[14px] px-6 py-3 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {page.ctaLabel}
                <ArrowRight size={14} />
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
