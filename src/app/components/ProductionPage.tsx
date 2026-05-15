'use client';

import { ArrowRight } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentProvider';
import { useProductionPageDataAttribute } from '../cms/visualEditingAttributes';
import { PageIntro } from './PageIntro';

const balancedOverviewTitle =
  'From Coconut Shell Charcoal to High-Performance Activated Carbon - Fully Integrated Production';

export function ProductionPage() {
  const { productionPage, siteSettings } = useSiteContent();
  const productionPageDataAttribute = useProductionPageDataAttribute();
  const productionContactEmail = siteSettings.websiteContact.email ?? '';
  const overviewTitleLines =
    productionPage.overviewTitle === balancedOverviewTitle
      ? ['From Coconut Shell Charcoal to', 'High-Performance Activated Carbon -', 'Fully Integrated Production']
      : [productionPage.overviewTitle];

  return (
    <div>
      <PageIntro
        label={productionPage.intro.label}
        title={productionPage.intro.title}
        description={productionPage.intro.description}
        breadcrumbs={[
          {
            label: productionPage.intro.breadcrumbLabel,
            dataSanity: productionPageDataAttribute('intro.breadcrumbLabel'),
          },
        ]}
        dataSanity={{
          label: productionPageDataAttribute('intro.label'),
          title: productionPageDataAttribute('intro.title'),
          description: productionPageDataAttribute('intro.description'),
        }}
      />

      <section className="pb-10 md:pb-12">
        <div className="premium-shell">
          <div className="premium-panel premium-split-grid p-7 md:p-9">
            <div>
              <span
                data-sanity={productionPageDataAttribute('glanceLabel')}
                className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-4"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {productionPage.glanceLabel}
              </span>

              <div className="grid gap-5 sm:grid-cols-3 border-y border-[#c9a24d]/12 py-5 mb-6">
                {productionPage.glanceItems.map((item, index) => {
                  const itemPath = item._key ? `glanceItems[_key=="${item._key}"]` : `glanceItems[${index}]`;

                  return (
                  <div key={item.label} className="sm:border-l sm:first:border-l-0 sm:border-[#c9a24d]/12 sm:pl-5">
                    <span
                      data-sanity={productionPageDataAttribute(`${itemPath}.value`)}
                      className="text-[#e6cb87] text-[clamp(1.25rem,2vw,1.75rem)] leading-tight block mb-1"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {item.value}
                    </span>
                    <span
                      data-sanity={productionPageDataAttribute(`${itemPath}.label`)}
                      className="text-[#8f835f] text-[10px] tracking-[0.14em] uppercase"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      {item.label}
                    </span>
                  </div>
                  );
                })}
              </div>

              <h2
                data-sanity={productionPageDataAttribute('overviewTitle')}
                className="premium-heading premium-heading-elevated max-w-[36rem] text-[clamp(1.42rem,1.95vw,1.85rem)] leading-[1.14] mb-4"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                {overviewTitleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>
              <p
                data-sanity={productionPageDataAttribute('overviewBody')}
                className="premium-copy text-[14px] leading-[1.85] max-w-3xl"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                {productionPage.overviewBody}
              </p>
            </div>

            <div className="premium-image-frame premium-image-animated w-full max-w-[42rem] xl:justify-self-end">
              <img
                data-sanity={productionPageDataAttribute('imageUrl')}
                src={productionPage.image}
                alt={productionPage.imageAlt}
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="premium-shell">
          <div className="premium-panel p-7 md:p-9">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div>
                <span
                  data-sanity={productionPageDataAttribute('qualityKicker')}
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {productionPage.qualityKicker}
                </span>
                <h2
                  data-sanity={productionPageDataAttribute('qualityTitle')}
                  className="premium-heading premium-heading-elevated text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.08] mb-4"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  {productionPage.qualityTitle}
                </h2>
                <div
                  className="space-y-4 premium-copy text-[14px] leading-[1.85]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {productionPage.qualityParagraphs.map((paragraph, paragraphIndex) => (
                    <p
                      key={paragraph}
                      data-sanity={productionPageDataAttribute(`qualityParagraphs[${paragraphIndex}]`)}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <span
                  data-sanity={productionPageDataAttribute('activationKicker')}
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {productionPage.activationKicker}
                </span>
                <div className="border-y border-[#c9a24d]/12">
                  {productionPage.activationSteps.map((step, index) => {
                    const stepPath = step._key ? `activationSteps[_key=="${step._key}"]` : `activationSteps[${index}]`;

                    return (
                      <div
                        key={step.title}
                        data-sanity-edit-target
                        className="grid gap-4 border-b border-[#c9a24d]/10 py-5 last:border-b-0 sm:grid-cols-[3rem_1fr]"
                      >
                        <span
                          data-sanity={productionPageDataAttribute(`${stepPath}.step`)}
                          className="text-[#e6cb87] text-[1.5rem] leading-none"
                          style={{ fontFamily: "'DM Serif Display', serif" }}
                        >
                          {step.step}
                        </span>
                        <div>
                          <h3
                            data-sanity={productionPageDataAttribute(`${stepPath}.title`)}
                            className="premium-card-heading text-[16px] mb-2"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                          >
                            {step.title}
                          </h3>
                          <p
                            data-sanity={productionPageDataAttribute(`${stepPath}.body`)}
                            className="premium-copy text-[13px] leading-[1.75]"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                          >
                            {step.body}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p
                  data-sanity={productionPageDataAttribute('activationNote')}
                  className="premium-copy text-[13px] leading-[1.75] mt-5"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {productionPage.activationNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-14">
        <div className="premium-shell">
          <div className="flex flex-col items-center gap-5 border-t border-[#c9a24d]/12 pt-8 text-center">
            <p
              className="premium-copy text-[14px] leading-[1.75] max-w-2xl"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              <span data-sanity={productionPageDataAttribute('contactTextBeforeEmail')}>
                {productionPage.contactTextBeforeEmail}
              </span>
              <a
                href={`mailto:${productionContactEmail}`}
                className="text-[#f2d78b] hover:text-[#f7efdb]"
              >
                {productionContactEmail}
              </a>
              <span data-sanity={productionPageDataAttribute('contactTextAfterEmail')}>
                {productionPage.contactTextAfterEmail}
              </span>
            </p>
            <a
              href={`mailto:${productionContactEmail}`}
              className="premium-primary-btn inline-flex items-center justify-center gap-2 text-[13px] px-7 py-3 rounded-full"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              {productionPage.contactButtonLabel}
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
