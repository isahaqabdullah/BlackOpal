import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    id: 'granular',
    name: 'Granular Activated Carbon (GAC)',
    desc: 'Engineered for high adsorption capacity in fixed-bed and flow-through systems. Available in multiple mesh sizes.',
    specs: [
      { label: 'Mesh sizes', value: '4x8, 8x16, 8x30, 12x40, 20x50' },
      { label: 'Iodine number', value: '1000 – 1200 mg/g' },
      { label: 'Hardness', value: '>97%' },
      { label: 'Ash', value: '<5%' },
    ],
    applications: ['Municipal water treatment', 'Point-of-use / point-of-entry', 'Gold recovery (CIP/CIL)', 'Industrial process water'],
  },
  {
    id: 'powder',
    name: 'Powder Activated Carbon (PAC)',
    desc: 'Fine-grind carbon for rapid contaminant removal in batch treatment and inline dosing applications.',
    specs: [
      { label: 'Particle size', value: '80% passing 325 mesh' },
      { label: 'Iodine number', value: '900 – 1100 mg/g' },
      { label: 'Moisture', value: '<10%' },
      { label: 'pH', value: '9 – 11' },
    ],
    applications: ['Taste & odor control', 'Emergency spill response', 'Wastewater polishing', 'Decolorization'],
  },
  {
    id: 'impregnated',
    name: 'Impregnated Activated Carbon',
    desc: 'Chemically enhanced grades for targeted removal of specific contaminants in air and gas applications.',
    specs: [
      { label: 'Base', value: 'Coconut shell GAC' },
      { label: 'Impregnants', value: 'KOH, KI, H₃PO₄, custom' },
      { label: 'Target compounds', value: 'H₂S, HCl, SO₂, Hg, formaldehyde' },
      { label: 'Iodine number', value: '800 – 1000 mg/g' },
    ],
    applications: ['H₂S removal from biogas', 'Mercury capture', 'Acid gas scrubbing', 'Indoor air quality'],
  },
  {
    id: 'catalytic',
    name: 'Catalytic Activated Carbon',
    desc: 'Optimized surface chemistry for catalytic decomposition of chloramines and hydrogen sulfide without chemical impregnation.',
    specs: [
      { label: 'Catalytic activity', value: 'Enhanced surface oxidation' },
      { label: 'Iodine number', value: '1000 – 1100 mg/g' },
      { label: 'Hardness', value: '>95%' },
      { label: 'Certifications', value: 'NSF 42, NSF 61' },
    ],
    applications: ['Chloramine reduction', 'H₂S removal from water', 'Municipal drinking water', 'Industrial process water'],
  },
];

export function ProductsPage() {
  return (
    <div>
      <section className="py-12 md:py-16">
        <div className="premium-shell">
          <span className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Products</span>
          <h1 className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2.2rem,4.8vw,4rem)] leading-[1.02] tracking-[-0.03em] mb-6 max-w-3xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}>
            Application-matched activated carbon grades
          </h1>
          <p className="premium-copy premium-reveal premium-reveal-delay-2 text-[15px] leading-[1.85] max-w-xl"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            All products manufactured from coconut shell raw material. COA and TDS available
            on request. REACH and RoHS compliant.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="premium-shell space-y-16">
          {products.map((p, index) => (
            <div
              key={p.id}
              id={p.id}
              className="premium-panel-soft premium-card-animated premium-reveal scroll-mt-24 p-7 md:p-8"
              style={{ animationDelay: `${120 + index * 90}ms` }}
            >
              <h2 className="premium-heading premium-heading-elevated text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1] mb-3"
                style={{ fontFamily: "'DM Serif Display', serif" }}>{p.name}</h2>
              <p className="premium-copy text-[14px] leading-[1.8] mb-8 max-w-2xl"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>{p.desc}</p>

              <div className="premium-form-grid gap-8">
                <div>
                  <span className="text-[10px] tracking-[0.22em] uppercase text-[#8f835f] block mb-3"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Specifications</span>
                  <div className="space-y-0">
                    {p.specs.map((s) => (
                      <div key={s.label} className="flex justify-between gap-4 py-3 border-b border-[#c9a24d]/10 text-[13px]">
                        <span className="text-[#b8ab8b]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>{s.label}</span>
                        <span className="text-[#f7efdb] text-right" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] tracking-[0.22em] uppercase text-[#8f835f] block mb-3"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Applications</span>
                  <ul className="space-y-2">
                    {p.applications.map((a) => (
                      <li key={a} className="flex items-center gap-2.5 text-[13px] text-[#d7c7a2]"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                        <span className="w-1.5 h-1.5 bg-[#d4ae5b] rounded-full shrink-0 shadow-[0_0_12px_rgba(212,174,91,0.65)]" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#c9a24d]/10 flex flex-wrap gap-3">
                <Link to="/contact"
                  className="premium-primary-btn text-[12px] px-6 py-2.5 rounded-full"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  Request Quote
                </Link>
                <button
                  className="premium-secondary-btn text-[12px] px-6 py-2.5 rounded-full inline-flex items-center gap-1.5"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  Download TDS <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
