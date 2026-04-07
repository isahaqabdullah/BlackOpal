import { Link } from 'react-router';
import { ShieldCheck, Award, FileCheck } from 'lucide-react';

export function AboutPage() {
  return (
    <div>
      <section className="py-12 md:py-16">
        <div className="premium-shell">
          <span className="premium-kicker text-[11px] tracking-[0.24em] uppercase mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>About</span>
          <h1 className="premium-heading text-[clamp(2.2rem,4.8vw,4rem)] leading-[1.02] tracking-[-0.03em] mb-6 max-w-3xl"
            style={{ fontFamily: "'DM Serif Display', serif" }}>
            Large-scale coconut shell activated carbon manufacturing
          </h1>
          <p className="premium-copy text-[15px] leading-[1.85] max-w-xl"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            Established in 2010 through a joint venture with experienced carbon manufacturers,
            Black Opal Carbon has built a reputation for consistent product quality and reliable supply.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="premium-shell">
          <div className="premium-split-grid">
            <div className="premium-image-frame w-full max-w-[42rem]">
              <img
                src="https://images.unsplash.com/photo-1554070211-e3953a3de374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFudWZhY3R1cmluZyUyMHdhcmVob3VzZSUyMGZhY3RvcnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzU0NzU0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Manufacturing facility"
                className="w-full aspect-[5/4] object-cover"
              />
            </div>
            <div className="space-y-5 premium-copy text-[14px] leading-[1.85]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              <h2 className="premium-heading text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[1.08] tracking-[-0.02em] mb-4"
                style={{ fontFamily: "'DM Serif Display', serif" }}>Our story</h2>
              <p>Black Opal Carbon was founded in 2010 as a joint venture between experienced activated
                carbon professionals and coconut shell carbon manufacturers in India. The goal was simple:
                bring high-quality, consistent coconut shell activated carbon to the North American market
                at competitive pricing.</p>
              <p>Today, we operate two production centers with a combined annual capacity of 50 million
                pounds. Our U.S. headquarters in Pittsburgh manages all sales, technical support, and
                logistics coordination, with four strategically located warehouse facilities ensuring
                rapid delivery nationwide.</p>
              <p>Our customers include municipal water utilities, gold mining operations, oil and gas
                companies, and industrial manufacturers who depend on consistent quality and reliable
                supply for their activated carbon needs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="premium-shell">
          <h2 className="premium-heading text-[clamp(1.6rem,2.8vw,2.3rem)] leading-[1.08] tracking-[-0.02em] mb-12"
            style={{ fontFamily: "'DM Serif Display', serif" }}>Certifications &amp; compliance</h2>
          <div className="premium-auto-grid">
            {[
              { icon: ShieldCheck, title: 'NSF/ANSI 42', desc: 'Certified for drinking water treatment — aesthetic effects including taste, odor, and chlorine reduction.' },
              { icon: Award, title: 'NSF/ANSI 61', desc: 'Certified for drinking water system components — safe for direct contact with potable water.' },
              { icon: FileCheck, title: 'California Prop 65', desc: 'Compliant with California Proposition 65 requirements for chemicals known to cause cancer or reproductive harm.' },
            ].map((c) => (
              <div key={c.title} className="premium-panel-soft p-7">
                <c.icon size={22} className="text-[#e6cb87] mb-4" />
                <h3 className="text-[#f7efdb] text-[15px] mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>{c.title}</h3>
                <p className="premium-copy text-[13px] leading-[1.75]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="premium-shell">
          <div className="premium-panel text-center px-6 py-8">
            <p className="premium-copy text-[15px] mb-5" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
            Questions about our manufacturing or certifications?
            </p>
            <Link to="/contact"
              className="premium-primary-btn inline-block text-[13px] px-8 py-3 rounded-full"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
