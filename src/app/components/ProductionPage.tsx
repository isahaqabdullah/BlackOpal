import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { companyDetails } from '../content/siteContent';
import { siteConfig } from '../config/siteConfig';
import { PageIntro } from './PageIntro';
import productionFacilityImage from '../../public/images/production-facility.avif';

const productionAtGlance = [
  {
    value: '50 million lbs',
    label: 'Annual capacity',
  },
  {
    value: 'Steam activated',
    label: 'Two-stage method',
  },
  {
    value: 'Custom mesh',
    label: 'Application-specific sizing',
  },
];

const steamActivationSteps = [
  {
    step: '01',
    title: 'Carbonization',
    body:
      'Coconut shell lumps are heated without oxygen, usually below 700 C, converting the shell into charcoal with volatile content reduced to less than 20%.',
  },
  {
    step: '02',
    title: 'Steam activation',
    body:
      'The carbonized material is activated in steam at around 1,100 C / 2,012 F, opening and enlarging the internal pore network that gives the carbon its adsorption character.',
  },
  {
    step: '03',
    title: 'Sizing and finishing',
    body:
      'Rotary kiln output is crushed, screened, and cleaned for granular specifications. Powder grades are produced by further grinding the granules with a gentle pulverizing action.',
  },
];

export function ProductionPage() {
  return (
    <div>
      <PageIntro
        label="Production"
        title="50 million lbs capacity, steam activation, and mesh-size control"
        description={`${siteConfig.originStatement}. Raw material selection, activation, sizing, and final quality assurance are controlled before shipment.`}
        breadcrumbs={[{ label: 'Production' }]}
      />

      <section className="pb-10 md:pb-12">
        <div className="premium-shell">
          <div className="premium-panel premium-split-grid p-7 md:p-9">
            <div>
              <span
                className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-4"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                Production at a glance
              </span>

              <div className="grid gap-5 sm:grid-cols-3 border-y border-[#c9a24d]/12 py-5 mb-6">
                {productionAtGlance.map((item) => (
                  <div key={item.label} className="sm:border-l sm:first:border-l-0 sm:border-[#c9a24d]/12 sm:pl-5">
                    <span
                      className="text-[#e6cb87] text-[clamp(1.25rem,2vw,1.75rem)] leading-tight block mb-1"
                      style={{ fontFamily: "'DM Serif Display', serif" }}
                    >
                      {item.value}
                    </span>
                    <span
                      className="text-[#8f835f] text-[10px] tracking-[0.14em] uppercase"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <h2
                className="premium-heading premium-heading-elevated text-[clamp(1.55rem,2.4vw,2.1rem)] leading-[1.08] mb-4"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                One production system from coconut shell charcoal to finished carbon
              </h2>
              <p
                className="premium-copy text-[14px] leading-[1.85] max-w-3xl"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                Black Opal's India coconut activated carbon facility is the largest in the region, with annual
                production capacity of 50 million pounds. The same production flow controls raw material selection,
                steam activation, particle sizing, packing, and final assurance before shipment.
              </p>
            </div>

            <div className="premium-image-frame premium-image-animated w-full max-w-[42rem] xl:justify-self-end">
              <img
                src={productionFacilityImage}
                alt="Black Opal production facility"
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
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Quality program
                </span>
                <h2
                  className="premium-heading premium-heading-elevated text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.08] mb-4"
                  style={{ fontFamily: "'DM Serif Display', serif" }}
                >
                  No-compromise control before activation, during processing, and before shipment
                </h2>
                <div
                  className="space-y-4 premium-copy text-[14px] leading-[1.85]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  <p>
                    Charcoal is sourced from selected outlets only after rigorous quality inspection. State-of-the-art
                    equipment and skilled technicians support control over activation, handling, screening, and packing.
                  </p>
                  <p>
                    INDOCARB brand coconut carbon products, now carried under Black Opal Carbons, have been extensively
                    tested and acclaimed by major industry leaders and reputed laboratories around the world.
                  </p>
                </div>
              </div>

              <div>
                <span
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  Steam activation method
                </span>
                <div className="border-y border-[#c9a24d]/12">
                  {steamActivationSteps.map((step) => (
                    <div
                      key={step.title}
                      className="grid gap-4 border-b border-[#c9a24d]/10 py-5 last:border-b-0 sm:grid-cols-[3rem_1fr]"
                    >
                      <span
                        className="text-[#e6cb87] text-[1.5rem] leading-none"
                        style={{ fontFamily: "'DM Serif Display', serif" }}
                      >
                        {step.step}
                      </span>
                      <div>
                        <h3
                          className="premium-card-heading text-[16px] mb-2"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                        >
                          {step.title}
                        </h3>
                        <p
                          className="premium-copy text-[13px] leading-[1.75]"
                          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                        >
                          {step.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p
                  className="premium-copy text-[13px] leading-[1.75] mt-5"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  Activation time, temperature, and post-production sizing allow the pore structure and particle size to
                  be matched to water purification, gas treatment, color removal, granular media, and powdered carbon
                  requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-14">
        <div className="premium-shell">
          <div className="flex flex-col gap-4 border-t border-[#c9a24d]/12 pt-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
            <p
              className="premium-copy text-[14px] leading-[1.75] max-w-2xl"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              For manufacturing questions, technical support, or current product availability, contact Black Opal at{' '}
              {companyDetails.phoneDisplay}.
            </p>
            <Link
              to="/contact"
              className="premium-primary-btn inline-flex items-center justify-center gap-2 text-[13px] px-7 py-3 rounded-full self-center md:self-auto"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Contact production team
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
