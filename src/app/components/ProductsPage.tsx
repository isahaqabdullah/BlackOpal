import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { products } from '../content/siteContent';
import { PageIntro } from './PageIntro';

export function ProductsPage() {
  return (
    <div>
      <PageIntro
        label="Products"
        title="Coconut shell activated carbon product families"
        description="Granular, powder, impregnated, and catalytic grades cover fixed-bed filtration, fast-response dosing, targeted gas treatment, chloramine reduction, and specialty process duties."
        breadcrumbs={[{ label: 'Products' }]}
      />

      <section className="pb-10 md:pb-12">
        <div className="premium-shell space-y-6">
          {products.map((product, index) => (
            <div
              key={product.slug}
              className="premium-panel-soft premium-card-animated premium-reveal p-6 md:p-7"
              style={{ animationDelay: `${120 + index * 90}ms` }}
            >
              <div className="premium-split-grid items-start">
                <div>
                  <span
                    className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    {product.shortName}
                  </span>
                  <h2
                    className="premium-heading premium-heading-elevated text-[clamp(1.55rem,2.4vw,2rem)] leading-[1.08] mb-3"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {product.name}
                  </h2>
                  <p
                    className="premium-copy text-[14px] leading-[1.8] mb-5 max-w-2xl"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                  >
                    {product.summary}
                  </p>
                  <p
                    className="premium-copy text-[13px] leading-[1.8] mb-6 max-w-2xl"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                  >
                    {product.intro}
                  </p>

                  <div className="premium-form-grid gap-8">
                    <div>
                      <span
                        className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        Highlights
                      </span>
                      <div className="space-y-2">
                        {product.highlights.map((highlight) => (
                          <div
                            key={highlight}
                            className="flex items-start gap-3 text-[13px] text-[#d7c7a2]"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                          >
                            <span className="w-1.5 h-1.5 bg-[#d4ae5b] rounded-full mt-2 shrink-0 shadow-[0_0_12px_rgba(212,174,91,0.65)]" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span
                        className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        Common uses
                      </span>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.commonUses.map((use) => (
                          <span
                            key={use}
                            className="premium-link-btn text-[12px] px-3 py-1.5 rounded-full"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                          >
                            {use}
                          </span>
                        ))}
                      </div>

                      {product.grades?.length ? (
                        <>
                          <span
                            className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                          >
                            Referenced grades
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {product.grades.map((grade) => (
                              <span
                                key={grade}
                                className="premium-secondary-btn text-[12px] px-3 py-1.5 rounded-full"
                                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                              >
                                {grade}
                              </span>
                            ))}
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-7 pt-6 border-t border-[#c9a24d]/10 flex flex-wrap gap-3">
                    <Link
                      to={`/products/${product.slug}`}
                      className="premium-primary-btn inline-flex items-center gap-2 text-[13px] px-5 py-2.5 rounded-full"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      Product details
                      <ArrowRight size={14} />
                    </Link>
                    <Link
                      to="/contact"
                      className="premium-secondary-btn inline-flex items-center gap-2 text-[13px] px-5 py-2.5 rounded-full"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      Request quote
                    </Link>
                  </div>
                </div>

                <div className="premium-image-frame w-full max-w-[38rem] xl:justify-self-end">
                  <img src={product.image} alt={product.name} className="w-full aspect-[4/3] object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
