'use client';

import { ArrowRight, FileText, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { PackagingMediaEntry } from '../content/siteContent';
import { useSiteContent } from '../content/SiteContentProvider';
import { useProductionPageDataAttribute } from '../cms/visualEditingAttributes';
import { PageIntro } from './PageIntro';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from './ui/carousel';

const balancedOverviewTitle =
  'From Coconut Shell Charcoal to High-Performance Activated Carbon - Fully Integrated Production';

const productionCertifications = ['ISO 9001', 'ISO 14001', 'ISO 45001'];

const portraitPackagingImageUrls = new Set([
  '/images/packaging/export-palletized-bags.jpeg',
  '/images/packaging/warehouse-palletized-bags.jpeg',
]);

type ProductionPackagingGalleryProps = {
  kicker: string;
  title: string;
  body: string;
  media: PackagingMediaEntry[];
  documentLabel: string;
  documentUrl: string;
  dataAttribute: (path: string) => string | undefined;
};

function ProductionPackagingGallery({
  kicker,
  title,
  body,
  media,
  documentLabel,
  documentUrl,
  dataAttribute,
}: ProductionPackagingGalleryProps) {
  const [galleryApi, setGalleryApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!galleryApi) {
      return;
    }

    const updateSelection = () => {
      setSelectedIndex(galleryApi.selectedScrollSnap());
    };

    updateSelection();
    galleryApi.on('select', updateSelection);
    galleryApi.on('reInit', updateSelection);

    return () => {
      galleryApi.off('select', updateSelection);
      galleryApi.off('reInit', updateSelection);
    };
  }, [galleryApi]);

  const hasDocument = Boolean(documentLabel.trim() && documentUrl.trim());
  const imageMedia = media.filter((item) => item.mediaType === 'image' && item.imageUrl);

  return (
    <section className="py-10 md:py-12">
      <div className="premium-shell">
        <div className="mb-7 max-w-3xl">
          <span
            data-sanity={dataAttribute('packagingKicker')}
            className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            {kicker}
          </span>
          <h2
            data-sanity={dataAttribute('packagingTitle')}
            className="premium-heading premium-heading-elevated text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.08] mb-4"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            {title}
          </h2>
          <p
            data-sanity={dataAttribute('packagingBody')}
            className="premium-copy text-[14px] leading-[1.65]"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          >
            {body}
          </p>
        </div>

        <div className="premium-panel p-5 md:p-7">
          {media.length ? (
            <>
              <Carousel
                setApi={(api) => setGalleryApi(api)}
                opts={{ align: 'start', loop: media.length > 1 }}
                className="mx-auto w-full max-w-[62rem]"
              >
                <CarouselContent className="ml-0">
                  {media.map((item, index) => {
                    const itemPath = item._key ? `packagingMedia[_key=="${item._key}"]` : `packagingMedia[${index}]`;
                    const isVideo = item.mediaType === 'video';
                    const collageImages = !isVideo && item.imageUrl && portraitPackagingImageUrls.has(item.imageUrl)
                      ? [
                          item,
                          ...imageMedia.filter((imageItem) => imageItem.imageUrl !== item.imageUrl),
                        ].slice(0, 3)
                      : [];

                    return (
                      <CarouselItem key={item._key ?? `${item.mediaType}-${item.title}`} className="pl-0">
                        <div data-sanity-edit-target className="space-y-5">
                          <div className="flex items-center justify-between gap-3">
                            <span
                              className="inline-flex items-center rounded-full border border-[#c9a24d]/16 bg-[#070707]/65 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-[#c6b487]"
                              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                            >
                              {isVideo ? 'Dispatch video' : 'Packaging photo'}
                            </span>
                            <span
                              className="text-[#8f835f] text-[11px] tracking-[0.14em] uppercase"
                              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                            >
                              {index + 1} / {media.length}
                            </span>
                          </div>

                          <div className="overflow-hidden rounded-[8px] border border-[#c9a24d]/12 bg-[#050505]/55">
                            {isVideo ? (
                              <video
                                data-sanity={dataAttribute(`${itemPath}.videoUrl`)}
                                src={item.videoUrl}
                                controls
                                playsInline
                                preload="metadata"
                                aria-label={item.mediaAlt}
                                className="h-[24rem] w-full bg-black object-contain sm:h-[30rem] lg:h-[36rem]"
                              />
                            ) : collageImages.length > 1 ? (
                              <div className="grid h-[24rem] gap-2 bg-[#050505] p-2 sm:h-[30rem] lg:h-[36rem] md:grid-cols-[1.25fr_0.9fr]">
                                <img
                                  data-sanity={dataAttribute(`${itemPath}.imageUrl`)}
                                  src={collageImages[0].imageUrl}
                                  alt={collageImages[0].mediaAlt}
                                  className="h-full w-full rounded-[6px] object-cover"
                                />
                                <div className="grid min-h-0 gap-2">
                                  {collageImages.slice(1).map((collageItem) => (
                                    <img
                                      key={collageItem._key ?? collageItem.imageUrl}
                                      src={collageItem.imageUrl}
                                      alt={collageItem.mediaAlt}
                                      className="min-h-0 h-full w-full rounded-[6px] object-cover"
                                    />
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <img
                                data-sanity={dataAttribute(`${itemPath}.imageUrl`)}
                                src={item.imageUrl}
                                alt={item.mediaAlt}
                                className="h-[24rem] w-full bg-[#050505] object-cover sm:h-[30rem] lg:h-[36rem]"
                              />
                            )}
                          </div>

                          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                            <div>
                              <h3
                                data-sanity={dataAttribute(`${itemPath}.title`)}
                                className="premium-card-heading text-[18px] mb-2"
                                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                              >
                                {item.title}
                              </h3>
                              <p
                                data-sanity={dataAttribute(`${itemPath}.caption`)}
                                className="premium-copy text-[14px] leading-[1.65]"
                                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                              >
                                {item.caption}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>

                {media.length > 1 ? (
                  <>
                    <CarouselPrevious
                      variant="ghost"
                      className="left-3 top-4 translate-y-0 border border-[#c9a24d]/18 bg-[#050505]/75 text-[#f7efdb] hover:bg-[#15120b] hover:text-[#f2d78b]"
                    />
                    <CarouselNext
                      variant="ghost"
                      className="right-3 top-4 translate-y-0 border border-[#c9a24d]/18 bg-[#050505]/75 text-[#f7efdb] hover:bg-[#15120b] hover:text-[#f2d78b]"
                    />
                  </>
                ) : null}
              </Carousel>

              {media.length > 1 ? (
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                  {media.map((item, index) => (
                    <button
                      key={item._key ?? `${item.mediaType}-${item.title}-dot`}
                      type="button"
                      onClick={() => galleryApi?.scrollTo(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        selectedIndex === index ? 'w-8 bg-[#d4ae5b]' : 'w-2.5 bg-[#4c4331] hover:bg-[#8f835f]'
                      }`}
                      aria-label={`Show ${item.title}`}
                    />
                  ))}
                </div>
              ) : null}
            </>
          ) : null}

          {hasDocument ? (
            <div className="mt-6 flex flex-col gap-4 border-t border-[#c9a24d]/12 pt-5 md:flex-row md:items-center md:justify-between">
              <div>
                <span
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-2"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Supporting document
                </span>
                <p
                  className="premium-copy text-[14px] leading-[1.65]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  Current packaging formats and handling options.
                </p>
              </div>

              <a
                data-sanity={dataAttribute('packagingDocumentLabel')}
                href={documentUrl}
                target="_blank"
                rel="noreferrer"
                className="premium-secondary-btn inline-flex items-center gap-2 text-[14px] px-5 py-2.5 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                <FileText size={14} />
                {documentLabel}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

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

              <div className="mb-6">
                <span
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Production certifications
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {productionCertifications.map((certification) => (
                    <span
                      key={certification}
                      className="inline-flex items-center gap-2 rounded-full border border-[#c9a24d]/18 bg-[#080806]/70 px-3.5 py-2 text-[12px] text-[#f2d78b] shadow-[0_10px_26px_rgba(0,0,0,0.18)]"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                    >
                      <ShieldCheck size={14} className="text-[#e6cb87]" aria-hidden="true" />
                      {certification}
                    </span>
                  ))}
                </div>
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
                className="premium-copy text-[14px] leading-[1.65] max-w-3xl"
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
                  className="space-y-4 premium-copy text-[14px] leading-[1.65]"
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
                            className="premium-copy text-[14px] leading-[1.65]"
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
                  className="premium-copy text-[14px] leading-[1.65] mt-5"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {productionPage.activationNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {productionPage.packagingMedia.length > 0 || Boolean(productionPage.packagingDocumentUrl) ? (
        <ProductionPackagingGallery
          kicker={productionPage.packagingKicker}
          title={productionPage.packagingTitle}
          body={productionPage.packagingBody}
          media={productionPage.packagingMedia}
          documentLabel={productionPage.packagingDocumentLabel}
          documentUrl={productionPage.packagingDocumentUrl}
          dataAttribute={productionPageDataAttribute}
        />
      ) : null}

      <section className="pb-12 md:pb-14">
        <div className="premium-shell">
          <div className="flex flex-col items-center gap-5 border-t border-[#c9a24d]/12 pt-8 text-center">
            <p
              className="premium-copy text-[14px] leading-[1.65] max-w-2xl"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              <span data-sanity={productionPageDataAttribute('contactTextBeforeEmail')}>
                {productionPage.contactTextBeforeEmail.trimEnd()}
              </span>
              {' '}
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
              className="premium-primary-btn inline-flex items-center justify-center gap-2 text-[14px] px-7 py-3 rounded-full"
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
