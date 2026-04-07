import { Link } from 'react-router';
import { Droplets, Gem, Wind, Fuel, FlaskConical, Cog, ArrowRight } from 'lucide-react';

const applications = [
  { icon: Droplets, name: 'Water Treatment', desc: 'Municipal, point-of-use, and industrial water purification', slug: 'water-treatment' },
  { icon: Gem, name: 'Gold Recovery', desc: 'Carbon-in-pulp and carbon-in-leach extraction processes', slug: 'gold-recovery' },
  { icon: Wind, name: 'Air & Gas', desc: 'VOC removal, odor control, and gas-phase purification', slug: 'air-gas' },
  { icon: Fuel, name: 'Oil & Gas', desc: 'Amine sweetening, glycol purification, produced water', slug: 'oil-gas' },
  { icon: FlaskConical, name: 'Catalytic / Chloramine', desc: 'Chloramine decomposition and catalytic H₂S removal', slug: 'catalytic' },
  { icon: Cog, name: 'Other Industrial', desc: 'Food & beverage, pharmaceuticals, chemical processing', slug: 'other' },
];

export function ApplicationsGrid() {
  return (
    <section className="py-16 md:py-20">
      <div className="premium-shell">
        <div className="mb-12 md:mb-16">
          <span
            className="premium-kicker text-[11px] tracking-[0.24em] uppercase mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Applications
          </span>
          <h2
            className="premium-heading text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.08] tracking-[-0.02em]"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Industries we serve
          </h2>
        </div>

        <div className="premium-auto-grid">
          {applications.map((a) => (
            <Link
              key={a.slug}
              to={`/applications#${a.slug}`}
              className="premium-panel-soft p-6 transition-colors group hover:border-[#d4ae5b]/20"
            >
              <div className="premium-icon-wrap w-10 h-10 rounded-full flex items-center justify-center mb-4">
                <a.icon size={18} className="text-[#e6cb87]" />
              </div>
              <h3
                className="text-[#f7efdb] text-[15px] mb-1.5"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                {a.name}
              </h3>
              <p
                className="premium-copy text-[13px] leading-[1.7] mb-4"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                {a.desc}
              </p>
              <span className="premium-link inline-flex items-center gap-1 text-[12px] group-hover:gap-2 transition-all"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                Learn more <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
