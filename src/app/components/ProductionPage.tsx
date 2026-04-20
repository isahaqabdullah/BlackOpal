import { Link } from 'react-router';
import { companyDetails, siteMetrics } from '../content/siteContent';
import { PageIntro } from './PageIntro';

const productionSections = [
  {
    title: 'Largest regional coconut activated carbon facility',
    body:
      'The legacy production page describes Black Opal\'s coconut activated carbon facility in India as the largest in the region, with annual production capacity of 50 million pounds of carbon.',
  },
  {
    title: 'Quality control from raw material to shipment',
    body:
      'Black Opal states that a meticulous quality-control program runs through every stage of production, from raw-material selection through final quality assurance before shipment.',
  },
  {
    title: 'Application-specific particle-size control',
    body:
      'Specially designed crushing and screening equipment is highlighted for precise control over particle size so the finished carbon can be matched to end-use mesh-size requirements.',
  },
];

export function ProductionPage() {
  return (
    <div>
      <PageIntro
        label="Production"
        title="Manufacturing scale, process control, and coconut shell carbon quality"
        description="The original Black Opal site gave manufacturing its own page. This rebuild preserves that story as a dedicated route instead of burying it inside the homepage."
        breadcrumbs={[{ label: 'Production' }]}
      />

      <section className="pb-12 md:pb-16">
        <div className="premium-shell">
          <div className="premium-panel premium-split-grid p-7 md:p-9">
            <div>
              <h2
                className="premium-heading premium-heading-elevated text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.06] mb-5"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Built around no-compromise manufacturing
              </h2>
              <div
                className="space-y-4 premium-copy text-[14px] leading-[1.85]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                <p>
                  Black Opal describes company-owned and operated manufacturing facilities as the reason it can
                  maintain tighter quality standards, stronger reliability, and better consistency than a trading-only model.
                </p>
                <p>
                  The production narrative starts at raw-material selection. Charcoal is sourced from selected outlets
                  after rigorous inspections, then processed with modern equipment and overseen by skilled technicians.
                </p>
                <p>
                  The site also states that Black Opal products have been extensively tested and recognized by major
                  industry leaders and laboratories around the world.
                </p>
              </div>
            </div>

            <div className="premium-image-frame premium-image-animated w-full max-w-[42rem] xl:justify-self-end">
              <img
                src="https://images.unsplash.com/photo-1554070211-e3953a3de374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFudWZhY3R1cmluZyUyMHdhcmVob3VzZSUyMGZhY3RvcnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzU0NzU0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Industrial production facility"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="premium-shell">
          <div className="premium-auto-grid">
            {productionSections.map((section, index) => (
              <div
                key={section.title}
                className="premium-panel-soft premium-card-animated premium-reveal p-6 md:p-7"
                style={{ animationDelay: `${120 + index * 90}ms` }}
              >
                <h3
                  className="premium-card-heading text-[18px] mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  {section.title}
                </h3>
                <p
                  className="premium-copy text-[13px] leading-[1.75]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="premium-shell">
          <div className="premium-panel-soft p-6 md:p-7">
            <span
              className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-4"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Scale snapshot
            </span>
            <div className="premium-compact-grid">
              {siteMetrics.map((metric) => (
                <div key={metric.label}>
                  <span
                    className="text-[#e6cb87] text-[clamp(1.3rem,2vw,1.85rem)] block mb-1"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {metric.value}
                  </span>
                  <span
                    className="text-[#8f835f] text-[11px] tracking-[0.12em] uppercase"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                  >
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="premium-shell">
          <div className="premium-panel text-center px-6 py-8">
            <p
              className="premium-copy text-[15px] mb-5"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              For manufacturing questions, technical support, or current product availability, contact the
              Pittsburgh headquarters at {companyDetails.phoneDisplay}.
            </p>
            <Link
              to="/contact"
              className="premium-primary-btn inline-block text-[13px] px-8 py-3 rounded-full"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Contact production team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
