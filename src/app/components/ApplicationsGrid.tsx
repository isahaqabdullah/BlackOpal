import { Link } from 'react-router';
import { Droplets, Gem, Wind, Fuel, FlaskConical, Cog, ArrowRight } from 'lucide-react';
import { applications } from '../content/siteContent';

const iconMap = {
  'water-treatment': Droplets,
  'gold-recovery': Gem,
  'air-gas': Wind,
  'oil-gas': Fuel,
  'catalytic-carbon': FlaskConical,
  'other-applications': Cog,
};

function getApplicationIcon(slug: string) {
  return iconMap[slug as keyof typeof iconMap] ?? Cog;
}

export function ApplicationsGrid() {
  return (
    <section className="py-16 md:py-20">
      <div className="premium-shell">
        <div className="mb-12 md:mb-16">
          <span
            className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Applications
          </span>
          <h2
            className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2rem,3.5vw,3.15rem)] leading-[1.04] tracking-[-0.02em] max-w-2xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            Industries we serve
          </h2>
        </div>

        <div className="premium-auto-grid">
          {applications.map((a, index) => {
            const Icon = getApplicationIcon(a.slug);

            return (
              <Link
                key={a.slug}
                to={`/applications/${a.slug}`}
                className="premium-panel-soft premium-card-animated premium-reveal p-6 transition-colors group hover:border-[#d4ae5b]/20"
                style={{ animationDelay: `${120 + index * 90}ms` }}
              >
                <div className="premium-icon-wrap w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  <Icon size={18} className="text-[#e6cb87]" />
                </div>
                <h3
                  className="premium-card-heading text-[16px] md:text-[17px] mb-2 max-w-[16ch]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                >
                  {a.name}
                </h3>
                <p
                  className="premium-copy text-[13px] leading-[1.7] mb-4"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                >
                  {a.summary}
                </p>
                <span className="premium-link-btn inline-flex items-center gap-2 text-[12px] px-3.5 py-2 rounded-[8px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
                  View application <ArrowRight size={12} />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
