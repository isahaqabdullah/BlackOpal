'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { usePageCopyDataAttribute, useSanityDataAttribute } from '../cms/visualEditingAttributes';
import { useSiteContent } from '../content/SiteContentProvider';
import { NotFoundPage } from './NotFoundPage';
import { PageIntro } from './PageIntro';

export function ProductDetailPage() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const { pageCopy, productMap, status } = useSiteContent();
  const product = productSlug ? productMap[productSlug] : undefined;
  const copy = pageCopy.productDetailPage;
  const pageCopyDataAttribute = usePageCopyDataAttribute();
  const sanityDataAttribute = useSanityDataAttribute();

  if (!product && status === 'loading') {
    return null;
  }

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <PageIntro
        label={copy.introLabel}
        title={product.name}
        description={product.summary}
        breadcrumbs={[
          {
            label: copy.productsBreadcrumbLabel,
            to: copy.productsPath,
            dataSanity: pageCopyDataAttribute('productDetailPage.productsBreadcrumbLabel'),
          },
          { label: product.shortName, dataSanity: sanityDataAttribute('product', product._id, 'shortName') },
        ]}
        dataSanity={{
          label: pageCopyDataAttribute('productDetailPage.introLabel'),
          title: sanityDataAttribute('product', product._id, 'name'),
          description: sanityDataAttribute('product', product._id, 'summary'),
        }}
      />

      <section className="pb-6 md:pb-8">
        <div className="premium-shell">
          <div className="premium-split-grid items-start">
            <div className="premium-image-frame premium-image-animated premium-reveal premium-reveal-delay-1 w-full max-w-[42rem]">
              <img
                data-sanity={sanityDataAttribute('product', product._id, 'imageUrl')}
                src={product.image}
                alt={product.name}
                className="w-full aspect-[16/9] max-h-[28rem] object-cover"
              />
            </div>

            <div data-sanity-edit-target className="premium-panel-soft premium-reveal premium-reveal-delay-2 p-6 md:p-7">
              <span
                data-sanity={pageCopyDataAttribute('productDetailPage.overviewLabel')}
                className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {copy.overviewLabel}
              </span>
              <p
                data-sanity={sanityDataAttribute('product', product._id, 'intro')}
                className="premium-copy text-[14px] leading-[1.65] mb-6"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                {product.intro}
              </p>

              <div className="space-y-3 mb-6">
                {product.highlights.map((highlight, highlightIndex) => (
                  <div
                    key={highlight}
                    data-sanity={sanityDataAttribute('product', product._id, `highlights[${highlightIndex}]`)}
                    className="flex items-start gap-3 text-[15px] text-[#d7c7a2]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                  >
                    <span className="w-1.5 h-1.5 bg-[#d4ae5b] rounded-full mt-2 shrink-0 shadow-[0_0_12px_rgba(212,174,91,0.65)]" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[#c9a24d]/10">
                <span
                  data-sanity={pageCopyDataAttribute('productDetailPage.commonUsesLabel')}
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {copy.commonUsesLabel}
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.commonUses.map((use, useIndex) => (
                    <span
                      key={use}
                      data-sanity={sanityDataAttribute('product', product._id, `commonUses[${useIndex}]`)}
                      className="premium-link-btn text-[12px] px-3 py-1.5 rounded-full"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-4 pb-10 md:pt-5 md:pb-12">
        <div className="premium-shell space-y-6">
          {product.sections.map((section, index) => {
            const sectionPath = section._key ? `sections[_key=="${section._key}"]` : `sections[${index}]`;

            return (
              <div
                key={section.title}
                data-sanity-edit-target
                className="premium-panel-soft premium-card-animated premium-reveal p-6 md:p-7"
                style={{ animationDelay: `${120 + index * 90}ms` }}
              >
                <h2
                  data-sanity={sanityDataAttribute('product', product._id, `${sectionPath}.title`)}
                  className="premium-heading premium-heading-elevated text-[clamp(1.45rem,2.2vw,1.9rem)] leading-[1.08] mb-3"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {section.title}
                </h2>
                <p
                  data-sanity={sanityDataAttribute('product', product._id, `${sectionPath}.body`)}
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
                        data-sanity={sanityDataAttribute('product', product._id, `${sectionPath}.bullets[${bulletIndex}]`)}
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
          <div className="premium-panel flex flex-col md:flex-row md:items-center md:justify-between gap-5 px-6 py-7 md:px-8">
            <div>
              <h2
                data-sanity={pageCopyDataAttribute('productDetailPage.ctaTitle')}
                className="premium-heading text-[1.5rem] mb-2"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {copy.ctaTitle}
              </h2>
              <p
                data-sanity={pageCopyDataAttribute('productDetailPage.ctaDescription')}
                className="premium-copy text-[14px]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                {copy.ctaDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={copy.allProductsCtaPath}
                className="premium-secondary-btn inline-flex items-center gap-2 text-[14px] px-5 py-2.5 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {copy.allProductsCtaLabel}
              </Link>
              <Link
                href={copy.quoteCtaPath}
                className="premium-primary-btn inline-flex items-center gap-2 text-[14px] px-5 py-2.5 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {copy.quoteCtaLabel}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
