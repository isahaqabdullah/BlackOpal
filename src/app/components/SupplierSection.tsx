'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useHomePageDataAttribute } from '../cms/visualEditingAttributes';
import { useSiteContent } from '../content/SiteContentProvider';

export function SupplierSection() {
  const { homePage } = useSiteContent();
  const homePageDataAttribute = useHomePageDataAttribute(homePage._id);

  return (
    <section className="border-y border-[#c9a24d]/10 py-10 md:py-12">
      <div className="premium-shell" data-sanity-edit-target>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:items-end">
          <div>
            <p
              data-sanity={homePageDataAttribute('supplierSectionKicker')}
              className="premium-copy mb-3 text-[13px] font-medium tracking-normal text-[#d7c7a2]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {homePage.supplierSectionKicker}
            </p>
            <h2
              data-sanity={homePageDataAttribute('supplierSectionTitle')}
              className="premium-heading premium-heading-elevated max-w-3xl text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.08] tracking-normal"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              {homePage.supplierSectionTitle}
            </h2>
          </div>

          <div>
            <p
              data-sanity={homePageDataAttribute('supplierSectionDescription')}
              className="premium-copy mb-5 text-[15px] leading-[1.75] md:text-[16px]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
            >
              {homePage.supplierSectionDescription}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {homePage.supplierSectionLinks.map((link, index) => (
                <Link
                  key={`${link.to}-${link.label}`}
                  data-sanity={homePageDataAttribute(`supplierSectionLinks[${index}]`)}
                  href={link.to}
                  className="premium-link-btn inline-flex items-center gap-2 rounded-[8px] px-4 py-2 text-[13px] transition-all"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {link.label}
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
