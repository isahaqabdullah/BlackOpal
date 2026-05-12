import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { useSiteContent } from '../content/SiteContentProvider';
import { PageIntro } from './PageIntro';

export function ApplicationsPage() {
  const { applications, productMap } = useSiteContent();

  return (
    <div>
      <PageIntro
        label="Applications"
        title="Industrial activated carbon applications"
        description="Water, gold recovery, air, gas, refinery, and specialty industrial programs each place different demands on hardness, pore structure, activity, and purity."
        breadcrumbs={[{ label: 'Applications' }]}
      />

      <section className="pb-10 md:pb-12">
        <div className="premium-shell space-y-6">
          {applications.map((application, index) => (
            <div
              key={application.slug}
              data-sanity-edit-target
              className="premium-panel-soft premium-card-animated premium-reveal p-6 md:p-7"
              style={{ animationDelay: `${120 + index * 90}ms` }}
            >
              <div className="premium-split-grid items-start">
                <div>
                  <span
                    className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    Application
                  </span>
                  <h2
                    className="premium-heading premium-heading-elevated text-[clamp(1.55rem,2.4vw,2rem)] leading-[1.08] mb-3"
                    style={{ fontFamily: "'DM Serif Display', serif" }}
                  >
                    {application.name}
                  </h2>
                  <p
                    className="premium-copy text-[14px] leading-[1.8] mb-5 max-w-2xl"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                  >
                    {application.summary}
                  </p>
                  <p
                    className="premium-copy text-[13px] leading-[1.8] mb-6 max-w-2xl"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                  >
                    {application.intro}
                  </p>

                  <div className="premium-form-grid gap-8">
                    <div>
                      <span
                        className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        Key points
                      </span>
                      <div className="space-y-2">
                        {application.keyPoints.map((point) => (
                          <div
                            key={point}
                            className="flex items-start gap-3 text-[13px] text-[#d7c7a2]"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                          >
                            <span className="w-1.5 h-1.5 bg-[#d4ae5b] rounded-full mt-2 shrink-0 shadow-[0_0_12px_rgba(212,174,91,0.65)]" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span
                        className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                      >
                        Recommended products
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {application.recommendedProducts.map((slug) => (
                          <span
                            key={slug}
                            className="premium-link-btn text-[12px] px-3 py-1.5 rounded-full"
                            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                          >
                            {productMap[slug]?.shortName ?? slug}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 pt-6 border-t border-[#c9a24d]/10 flex flex-wrap gap-3">
                    <Link
                      to={`/applications/${application.slug}`}
                      className="premium-primary-btn inline-flex items-center gap-2 text-[13px] px-5 py-2.5 rounded-full"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      Application details
                      <ArrowRight size={14} />
                    </Link>
                    <Link
                      to="/contact"
                      className="premium-secondary-btn inline-flex items-center gap-2 text-[13px] px-5 py-2.5 rounded-full"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                    >
                      Discuss with sales
                    </Link>
                  </div>
                </div>

                <div className="premium-image-frame w-full max-w-[38rem] xl:justify-self-end">
                  <img src={application.image} alt={application.name} className="w-full aspect-[4/3] object-cover" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
