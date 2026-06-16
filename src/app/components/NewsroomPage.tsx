'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePageCopyDataAttribute, useSanityDataAttribute } from '../cms/visualEditingAttributes';
import { useSiteContent } from '../content/SiteContentProvider';
import { PageIntro } from './PageIntro';

export function NewsroomPage() {
  const { newsroomItems, pageCopy } = useSiteContent();
  const copy = pageCopy.newsroomPage;
  const pressRelease = newsroomItems.find((item) => item.type === 'press-release');
  const resourceItems = newsroomItems.filter((item) => item.type === 'resource');
  const pageCopyDataAttribute = usePageCopyDataAttribute();
  const sanityDataAttribute = useSanityDataAttribute();

  return (
    <div>
      <PageIntro
        label={copy.intro.label}
        title={copy.intro.title}
        description={copy.intro.description}
        breadcrumbs={[{ label: copy.intro.breadcrumbLabel, dataSanity: pageCopyDataAttribute('newsroomPage.intro.breadcrumbLabel') }]}
        dataSanity={{
          label: pageCopyDataAttribute('newsroomPage.intro.label'),
          title: pageCopyDataAttribute('newsroomPage.intro.title'),
          description: pageCopyDataAttribute('newsroomPage.intro.description'),
        }}
      />

      {pressRelease ? (
        <section className="pb-10 md:pb-12">
          <div className="premium-shell">
            <div data-sanity-edit-target className="premium-panel premium-split-grid p-7 md:p-9">
              <div>
                <span
                  data-sanity={pageCopyDataAttribute('newsroomPage.featuredUpdateLabel')}
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {copy.featuredUpdateLabel}
                </span>
                <h2
                  data-sanity={sanityDataAttribute('newsroomItem', pressRelease._id, 'title')}
                  className="premium-heading premium-heading-elevated text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.06] mb-4"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {pressRelease.title}
                </h2>
                <p
                  data-sanity={sanityDataAttribute('newsroomItem', pressRelease._id, 'summary')}
                  className="premium-copy text-[14px] leading-[1.65] mb-6"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {pressRelease.summary}
                </p>
                <div className="space-y-3 mb-6">
                  {pressRelease.bullets?.map((bullet, bulletIndex) => (
                    <div
                      key={bullet}
                      data-sanity={sanityDataAttribute('newsroomItem', pressRelease._id, `bullets[${bulletIndex}]`)}
                      className="flex items-start gap-3 text-[15px] text-[#d7c7a2]"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                    >
                      <span className="w-1.5 h-1.5 bg-[#d4ae5b] rounded-full mt-2 shrink-0 shadow-[0_0_12px_rgba(212,174,91,0.65)]" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/newsroom/${pressRelease.slug}`}
                  className="premium-primary-btn inline-flex items-center gap-2 text-[14px] px-6 py-3 rounded-full"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {copy.brandDetailsCtaLabel}
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="premium-panel-soft p-6 md:p-7 self-start">
                <span
                  data-sanity={pageCopyDataAttribute('newsroomPage.whyMattersLabel')}
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {copy.whyMattersLabel}
                </span>
                <p
                  data-sanity={pageCopyDataAttribute('newsroomPage.whyMattersBody')}
                  className="premium-copy text-[14px] leading-[1.65]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {copy.whyMattersBody}
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="pb-12 md:pb-14">
        <div className="premium-shell">
          <div className="mb-10">
            <div>
              <h2
                data-sanity={pageCopyDataAttribute('newsroomPage.resourcesTitle')}
                className="premium-heading premium-heading-elevated text-[clamp(1.7rem,2.8vw,2.35rem)] leading-[1.06] mb-3"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {copy.resourcesTitle}
              </h2>
              <p
                data-sanity={pageCopyDataAttribute('newsroomPage.resourcesDescription')}
                className="premium-copy text-[14px] leading-[1.65] max-w-3xl"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                {copy.resourcesDescription}
              </p>
            </div>
          </div>

          <div className="premium-auto-grid">
            {resourceItems.map((item, index) => {
              const resourceHref = item.documentUrl || copy.latestVersionCtaPath;
              const resourceLabel = item.documentLabel || copy.latestVersionCtaLabel;
              const opensDocument = Boolean(item.documentUrl);

              return (
                <div
                  key={item.slug}
                  data-sanity-edit-target
                  className="premium-panel-soft premium-card-animated premium-reveal p-6 md:p-7"
                  style={{ animationDelay: `${120 + index * 90}ms` }}
                >
                  <span
                    data-sanity={pageCopyDataAttribute('newsroomPage.resourceLabel')}
                    className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    {copy.resourceLabel}
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
                  <Link
                    href={resourceHref}
                    target={opensDocument ? '_blank' : undefined}
                    rel={opensDocument ? 'noreferrer' : undefined}
                    className="premium-link-btn inline-flex items-center gap-2 text-[12px] px-4 py-2 rounded-[10px]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    {resourceLabel}
                    <ArrowRight size={13} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
