import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    id: 'granular',
    name: 'Granular Activated Carbon',
    summary: 'Engineered for high adsorption capacity in fixed-bed and flow-through applications.',
    uses: ['Municipal water treatment', 'Point-of-use filtration', 'Gold recovery'],
  },
  {
    id: 'powder',
    name: 'Powder Activated Carbon',
    summary: 'Fine-grind carbon for rapid contaminant removal in batch and inline dosing systems.',
    uses: ['Taste & odor control', 'Emergency spill response', 'Wastewater polishing'],
  },
  {
    id: 'impregnated',
    name: 'Impregnated Activated Carbon',
    summary: 'Chemically enhanced grades for targeted removal of specific gases and compounds.',
    uses: ['H₂S removal', 'Mercury capture', 'Acid gas scrubbing'],
  },
  {
    id: 'catalytic',
    name: 'Catalytic Activated Carbon',
    summary: 'Optimized surface chemistry for catalytic decomposition of chloramines and H₂S.',
    uses: ['Chloramine reduction', 'Hydrogen sulfide removal', 'Municipal disinfection byproducts'],
  },
];

export function ProductCards() {
  return (
    <section className="py-16 md:py-20">
      <div className="premium-shell">
        <div className="mb-12 md:mb-16">
          <span
            className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Product Categories
          </span>
          <h2
            className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2rem,3.5vw,3.15rem)] leading-[1.04] tracking-[-0.02em] max-w-2xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Application-matched grades for every process
          </h2>
        </div>

        <div className="premium-auto-grid">
          {products.map((p, index) => (
            <div
              key={p.id}
              className="premium-panel-soft premium-card-animated premium-reveal p-6 md:p-7 transition-colors group hover:border-[#d4ae5b]/20"
              style={{ animationDelay: `${120 + index * 90}ms` }}
            >
              <h3
                className="premium-card-heading text-[18px] md:text-[19px] mb-3 max-w-[16ch]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                {p.name}
              </h3>
              <p
                className="premium-copy text-[14px] leading-[1.75] mb-5"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                {p.summary}
              </p>
              <ul className="space-y-1.5 mb-6">
                {p.uses.map((u) => (
                  <li
                    key={u}
                    className="text-[13px] text-[#d7c7a2] flex items-center gap-2"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                  >
                    <span className="w-1.5 h-1.5 bg-[#d4ae5b] rounded-full shrink-0 shadow-[0_0_12px_rgba(212,174,91,0.65)]" />
                    {u}
                  </li>
                ))}
              </ul>
              <Link
                to={`/products#${p.id}`}
                className="premium-link-btn inline-flex items-center gap-2 text-[13px] px-4 py-2 rounded-[8px] transition-all"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                View details <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
