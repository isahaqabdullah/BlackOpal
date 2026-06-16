'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import { useHomePageDataAttribute } from '../cms/visualEditingAttributes';
import { useSiteContent } from '../content/SiteContentProvider';

const AUTO_ADVANCE_MS = 5200;

export function FeaturedProduct() {
  const { applicationMap, homePage, productMap } = useSiteContent();
  const homePageDataAttribute = useHomePageDataAttribute(homePage._id);
  const capabilitySlides = homePage.featuredCapabilities.map((slide) => {
    const linkedImage =
      slide.imageSource === 'product'
        ? productMap[slide.imageSlug ?? '']?.image
        : slide.imageSource === 'application'
          ? applicationMap[slide.imageSlug ?? '']?.image
          : undefined;

    return {
      ...slide,
      image: slide.imageUrl || linkedImage || productMap.granular?.image || '',
      alt: slide.imageAlt,
    };
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = capabilitySlides[activeIndex];
  const activeSlidePath = activeSlide?._key
    ? `featuredCapabilities[_key=="${activeSlide._key}"]`
    : `featuredCapabilities[${activeIndex}]`;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % capabilitySlides.length);
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  const showPrevious = () => {
    setActiveIndex((current) => (current === 0 ? capabilitySlides.length - 1 : current - 1));
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % capabilitySlides.length);
  };

  return (
    <section className="py-10 md:py-12">
      <div className="premium-shell">
        <div className="premium-panel premium-split-grid p-8 md:p-10 lg:p-12">
          <div key={activeSlide.title}>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-[#e6cb87]" />
                <span
                  data-sanity={homePageDataAttribute('featuredCapabilitiesLabel')}
                  className="text-[11px] tracking-[0.24em] uppercase text-[#e6cb87]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {homePage.featuredCapabilitiesLabel}
                </span>
              </div>
              <span
                className="text-[11px] text-[#8f835f]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {String(activeIndex + 1).padStart(2, '0')} / {String(capabilitySlides.length).padStart(2, '0')}
              </span>
            </div>
            <h2
              data-sanity={homePageDataAttribute(`${activeSlidePath}.title`)}
              className="premium-heading premium-heading-elevated text-[clamp(2rem,3.9vw,3.45rem)] leading-[1.02] mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {activeSlide.title}
            </h2>
            <p
              data-sanity={homePageDataAttribute(`${activeSlidePath}.copy`)}
              className="premium-copy text-[14px] leading-[1.65] mb-6 max-w-lg"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              {activeSlide.copy}
            </p>
            <ul className="space-y-2.5 mb-8">
              {activeSlide.highlights.map((item, highlightIndex) => (
                <li
                  key={item}
                  data-sanity={homePageDataAttribute(`${activeSlidePath}.highlights[${highlightIndex}]`)}
                  className="flex items-start gap-2.5 text-[15px] text-[#d7c7a2]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                >
                  <span className="w-1.5 h-1.5 bg-[#d4ae5b] rounded-full mt-1.5 shrink-0 shadow-[0_0_12px_rgba(212,174,91,0.65)]" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={activeSlide.to}
                className="premium-primary-btn inline-flex items-center gap-2 text-[14px] px-6 py-3 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {activeSlide.cta} <ArrowRight size={14} />
              </Link>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label={homePage.featuredCapabilitiesPreviousLabel}
                  className="premium-secondary-btn inline-flex h-11 w-11 items-center justify-center rounded-full"
                >
                  <ArrowLeft size={15} />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label={homePage.featuredCapabilitiesNextLabel}
                  className="premium-secondary-btn inline-flex h-11 w-11 items-center justify-center rounded-full"
                >
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
              {capabilitySlides.map((slide, index) => (
                <button
                  key={slide.title}
                  data-sanity={homePageDataAttribute(
                    `${slide._key ? `featuredCapabilities[_key=="${slide._key}"]` : `featuredCapabilities[${index}]`}.label`,
                  )}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`${homePage.featuredCapabilitiesShowLabelPrefix} ${slide.label}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  className={`rounded-full border px-3 py-2 text-left text-[10px] uppercase tracking-[0.14em] transition-all ${
                    index === activeIndex
                      ? 'border-[#e6cb87]/70 bg-[#d4ae5b]/14 text-[#f7efdb]'
                      : 'border-[#c9a24d]/18 text-[#9f9475] hover:border-[#c9a24d]/45 hover:text-[#e6cb87]'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  {slide.label}
                </button>
              ))}
            </div>
          </div>

          <div
            key={activeSlide.image}
            className="premium-image-frame premium-image-animated w-full max-w-[42rem] xl:justify-self-end"
          >
            <img
              data-sanity={homePageDataAttribute(`${activeSlidePath}.${activeSlide.imageUrl ? 'imageUrl' : 'imageSlug'}`)}
              src={activeSlide.image}
              alt={activeSlide.alt}
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
