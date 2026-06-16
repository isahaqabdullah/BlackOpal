'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { usePageCopyDataAttribute, useSanityDataAttribute } from '../cms/visualEditingAttributes';
import { useSiteContent } from '../content/SiteContentProvider';
import { NotFoundPage } from './NotFoundPage';
import { PageIntro } from './PageIntro';

export function ApplicationDetailPage() {
  const { applicationSlug } = useParams<{ applicationSlug: string }>();
  const { applicationMap, pageCopy, productMap, status } = useSiteContent();
  const application = applicationSlug ? applicationMap[applicationSlug] : undefined;
  const copy = pageCopy.applicationDetailPage;
  const pageCopyDataAttribute = usePageCopyDataAttribute();
  const sanityDataAttribute = useSanityDataAttribute();

  if (!application && status === 'loading') {
    return null;
  }

  if (!application) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <PageIntro
        label={copy.introLabel}
        title={application.name}
        description={application.summary}
        breadcrumbs={[
          {
            label: copy.applicationsBreadcrumbLabel,
            to: copy.applicationsPath,
            dataSanity: pageCopyDataAttribute('applicationDetailPage.applicationsBreadcrumbLabel'),
          },
          { label: application.name, dataSanity: sanityDataAttribute('application', application._id, 'name') },
        ]}
        dataSanity={{
          label: pageCopyDataAttribute('applicationDetailPage.introLabel'),
          title: sanityDataAttribute('application', application._id, 'name'),
          description: sanityDataAttribute('application', application._id, 'summary'),
        }}
      />

      <section className="pb-6 md:pb-8">
        <div className="premium-shell">
          <div className="premium-split-grid items-start">
            <div data-sanity-edit-target className="premium-panel-soft premium-reveal premium-reveal-delay-1 p-6 md:p-7">
              <span
                data-sanity={pageCopyDataAttribute('applicationDetailPage.overviewLabel')}
                className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {copy.overviewLabel}
              </span>
              <p
                data-sanity={sanityDataAttribute('application', application._id, 'intro')}
                className="premium-copy text-[14px] leading-[1.65] mb-6"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                {application.intro}
              </p>

              <div className="space-y-3">
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

              {application.grades?.length ? (
                <div className="pt-6 mt-6 border-t border-[#c9a24d]/10">
                  <span
                    data-sanity={pageCopyDataAttribute('applicationDetailPage.referencedGradesLabel')}
                    className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    {copy.referencedGradesLabel}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {application.grades.map((grade, gradeIndex) => (
                      <span
                        key={grade}
                        data-sanity={sanityDataAttribute('application', application._id, `grades[${gradeIndex}]`)}
                        className="premium-link-btn text-[12px] px-3 py-1.5 rounded-full"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        {grade}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="premium-image-frame premium-image-animated premium-reveal premium-reveal-delay-2 w-full max-w-[42rem] xl:justify-self-end">
              <img
                data-sanity={sanityDataAttribute('application', application._id, 'imageUrl')}
                src={application.image}
                alt={application.name}
                className="w-full aspect-[16/9] max-h-[28rem] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-4 pb-10 md:pt-5 md:pb-12">
        <div className="premium-shell space-y-6">
          {application.sections.map((section, index) => {
            const sectionPath = section._key ? `sections[_key=="${section._key}"]` : `sections[${index}]`;

            return (
              <div
                key={section.title}
                data-sanity-edit-target
                className="premium-panel-soft premium-card-animated premium-reveal p-6 md:p-7"
                style={{ animationDelay: `${120 + index * 90}ms` }}
              >
                <h2
                  data-sanity={sanityDataAttribute('application', application._id, `${sectionPath}.title`)}
                  className="premium-heading premium-heading-elevated text-[clamp(1.45rem,2.2vw,1.9rem)] leading-[1.08] mb-3"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {section.title}
                </h2>
                <p
                  data-sanity={sanityDataAttribute('application', application._id, `${sectionPath}.body`)}
                  className="premium-copy text-[14px] leading-[1.65]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {section.body}
                </p>
                {section.bullets?.length ? (
                  <div className="space-y-2 mt-5">
                    {section.bullets.map((bullet, bulletIndex) => (
                      <div
                        key={bullet}
                        data-sanity={sanityDataAttribute(
                          'application',
                          application._id,
                          `${sectionPath}.bullets[${bulletIndex}]`,
                        )}
                        className="flex items-start gap-3 text-[15px] text-[#d7c7a2]"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                      >
                        <span className="w-1.5 h-1.5 bg-[#d4ae5b] rounded-full mt-2 shrink-0 shadow-[0_0_12px_rgba(212,174,91,0.65)]" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="pb-12 md:pb-14">
        <div className="premium-shell">
          <div data-sanity-edit-target className="premium-panel px-6 py-7 md:px-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              <div className="max-w-2xl">
                <span
                  data-sanity={pageCopyDataAttribute('applicationDetailPage.recommendedProductsLabel')}
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {copy.recommendedProductsLabel}
                </span>
                <h2
                  data-sanity={pageCopyDataAttribute('applicationDetailPage.recommendedProductsTitle')}
                  className="premium-heading text-[1.5rem] mb-2"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {copy.recommendedProductsTitle}
                </h2>
                <p
                  data-sanity={pageCopyDataAttribute('applicationDetailPage.recommendedProductsDescription')}
                  className="premium-copy text-[14px] mb-5"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {copy.recommendedProductsDescription}
                </p>
                <div className="flex flex-wrap gap-3">
                  {application.recommendedProducts.map((slug) => {
                    const product = productMap[slug];

                    return product ? (
                      <Link
                        key={slug}
                        href={`/products/${slug}`}
                        className="premium-link-btn inline-flex items-center gap-2 text-[12px] px-4 py-2 rounded-full"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        {product.shortName}
                        <ArrowRight size={13} />
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>

              <Link
                href={copy.discussCtaPath}
                className="premium-primary-btn inline-flex items-center gap-2 text-[14px] px-5 py-2.5 rounded-full self-start"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {copy.discussCtaLabel}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
