import { TreePalm, Target, Layers, Truck, Headphones, ShieldCheck } from 'lucide-react';

const reasons = [
  { icon: TreePalm, title: 'Coconut Shell Specialization', desc: 'Dedicated focus on coconut shell-based carbon for superior hardness, micropore structure, and renewable sourcing.' },
  { icon: Target, title: 'Consistent Quality', desc: 'Rigorous in-process QC at every production stage. Batch-to-batch consistency backed by full COA documentation.' },
  { icon: Layers, title: 'Application-Specific Grades', desc: 'Tailored product grades for water, air, gas, and specialty processes — not one-size-fits-all carbon.' },
  { icon: Truck, title: 'Supply Reliability', desc: 'Strategic warehouse locations across the U.S. for reduced lead times and reliable just-in-time delivery.' },
  { icon: Headphones, title: 'Technical Support', desc: 'Application engineers available to help with product selection, dosing guidance, and performance optimization.' },
  { icon: ShieldCheck, title: 'Certifications & Compliance', desc: 'NSF 42, NSF 61, and California Prop 65 compliant. Ready for regulated and food-grade applications.' },
];

export function WhyBlackOpal() {
  return (
    <section className="py-16 md:py-20">
      <div className="premium-shell">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span
            className="premium-kicker text-[11px] tracking-[0.24em] uppercase mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Why Black Opal Carbon
          </span>
          <h2
            className="premium-heading text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.08] tracking-[-0.02em]"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Reliable supply from large-scale coconut shell carbon manufacturing
          </h2>
        </div>

        <div className="premium-auto-grid gap-y-8">
          {reasons.map((r) => (
            <div key={r.title} className="border-t border-[#c9a24d]/10 pt-6">
              <div className="premium-icon-wrap w-10 h-10 rounded-full flex items-center justify-center mb-4">
                <r.icon size={18} className="text-[#e6cb87]" />
              </div>
              <h3
                className="text-[#f7efdb] text-[15px] mb-2"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
              >
                {r.title}
              </h3>
              <p
                className="premium-copy text-[13px] leading-[1.75]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
              >
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
