import { Link } from 'react-router';
import { Droplets, Gem, Wind, Fuel, FlaskConical, Cog } from 'lucide-react';

const apps = [
  {
    id: 'water-treatment',
    icon: Droplets,
    name: 'Water Treatment',
    desc: 'Activated carbon is the standard of care for municipal, industrial, and point-of-use water purification — removing chlorine, taste, odor, VOCs, and disinfection byproducts.',
    products: ['Granular AC (8x30, 12x40)', 'Powder AC', 'Catalytic AC for chloramine systems'],
    image: 'https://images.unsplash.com/photo-1758738880344-373b29019b33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGRyaW5raW5nJTIwd2F0ZXIlMjBnbGFzcyUyMHBvdXJpbmd8ZW58MXx8fHwxNzc1NDc1NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'gold-recovery',
    icon: Gem,
    name: 'Gold Recovery',
    desc: 'Coconut shell activated carbon is the preferred adsorbent for carbon-in-pulp (CIP) and carbon-in-leach (CIL) gold extraction, offering superior hardness and gold loading capacity.',
    products: ['Granular AC (6x12, 6x16)', 'High-hardness grades (>97%)'],
    image: 'https://images.unsplash.com/photo-1662251773377-104e93441427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwbWluaW5nJTIwb3BlcmF0aW9uJTIwbWFjaGluZXJ5JTIwZXh0cmFjdGlvbnxlbnwxfHx8fDE3NzU0NzU0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'air-gas',
    icon: Wind,
    name: 'Air & Gas Purification',
    desc: 'Granular and impregnated carbon grades for VOC removal, solvent recovery, odor control, and gas-phase contaminant capture in industrial and environmental applications.',
    products: ['Impregnated AC (KOH, KI)', 'Granular AC (4x8, 4x10)', 'Pelletized carbon'],
    image: 'https://images.unsplash.com/photo-1759646827242-cf09e30709aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjBmaWx0cmF0aW9uJTIwc3lzdGVtJTIwaW5kdXN0cmlhbCUyMHZlbnRpbGF0aW9ufGVufDF8fHx8MTc3NTQ3NTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'oil-gas',
    icon: Fuel,
    name: 'Oil & Gas',
    desc: 'Carbon solutions for amine sweetening, glycol dehydration, produced water treatment, and wellhead gas purification in upstream and midstream operations.',
    products: ['Granular AC (8x30)', 'Custom grades for amine systems'],
    image: 'https://images.unsplash.com/photo-1614377493833-7f92e84773ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjBnYXMlMjByZWZpbmVyeSUyMHBpcGVzJTIwc3RlZWx8ZW58MXx8fHwxNzc1NDc1NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'catalytic',
    icon: FlaskConical,
    name: 'Catalytic / Chloramine Removal',
    desc: 'Specially engineered catalytic carbon for the decomposition of chloramines and hydrogen sulfide — delivering longer bed life and lower operational costs than standard GAC.',
    products: ['Catalytic AC (8x30, 12x40)', 'NSF 42 / NSF 61 certified grades'],
    image: 'https://images.unsplash.com/photo-1774789599304-cca1e1ffbb95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRyZWF0bWVudCUyMHBsYW50JTIwaW5kdXN0cmlhbCUyMGZhY2lsaXR5fGVufDF8fHx8MTc3NTQ3NTQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 'other',
    icon: Cog,
    name: 'Other Industrial Applications',
    desc: 'Activated carbon for food & beverage processing, pharmaceutical purification, chemical manufacturing, and specialty industrial uses.',
    products: ['Powder AC', 'Granular AC', 'Custom specifications available'],
    image: 'https://images.unsplash.com/photo-1554070211-e3953a3de374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFudWZhY3R1cmluZyUyMHdhcmVob3VzZSUyMGZhY3RvcnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzU0NzU0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function ApplicationsPage() {
  return (
    <div>
      <section className="py-12 md:py-16">
        <div className="premium-shell">
          <span className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Applications</span>
          <h1 className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2.2rem,4.8vw,4rem)] leading-[1.02] tracking-[-0.03em] mb-6 max-w-3xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}>
            Industries and applications we serve
          </h1>
          <p className="premium-copy premium-reveal premium-reveal-delay-2 text-[15px] leading-[1.85] max-w-xl"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            Application-matched grades for water, gas, and industrial treatment.
            Our technical team can help identify the right product for your process.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="premium-shell space-y-20">
          {apps.map((a, i) => (
            <div
              key={a.id}
              id={a.id}
              className="premium-panel-soft premium-card-animated premium-reveal premium-split-grid scroll-mt-24 p-6 md:p-7"
              style={{ animationDelay: `${120 + i * 90}ms` }}
            >
              <div className={i % 2 === 1 ? 'xl:order-2' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="premium-icon-wrap w-9 h-9 rounded-full flex items-center justify-center">
                    <a.icon size={16} className="text-[#e6cb87]" />
                  </div>
                  <h2 className="premium-heading premium-heading-elevated text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.1]"
                    style={{ fontFamily: "'DM Serif Display', serif" }}>{a.name}</h2>
                </div>
                <p className="premium-copy text-[14px] leading-[1.85] mb-5"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>{a.desc}</p>
                <div className="mb-6">
                  <span className="text-[10px] tracking-[0.22em] uppercase text-[#8f835f] block mb-2"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>Recommended products</span>
                  <ul className="space-y-1.5">
                    {a.products.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-[13px] text-[#d7c7a2]"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
                        <span className="w-1.5 h-1.5 bg-[#d4ae5b] rounded-full shrink-0 shadow-[0_0_12px_rgba(212,174,91,0.65)]" />{p}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to="/contact"
                  className="premium-primary-btn inline-block text-[12px] px-6 py-2.5 rounded-full"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  Get a Quote
                </Link>
              </div>
              <div className={`${i % 2 === 1 ? 'xl:order-1' : ''} premium-image-frame w-full max-w-[40rem] xl:justify-self-end`}>
                <img src={a.image} alt={a.name} className="w-full aspect-[3/2] object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
