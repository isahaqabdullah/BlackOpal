'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePageCopyDataAttribute, useSanityDataAttribute } from '../cms/visualEditingAttributes';
import { useSiteContent } from '../content/SiteContentProvider';
import { PageIntro } from './PageIntro';

export function ApplicationsPage() {
  const { applications, pageCopy, productMap } = useSiteContent();
  const copy = pageCopy.applicationsPage;
  const pageCopyDataAttribute = usePageCopyDataAttribute();
  const sanityDataAttribute = useSanityDataAttribute();

  return (
    <div>
      <PageIntro
        label={copy.intro.label}
        title={copy.intro.title}
        description={copy.intro.description}
        breadcrumbs={[{ label: copy.intro.breadcrumbLabel, dataSanity: pageCopyDataAttribute('applicationsPage.intro.breadcrumbLabel') }]}
        dataSanity={{
          label: pageCopyDataAttribute('applicationsPage.intro.label'),
          title: pageCopyDataAttribute('applicationsPage.intro.title'),
          description: pageCopyDataAttribute('applicationsPage.intro.description'),
        }}
      />

      <section className="pb-10 md:pb-12">
        <div className="premium-shell space-y-6">
          {applications.map((application, index) => (
            <div
              key={application.slug}
              data-sanity-edit-target
              className="premium-panel-soft premium-card-animated premium-reveal p-6 md:p-7"
              style={{ animationDelay: `${120 + index * 90}ms` }}
            >
              <div className="premium-split-grid items-start">
                <div>
                  <span
                    data-sanity={pageCopyDataAttribute('applicationsPage.itemLabel')}
                    className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    {copy.itemLabel}
                  </span>
                  <h2
                    data-sanity={sanityDataAttribute('application', application._id, 'name')}
                    className="premium-heading premium-heading-elevated text-[clamp(1.55rem,2.4vw,2rem)] leading-[1.08] mb-3"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {application.name}
                  </h2>
                  <p
                    data-sanity={sanityDataAttribute('application', application._id, 'summary')}
                    className="premium-copy text-[14px] leading-[1.65] mb-5 max-w-2xl"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                  >
                    {application.summary}
                  </p>
                  <p
                    data-sanity={sanityDataAttribute('application', application._id, 'intro')}
                    className="premium-copy text-[14px] leading-[1.65] mb-6 max-w-2xl"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                  >
                    {application.intro}
                  </p>

                  <div className="premium-form-grid gap-8">
                    <div>
                      <span
                        data-sanity={pageCopyDataAttribute('applicationsPage.keyPointsLabel')}
                        className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        {copy.keyPointsLabel}
                      </span>
                      <div className="space-y-2">
                        {application.keyPoints.map((point, pointIndex) => (
                          <div
                            key={point}
                            data-sanity={sanityDataAttribute('application', application._id, `keyPoints[${pointIndex}]`)}
                            className="flex items-start gap-3 text-[15px] text-[#d7c7a2]"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                          >
                            <span className="w-1.5 h-1.5 bg-[#d4ae5b] rounded-full mt-2 shrink-0 shadow-[0_0_12px_rgba(212,174,91,0.65)]" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span
                        data-sanity={pageCopyDataAttribute('applicationsPage.recommendedProductsLabel')}
                        className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        {copy.recommendedProductsLabel}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {application.recommendedProducts.map((slug, productIndex) => (
                          <span
                            key={slug}
                            data-sanity={sanityDataAttribute(
                              'application',
                              application._id,
                              `recommendedProducts[${productIndex}]`,
                            )}
                            className="premium-link-btn text-[12px] px-3 py-1.5 rounded-full"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                          >
                            {productMap[slug]?.shortName ?? slug}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 pt-6 border-t border-[#c9a24d]/10 flex flex-wrap gap-3">
                    <Link
                      href={`/applications/${application.slug}`}
                      className="premium-primary-btn inline-flex items-center gap-2 text-[14px] px-5 py-2.5 rounded-full"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      {copy.detailCtaLabel}
                      <ArrowRight size={14} />
                    </Link>
                    <Link
                      href={copy.discussCtaPath}
                      className="premium-secondary-btn inline-flex items-center gap-2 text-[14px] px-5 py-2.5 rounded-full"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      {copy.discussCtaLabel}
                    </Link>
                  </div>
                </div>

                <div className="premium-image-frame w-full max-w-[38rem] xl:justify-self-end">
                  <img
                    data-sanity={sanityDataAttribute('application', application._id, 'imageUrl')}
                    src={application.image}
                    alt={application.name}
                    className="w-full aspect-[16/9] max-h-[26rem] object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
