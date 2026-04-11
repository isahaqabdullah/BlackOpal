export function CompanySection() {
  return (
    <section className="py-16 md:py-20">
      <div className="premium-shell">
        <div className="premium-split-grid">
          <div className="premium-image-frame premium-image-animated premium-reveal premium-reveal-delay-1 w-full max-w-[42rem]">
            <img
              src="https://images.unsplash.com/photo-1554070211-e3953a3de374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFudWZhY3R1cmluZyUyMHdhcmVob3VzZSUyMGZhY3RvcnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzU0NzU0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Manufacturing facility"
              className="w-full aspect-[5/4] object-cover"
            />
          </div>
          <div>
            <span
              className="premium-kicker premium-reveal text-[11px] tracking-[0.24em] uppercase mb-4"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Our Company
            </span>
            <h2
              className="premium-heading premium-heading-elevated premium-reveal premium-reveal-delay-1 text-[clamp(2rem,3.5vw,3.15rem)] leading-[1.04] tracking-[-0.02em] mb-6"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Built on reliability, consistency, and service
            </h2>
            <div
              className="space-y-4 premium-copy premium-reveal premium-reveal-delay-2 text-[14px] leading-[1.85] mb-10"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              <p>
                Established in 2010 through a joint venture with experienced
                activated carbon manufacturers, Black Opal Carbon has grown into
                a trusted supplier for industrial and municipal buyers across
                North America.
              </p>
              <p>
                Our manufacturing facilities in India produce coconut
                shell activated carbon to exacting specifications. Our U.S.
                headquarters in Pittsburgh manages sales, logistics, and
                technical support — with warehouse locations positioned to
                minimize transit times for customers nationwide.
              </p>
            </div>
            <div className="premium-compact-grid premium-reveal premium-reveal-delay-3 border-t border-[#c9a24d]/10 pt-6">
              {[
                { value: '2010', label: 'Established' },
                { value: '2', label: 'Production centers' },
                { value: '4', label: 'U.S. warehouses' },
              ].map((s, index) => (
                <div key={s.label} className={index === 0 ? '' : 'xl:border-l xl:border-[#c9a24d]/10 xl:pl-4'}>
                  <span
                    className="text-[#e6cb87] text-[clamp(1.3rem,2vw,1.8rem)] block mb-0.5"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="text-[#8f835f] text-[11px] tracking-[0.12em] uppercase"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
