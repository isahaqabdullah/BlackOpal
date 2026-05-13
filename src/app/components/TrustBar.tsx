'use client';

import { Award, Calendar, Factory, Globe } from 'lucide-react';
import { useHomePageDataAttribute } from '../cms/visualEditingAttributes';
import { useSiteContent } from '../content/SiteContentProvider';

export function TrustBar() {
  const { homePage } = useSiteContent();
  const homePageDocumentId = homePage._id;
  const homePageDataAttribute = useHomePageDataAttribute(homePageDocumentId);
  const items = [
    {
      icon: Award,
      label: homePage.trustCertificationLabel,
      labelPath: 'trustCertificationLabel',
      value: homePage.trustCertificationValue,
      valuePath: 'trustCertificationValue',
    },
    {
      icon: Calendar,
      label: homePage.trustEstablishedLabel,
      labelPath: 'trustEstablishedLabel',
      value: homePage.trustEstablishedValue,
      valuePath: 'trustEstablishedValue',
    },
    {
      icon: Factory,
      label: homePage.trustProductionLabel,
      labelPath: 'trustProductionLabel',
      value: homePage.trustProductionValue,
      valuePath: 'trustProductionValue',
    },
    {
      icon: Globe,
      label: homePage.trustCapacityLabel,
      labelPath: 'trustCapacityLabel',
      value: homePage.trustCapacityValue,
      valuePath: 'trustCapacityValue',
    },
  ];

  return (
    <section className="py-4 md:py-5">
      <div className="premium-shell">
        <div className="premium-compact-grid border-y border-[#c9a24d]/10 py-4">
          {items.map((item, index) => (
            <div
              key={item.labelPath}
              data-sanity-edit-target
              className={`flex items-start gap-4 ${index > 0 ? 'xl:border-l xl:border-[#c9a24d]/10 xl:pl-6' : ''}`}
            >
              <div className="premium-icon-wrap w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                <item.icon size={18} className="text-[#e6cb87]" />
              </div>
              <div>
                <span
                  data-sanity={homePageDataAttribute(item.labelPath)}
                  className="text-[#8f835f] text-[10px] tracking-[0.18em] uppercase block mb-1"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                >
                  {item.label}
                </span>
                <span
                  data-sanity={homePageDataAttribute(item.valuePath)}
                  className="text-[#f7efdb] text-[14px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
