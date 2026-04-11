import { Link } from 'react-router';
import { Zap, ArrowRight } from 'lucide-react';

export function FeaturedProduct() {
  return (
    <section className="py-16 md:py-20">
      <div className="premium-shell">
        <div className="premium-panel premium-split-grid p-8 md:p-10 lg:p-12">
          <div>
            <div className="premium-reveal flex items-center gap-2 mb-5">
              <Zap size={16} className="text-[#e6cb87]" />
              <span
                className="text-[11px] tracking-[0.24em] uppercase text-[#e6cb87]"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                Featured Capability
              </span>
            </div>
            <h2
              className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2rem,3.9vw,3.45rem)] leading-[1.02] tracking-[-0.02em] mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Engineered for chloramine reduction
            </h2>
            <p
              className="premium-copy premium-reveal premium-reveal-delay-2 text-[15px] leading-[1.85] mb-6 max-w-lg"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              Our catalytic activated carbon is specifically designed for the
              decomposition of chloramines in municipal water systems. Unlike
              standard activated carbon that relies on adsorption alone, our
              catalytic grades break chloramines down through surface-catalyzed
              reactions — delivering longer bed life and lower operating cost.
            </p>
            <ul className="space-y-2.5 mb-8 premium-reveal premium-reveal-delay-3">
              {[
                'Higher catalytic activity than standard GAC',
                'Proven performance in point-of-entry and municipal systems',
                'NSF 42 and NSF 61 certified for drinking water contact',
                'Optimized pore structure for extended service life',
              ].map((item) => (
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
            <Link
              to="/products#catalytic"
              className="premium-primary-btn premium-reveal premium-reveal-delay-3 inline-flex items-center gap-2 text-[13px] px-6 py-3 rounded-full"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Explore Catalytic Carbon <ArrowRight size={14} />
            </Link>
          </div>

          <div className="premium-image-frame premium-image-animated premium-reveal premium-reveal-delay-1 w-full max-w-[42rem] xl:justify-self-end">
            <img
              src="https://images.unsplash.com/photo-1774789599304-cca1e1ffbb95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRyZWF0bWVudCUyMHBsYW50JTIwaW5kdXN0cmlhbCUyMGZhY2lsaXR5fGVufDF8fHx8MTc3NTQ3NTQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Water treatment facility"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
