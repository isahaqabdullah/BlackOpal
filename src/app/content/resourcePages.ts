export type ResourceHubCard = {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
};

export type ResourceDetailPage = {
  slug: string;
  label: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  body: string[];
  ctaLabel: string;
  ctaHref: string;
};

const resourcesRoot = '/resources';

export function resourcePagePath(slug: string) {
  return `${resourcesRoot}/${slug}`;
}

export const resourceHub = {
  path: resourcesRoot,
  label: 'Resources',
  title: 'Technical resources for activated carbon selection',
  description:
    'Black Opal resources connect activated carbon product families with industrial applications across water treatment, gold recovery, air and gas purification, refinery service, catalytic carbon, and specialty purification. Detailed TDS, certificates of analysis where applicable, and grade recommendations are shared after the application, product family, packing requirement, and destination-market documentation are confirmed.',
  seoTitle: 'Activated Carbon Technical Resources | Black Opal Carbons',
  seoDescription:
    'Technical resources from Black Opal Carbons for activated carbon product selection, applications, documentation, packaging references, and grade matching.',
};

export const resourceHubCards: ResourceHubCard[] = [
  {
    title: 'Water treatment activated carbon',
    description:
      'GAC, PAC, impregnated, washed, pH-adjusted, and catalytic grades for drinking water, process water, wastewater polishing, taste, odor, VOC, pesticide, THM, and chloramine-related applications.',
    href: '/applications/water-treatment',
    ctaLabel: 'View application',
  },
  {
    title: 'Gold recovery activated carbon',
    description:
      'High-hardness microporous coconut shell carbon for CIP, CIL, CIC and tank-adsorbed recovery systems where adsorption rate, loading capacity, low dust, and attrition resistance matter.',
    href: '/applications/gold-recovery',
    ctaLabel: 'View application',
  },
  {
    title: 'Catalytic activated carbon',
    description:
      'CATCARB surface-modified coconut shell carbon for chloramine reduction, hydrogen sulfide control, taste and odor treatment, and specialty water-treatment requirements.',
    href: '/products/catalytic',
    ctaLabel: 'View product',
  },
  {
    title: 'Granular vs powdered activated carbon',
    description:
      'A practical comparison of GAC and PAC based on system design, contact method, particle size, handling, and application fit.',
    href: '/products',
    ctaLabel: 'View product families',
  },
  {
    title: 'TDS, COA, and grade matching',
    description:
      'How Black Opal handles technical data sheets, certificates of analysis, and grade recommendations for verified industrial requirements.',
    href: resourcePagePath('tds-coa-grade-matching'),
    ctaLabel: 'View resource',
  },
];

export const resourceDetailPages: ResourceDetailPage[] = [
  {
    slug: 'tds-coa-grade-matching',
    label: 'Technical documentation',
    title: 'TDS, COA, and grade matching',
    description:
      'Black Opal provides product information, application context, packaging references, and quality documentation through the sales and technical team. Detailed technical data sheets, certificates of analysis where applicable, and grade recommendations are shared after the product family, application, packing requirement, and destination-market documentation are confirmed.',
    seoTitle: 'TDS, COA, and Activated Carbon Grade Matching | Black Opal Carbons',
    seoDescription:
      'How Black Opal Carbons handles activated carbon technical data sheets, certificates of analysis where applicable, and grade recommendations for industrial requirements.',
    body: [
      'Grade selection is handled around the intended application, product family, packing format, and documentation requirement, so the final recommendation matches the system it is meant to serve.',
    ],
    ctaLabel: 'Contact Black Opal for grade review',
    ctaHref: '/contact',
  },
];

export const resourceDetailPageMap = resourceDetailPages.reduce<Record<string, ResourceDetailPage>>(
  (map, page) => {
    map[page.slug] = page;
    return map;
  },
  {},
);

export const resourceDetailPagePaths = resourceDetailPages.map((page) => resourcePagePath(page.slug));
