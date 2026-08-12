'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentProvider';
import { useHomePageDataAttribute, useSanityDataAttribute } from '../cms/visualEditingAttributes';
import { applicationsForProduct } from '../content/productApplicationRelationships';

export function ProductCards() {
  const { applications, homePage, products } = useSiteContent();
  const homePageDocumentId = homePage._id;
  const homePageDataAttribute = useHomePageDataAttribute(homePageDocumentId);
  const sanityDataAttribute = useSanityDataAttribute();

  return (
    <section className="pt-4 pb-10 md:pt-5 md:pb-12">
      <div className="premium-shell">
        <div className="mb-8 md:mb-10" data-sanity-edit-target>
          <span
            data-sanity={homePageDataAttribute('productSectionKicker')}
            className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            {homePage.productSectionKicker}
          </span>
          <h2
            data-sanity={homePageDataAttribute('productSectionTitle')}
            className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2rem,3.5vw,3.15rem)] leading-[1.04] tracking-[-0.02em] max-w-2xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {homePage.productSectionTitle}
          </h2>
        </div>

        <div className="premium-auto-grid">
          {products.map((p, index) => {
            const relatedApplications = applicationsForProduct(p.slug, applications).slice(0, 3);

            return (
              <div
                key={p.slug}
                data-sanity-edit-target
                className="premium-panel-soft premium-card-animated premium-reveal p-6 md:p-7 transition-colors group hover:border-[#d4ae5b]/20"
                style={{ animationDelay: `${120 + index * 90}ms` }}
              >
                <h3
                  data-sanity={sanityDataAttribute('product', p._id, 'name')}
                  className="premium-card-heading text-[18px] md:text-[19px] mb-3 max-w-[16ch]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  {p.name}
                </h3>
                <p
                  data-sanity={sanityDataAttribute('product', p._id, 'summary')}
                  className="premium-copy text-[14px] leading-[1.65] mb-5"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {p.summary}
                </p>
                <ul className="space-y-1.5 mb-6">
                  {relatedApplications.map((application) => (
                    <li key={application.slug}>
                      <Link
                        href={`/applications/${application.slug}`}
                        className="text-[15px] text-[#d7c7a2] flex items-center gap-2 transition-colors hover:text-[#f2d78b]"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                      >
                        <span className="w-1.5 h-1.5 bg-[#d4ae5b] rounded-full shrink-0 shadow-[0_0_12px_rgba(212,174,91,0.65)]" />
                        {application.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/products/${p.slug}`}
                  className="premium-link-btn inline-flex items-center gap-2 text-[14px] px-4 py-2 rounded-[8px] transition-all"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {homePage.productCardCtaLabel} <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
