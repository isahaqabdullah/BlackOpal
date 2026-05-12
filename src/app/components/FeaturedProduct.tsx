import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentProvider';
import type { ApplicationEntry, ProductEntry } from '../content/siteContent';

const AUTO_ADVANCE_MS = 5200;

function getCapabilitySlides(
  productMap: Record<string, ProductEntry>,
  applicationMap: Record<string, ApplicationEntry>,
) {
  return [
    {
      label: 'Catalytic carbon',
      title: 'CATCARB for chloramine and H2S reduction',
      copy:
        'Surface-modified coconut shell catalytic carbon for water-treatment systems that need faster chloramine and hydrogen sulfide decomposition.',
      highlights: [
        'Built for chloramine-heavy drinking-water programs',
        'Also suited for hydrogen sulfide decomposition',
        'Maintains the hardness and attrition resistance expected from premium coconut shell carbon',
      ],
      image: productMap.catalytic.image,
      alt: 'Water treatment facility',
      to: '/products/catalytic',
      cta: 'View CATCARB',
    },
    {
      label: 'Gold recovery',
      title: 'High-hardness carbon for gold circuits',
      copy:
        'Microporous GC grades for CIP, CIC, and tank-adsorbed systems where adsorption rate, loading capacity, low dust, and attrition resistance directly affect recovery.',
      highlights: [
        'Low platelet content and clean screening for reduced fines',
        'Strong gold adsorption rates for high-throughput circuits',
        'Durable coconut shell carbon for repeated mining service',
      ],
      image: applicationMap['gold-recovery'].image,
      alt: 'Gold recovery industrial operation',
      to: '/applications/gold-recovery',
      cta: 'Gold recovery grades',
    },
    {
      label: 'Water treatment',
      title: 'Low-ash carbon for water programs',
      copy:
        'Granular, powder, impregnated, and catalytic grades support drinking water, process water, wastewater polishing, taste and odor control, and contaminant-specific filtration.',
      highlights: [
        'Low ash, high strength, and consistent particle-size distribution',
        'NSF 42 and NSF 61 aligned water-treatment grades',
        'Options for chlorine, chloramine, VOC, pesticide, THM, and odor reduction',
      ],
      image: applicationMap['water-treatment'].image,
      alt: 'Clean drinking water treatment',
      to: '/applications/water-treatment',
      cta: 'Water applications',
    },
    {
      label: 'Custom grades',
      title: 'Tailored mesh, activity, washing, and impregnation',
      copy:
        'Product recommendations can be adapted to the operating conditions, mesh-size target, pH or washing requirement, adsorption level, and contaminant profile.',
      highlights: [
        'Different mesh sizes and adsorption levels available',
        'pH-adjusted, washed, impregnated, and specialty variants',
        'Grade selection matched to application requirements',
      ],
      image: productMap.granular.image,
      alt: 'Activated carbon granules',
      to: '/products',
      cta: 'Explore products',
    },
  ];
}

export function FeaturedProduct() {
  const { applicationMap, productMap } = useSiteContent();
  const capabilitySlides = getCapabilitySlides(productMap, applicationMap);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = capabilitySlides[activeIndex];

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
                  className="text-[11px] tracking-[0.24em] uppercase text-[#e6cb87]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Featured Capabilities
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
              className="premium-heading premium-heading-elevated text-[clamp(2rem,3.9vw,3.45rem)] leading-[1.02] mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {activeSlide.title}
            </h2>
            <p
              className="premium-copy text-[15px] leading-[1.85] mb-6 max-w-lg"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              {activeSlide.copy}
            </p>
            <ul className="space-y-2.5 mb-8">
              {activeSlide.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[13px] text-[#d7c7a2]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                >
                  <span className="w-1.5 h-1.5 bg-[#d4ae5b] rounded-full mt-1.5 shrink-0 shadow-[0_0_12px_rgba(212,174,91,0.65)]" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={activeSlide.to}
                className="premium-primary-btn inline-flex items-center gap-2 text-[13px] px-6 py-3 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {activeSlide.cta} <ArrowRight size={14} />
              </Link>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Previous featured capability"
                  className="premium-secondary-btn inline-flex h-11 w-11 items-center justify-center rounded-full"
                >
                  <ArrowLeft size={15} />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next featured capability"
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
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${slide.label}`}
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
