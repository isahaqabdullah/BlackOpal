'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePageCopyDataAttribute, useSanityDataAttribute } from '../cms/visualEditingAttributes';
import { useSiteContent } from '../content/SiteContentProvider';
import { PageIntro } from './PageIntro';

export function ProductsPage() {
  const { pageCopy, products } = useSiteContent();
  const copy = pageCopy.productsPage;
  const pageCopyDataAttribute = usePageCopyDataAttribute();
  const sanityDataAttribute = useSanityDataAttribute();

  return (
    <div>
      <PageIntro
        label={copy.intro.label}
        title={copy.intro.title}
        description={copy.intro.description}
        breadcrumbs={[{ label: copy.intro.breadcrumbLabel, dataSanity: pageCopyDataAttribute('productsPage.intro.breadcrumbLabel') }]}
        dataSanity={{
          label: pageCopyDataAttribute('productsPage.intro.label'),
          title: pageCopyDataAttribute('productsPage.intro.title'),
          description: pageCopyDataAttribute('productsPage.intro.description'),
        }}
      />

      <section className="pb-10 md:pb-12">
        <div className="premium-shell space-y-6">
          {products.map((product, index) => (
            <div
              key={product.slug}
              data-sanity-edit-target
              className="premium-panel-soft premium-card-animated premium-reveal p-6 md:p-7"
              style={{ animationDelay: `${120 + index * 90}ms` }}
            >
              <div className="premium-split-grid items-start">
                <div>
                  <span
                    data-sanity={sanityDataAttribute('product', product._id, 'shortName')}
                    className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    {product.shortName}
                  </span>
                  <h2
                    data-sanity={sanityDataAttribute('product', product._id, 'name')}
                    className="premium-heading premium-heading-elevated text-[clamp(1.55rem,2.4vw,2rem)] leading-[1.08] mb-3"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {product.name}
                  </h2>
                  <p
                    data-sanity={sanityDataAttribute('product', product._id, 'summary')}
                    className="premium-copy text-[14px] leading-[1.65] mb-5 max-w-2xl"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                  >
                    {product.summary}
                  </p>
                  <p
                    data-sanity={sanityDataAttribute('product', product._id, 'intro')}
                    className="premium-copy text-[14px] leading-[1.65] mb-6 max-w-2xl"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                  >
                    {product.intro}
                  </p>

                  <div className="premium-form-grid gap-8">
                    <div>
                      <span
                        data-sanity={pageCopyDataAttribute('productsPage.highlightsLabel')}
                        className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        {copy.highlightsLabel}
                      </span>
                      <div className="space-y-2">
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
                    </div>

                    <div>
                      <span
                        data-sanity={pageCopyDataAttribute('productsPage.commonUsesLabel')}
                        className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        {copy.commonUsesLabel}
                      </span>
                      <div className="flex flex-wrap gap-2 mb-4">
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

                      {product.grades?.length ? (
                        <>
                          <span
                            data-sanity={pageCopyDataAttribute('productsPage.referencedGradesLabel')}
                            className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                          >
                            {copy.referencedGradesLabel}
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {product.grades.map((grade, gradeIndex) => (
                              <span
                                key={grade}
                                data-sanity={sanityDataAttribute('product', product._id, `grades[${gradeIndex}]`)}
                                className="premium-secondary-btn text-[12px] px-3 py-1.5 rounded-full"
                                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                              >
                                {grade}
                              </span>
                            ))}
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-7 pt-6 border-t border-[#c9a24d]/10 flex flex-wrap gap-3">
                    <Link
                      href={`/products/${product.slug}`}
                      className="premium-primary-btn inline-flex items-center gap-2 text-[14px] px-5 py-2.5 rounded-full"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      {copy.detailCtaLabel}
                      <ArrowRight size={14} />
                    </Link>
                    <Link
                      href={copy.quoteCtaPath}
                      className="premium-secondary-btn inline-flex items-center gap-2 text-[14px] px-5 py-2.5 rounded-full"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      {copy.quoteCtaLabel}
                    </Link>
                  </div>
                </div>

                <div className="premium-image-frame w-full max-w-[38rem] xl:justify-self-end">
                  <img
                    data-sanity={sanityDataAttribute('product', product._id, 'imageUrl')}
                    src={product.image}
                    alt={product.name}
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
