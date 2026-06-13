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
      linkLabel: homePage.trustCertificationLinkLabel,
      linkLabelPath: 'trustCertificationLinkLabel',
      linkUrl: homePage.trustCertificationLinkUrl,
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
    <section className="py-1.5 md:py-1.5">
      <div className="premium-shell">
        <div className="premium-compact-grid border-y border-[#c9a24d]/10 py-1.5">
          {items.map((item, index) => (
            <div
              key={item.labelPath}
              data-sanity-edit-target
              className={`flex items-center gap-3 ${index > 0 ? 'xl:border-l xl:border-[#c9a24d]/10 xl:pl-5' : ''}`}
            >
              <div className="premium-icon-wrap w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                <item.icon size={16} className="text-[#e6cb87]" />
              </div>
              <div>
                <span
                  data-sanity={homePageDataAttribute(item.labelPath)}
                  className="text-[#8f835f] text-[10px] tracking-[0.18em] uppercase block"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                >
                  {item.label}
                </span>
                <span
                  data-sanity={homePageDataAttribute(item.valuePath)}
                  className="text-[#f7efdb] text-[13px]"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {item.value}
                </span>
                {'linkLabel' in item && item.linkLabel && item.linkUrl ? (
                  <a
                    data-sanity={homePageDataAttribute(item.linkLabelPath)}
                    href={item.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block w-fit text-[11px] text-[#f2d78b] transition-colors hover:text-[#f7efdb]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    {item.linkLabel}
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
