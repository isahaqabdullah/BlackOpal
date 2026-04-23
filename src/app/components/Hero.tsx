import { Link } from 'react-router';
import { ShieldCheck, Factory, MapPin, Scale } from 'lucide-react';
import axionVideo from '../../public/images/axionvideo1.mp4';

const proofPoints = [
  { icon: ShieldCheck, text: 'NSF 42 / NSF 61 Certified' },
  { icon: Scale, text: '50M lbs Annual Capacity' },
  { icon: Factory, text: '2 Production Centers' },
  { icon: MapPin, text: 'U.S. HQ + Warehouse Network' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[#c9a24d]/10">
      <div className="pointer-events-none absolute inset-0">
        <div className="premium-flow-lines absolute inset-x-[-10%] top-[10%] bottom-[-12%]" />
        <div className="absolute left-[10%] top-[8%] h-48 w-48 rounded-full bg-[#c9a24d]/10 blur-3xl" />
        <div className="absolute right-[5%] top-[18%] h-64 w-64 rounded-full bg-[#8b6725]/14 blur-3xl" />
      </div>

      <div className="premium-shell py-16 md:py-24 relative z-10">
        <div className="premium-split-grid">
          <div>
            <span
              className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-5"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Prop 65 Compliant
            </span>
            <h1
              className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2.4rem,5vw,4.7rem)] leading-[0.98] tracking-[-0.03em] mb-6 max-w-xl"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Coconut Shell Activated Carbon for Water, Air, Gas &amp; Industrial Applications
            </h1>
            <p
              className="premium-copy premium-reveal premium-reveal-delay-2 text-[15px] md:text-[16px] leading-[1.85] mb-8 max-w-xl"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              High-performance activated carbon solutions backed by large-scale
              manufacturing, certified quality, and application-specific expertise.
            </p>
            <div className="premium-reveal premium-reveal-delay-3 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="premium-primary-btn text-[13px] px-7 py-3 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                Request a Quote
              </Link>
              <Link
                to="/contact"
                className="premium-secondary-btn text-[13px] px-7 py-3 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                Talk to Technical Sales
              </Link>
            </div>

            <div className="premium-compact-grid mt-9">
              {proofPoints.map((p, index) => (
                <div
                  key={p.text}
                  className="border-l border-[#c9a24d]/14 pl-4 flex items-center gap-3 premium-reveal"
                  style={{ animationDelay: `${260 + index * 80}ms` }}
                >
                  <div className="premium-icon-wrap w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    <p.icon size={18} className="text-[#e6cb87]" />
                  </div>
                  <span
                    className="text-[12px] text-[#d7c7a2] leading-tight"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                  >
                    {p.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full max-w-[48rem] xl:justify-self-end">
            <div className="pointer-events-none absolute inset-x-[12%] bottom-[-7%] h-24 rounded-full bg-[#c9a24d]/12 blur-3xl" />
            <div className="premium-image-frame premium-image-animated premium-reveal premium-reveal-delay-1">
              <div className="relative overflow-hidden rounded-[1.15rem]">
                <video
                  src={axionVideo}
                  className="block w-full aspect-video object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Axion production video"
                >
                  Your browser does not support the video tag.
                </video>

                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.06),transparent_34%),linear-gradient(180deg,rgba(5,5,5,0.02),rgba(5,5,5,0.22))]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
