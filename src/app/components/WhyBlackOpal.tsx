import { TreePalm, Target, Layers, Truck, Headphones, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const reasons = [
  { icon: TreePalm, title: 'Coconut Shell Specialization', desc: 'Selected coconut shells support high hardness, low ash, micropore structure, and attrition resistance for premium activated carbon.' },
  { icon: Target, title: 'Consistent Quality', desc: 'Quality control starts at raw material selection and continues through activation, sizing, packing, and final assurance.' },
  { icon: Layers, title: 'Application-Specific Grades', desc: 'Granular, powder, impregnated, and catalytic formats are matched to contaminant profile, contact time, and operating conditions.' },
  { icon: Truck, title: 'Supply Reliability', desc: siteConfig.logisticsSummary },
  { icon: Headphones, title: 'Technical Support', desc: 'Sales and technical teams review application conditions, target contaminants, mesh size, activity, and compliance requirements before recommending a grade.' },
  { icon: ShieldCheck, title: 'Certifications & Compliance', desc: 'NSF 42, NSF 61, and California Prop 65 compliant. Ready for regulated and food-grade applications.' },
];

export function WhyBlackOpal() {
  return (
    <section className="py-10 md:py-12">
      <div className="premium-shell">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
          <span
            className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Why {siteConfig.siteName}
          </span>
          <h2
            className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2rem,3.5vw,3.15rem)] leading-[1.04] tracking-[-0.02em]"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            High-performance activated carbon backed by quality, innovation, service, and reliability
          </h2>
        </div>

        <div className="premium-auto-grid gap-y-8">
          {reasons.map((r, index) => (
            <div
              key={r.title}
              className="premium-panel-soft premium-card-animated premium-reveal p-6 md:p-7"
              style={{ animationDelay: `${120 + index * 90}ms` }}
            >
              <div className="premium-icon-wrap w-10 h-10 rounded-full flex items-center justify-center mb-4">
                <r.icon size={18} className="text-[#e6cb87]" />
              </div>
              <h3
                className="premium-card-heading text-[16px] md:text-[17px] mb-2 max-w-[18ch]"
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
