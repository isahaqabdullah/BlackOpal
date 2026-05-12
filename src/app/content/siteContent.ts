import { companyDetails, siteConfig } from '../config/siteConfig';
export { companyDetails } from '../config/siteConfig';

export type SiteMetric = {
  value: string;
  label: string;
};

export type ContentSection = {
  _key?: string;
  title: string;
  body: string;
  bullets?: string[];
};

export type SeoFields = {
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
  noIndex?: boolean;
};

export type HomePageContent = {
  _id?: string;
  _type?: 'homePage';
  siteId?: string;
  seo?: SeoFields;
  heroKicker: string;
  heroTitle: string;
  heroDescription: string;
  trustCertificationLabel: string;
  trustCertificationValue: string;
  trustEstablishedLabel: string;
  trustEstablishedValue: string;
  trustProductionLabel: string;
  trustProductionValue: string;
  trustLogisticsLabel: string;
  trustLogisticsValue: string;
  trustCapacityLabel: string;
  trustCapacityValue: string;
  productSectionKicker: string;
  productSectionTitle: string;
  applicationSectionKicker: string;
  applicationSectionTitle: string;
  companyEyebrow: string;
  companyTitle: string;
  companyBodyPrimary: string;
  companyBodySecondary: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
};

export type ProductEntry = {
  _id?: string;
  _type?: 'product';
  seo?: SeoFields;
  slug: string;
  name: string;
  shortName: string;
  summary: string;
  intro: string;
  highlights: string[];
  commonUses: string[];
  grades?: string[];
  sections: ContentSection[];
  image: string;
};

export type ApplicationEntry = {
  _id?: string;
  _type?: 'application';
  seo?: SeoFields;
  slug: string;
  name: string;
  summary: string;
  intro: string;
  keyPoints: string[];
  recommendedProducts: string[];
  grades?: string[];
  sections: ContentSection[];
  image: string;
};

export type NewsroomItem = {
  _id?: string;
  _type?: 'newsroomItem';
  seo?: SeoFields;
  slug: string;
  title: string;
  type: 'press-release' | 'resource';
  summary: string;
  detail?: string[];
  bullets?: string[];
};

export const homePageContent: HomePageContent = {
  siteId: siteConfig.siteId,
  heroKicker: siteConfig.heroKicker,
  heroTitle: siteConfig.heroTitle,
  heroDescription: siteConfig.heroDescription,
  trustCertificationLabel: 'Certifications',
  trustCertificationValue: 'NSF 42 · NSF 61 · Prop 65',
  trustEstablishedLabel: 'Established',
  trustEstablishedValue: 'Since 2010',
  trustProductionLabel: 'Production',
  trustProductionValue: `${siteConfig.productionCenterCount} Production Centers`,
  trustLogisticsLabel: 'Logistics',
  trustLogisticsValue: `${siteConfig.warehouseLocationCount} Warehouse Locations`,
  trustCapacityLabel: 'Capacity',
  trustCapacityValue: '35000 metric tons/year',
  productSectionKicker: 'Product Categories',
  productSectionTitle: 'Application-matched grades for every process',
  applicationSectionKicker: 'Applications',
  applicationSectionTitle: 'Industries we serve',
  companyEyebrow: siteConfig.companyEyebrow,
  companyTitle: siteConfig.companyTitle,
  companyBodyPrimary: siteConfig.companyBodyPrimary,
  companyBodySecondary: siteConfig.companyBodySecondary,
  ctaTitle: 'Grade selection starts with the process',
  ctaDescription: 'Mesh size, activity, washing, compliance, and delivery requirements shape the final recommendation.',
  ctaPrimaryLabel: 'Request Quote',
  ctaSecondaryLabel: 'Send Technical Inquiry',
};

export const siteMetrics: SiteMetric[] = [
  { value: '2010', label: 'Year established' },
  { value: siteConfig.productionCenterCount, label: 'Production centers' },
  ...(siteConfig.warehouseLocationCount === '0'
    ? []
    : [{ value: siteConfig.warehouseLocationCount, label: 'Warehouse locations' }]),
  { value: '35000 metric tons', label: 'Annual capacity' },
];

export const products: ProductEntry[] = [
  {
    slug: 'granular',
    name: 'Granular Activated Carbon',
    shortName: 'Granular',
    summary:
      'High-hardness coconut shell GAC for water treatment, gold recovery, solvent recovery, and condensate polishing.',
    intro:
      'Granular Activated Carbon (GAC) media and cartridges are used across water, mining, and gas-phase treatment when buyers need hardness, adsorption performance, and reliable attrition resistance.',
    highlights: [
      'Manufactured from selected grades of coconut shell under stringent controls for hardness, surface area, and attrition resistance.',
      'Available in different mesh sizes, adsorption levels, and pH-adjusted or washed variants tailored to customer requirements.',
      'Water-treatment grades are manufactured in ISO accredited facilities and support NSF 42 and NSF 61 applications.',
    ],
    commonUses: [
      'Water treatment',
      'Gold recovery',
      'Solvent recovery',
      'Condensate and H2S removal',
    ],
    sections: [
      {
        title: 'Where it is used',
        body:
          'Gold recovery, water treatment, solvent recovery, condensate polishing, and hydrogen sulfide removal are core applications for Black Opal granular activated carbon.',
      },
      {
        title: 'How it is built',
        body:
          'The GAC range is produced from high-quality coconut shell feedstock and engineered so the particle size and pore structure support strong adsorption performance in fixed-bed and cartridge-based systems.',
      },
      {
        title: 'Why buyers specify it',
        body:
          'Granular carbon is the backbone product when a process needs durable media, low attrition, and the flexibility to match mesh size and washing requirements to the application.',
        bullets: [
          'High hardness and abrasion resistance',
          'Process-specific mesh size and washing options',
          'Suitable for regulated water-treatment programs',
        ],
      },
    ],
    image:
      'https://images.unsplash.com/photo-1756729534562-ec0f8bcf252b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3RpdmF0ZWQlMjBjYXJib24lMjBncmFudWxlcyUyMGNoYXJjb2FsJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NzU0NzU0ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    slug: 'powder',
    name: 'Powder Activated Carbon',
    shortName: 'Powder',
    summary:
      'Virgin powdered activated carbon for drinking water, food-grade, wastewater, and odor-control programs.',
    intro:
      'PAC gives treatment teams a fast-response format for drinking water and batch programs where rapid contact and flexible dosing matter more than fixed-bed operation.',
    highlights: [
      'Suitable for drinking-water and food-grade applications aligned with ANSI/NSF Standard 42 and 61 requirements.',
      'Used in water treatment, wastewater treatment, odor removal, and brewery or winery applications.',
      'Commonly applied for chloramines, pesticides, herbicides, groundwater remediation, and DBP reduction.',
    ],
    commonUses: [
      'Water treatment',
      'Wastewater treatment',
      'Odor removal',
      'Brewery and winery applications',
    ],
    sections: [
      {
        title: 'Where it fits',
        body:
          'Powder carbon is used when the treatment program benefits from inline dosing or batch addition rather than a cartridge or pressure vessel.',
      },
      {
        title: 'Contaminant profile',
        body:
          'Common PAC use cases include chloramines, pesticides, herbicides, and disinfection by-product reduction in drinking-water and remediation environments.',
      },
      {
        title: 'Why it matters',
        body:
          'PAC extends the product offering into fast-response treatment programs and food-related processes where color, odor, or organic control has to happen quickly.',
        bullets: [
          'Drinking-water and food-grade positioning',
          'Useful for emergency and variable-load treatment',
          'Applicable across municipal and industrial water streams',
        ],
      },
    ],
    image:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    slug: 'impregnated',
    name: 'Impregnated Activated Carbon',
    shortName: 'Impregnated',
    summary:
      'Chemically enhanced coconut shell carbon for targeted gas-stream, bacteriostatic, and specialty purification duties.',
    intro:
      'Impregnation extends standard activated carbon performance so certain contaminants can be removed more effectively and more economically.',
    highlights: [
      'Silver-impregnated carbon supports bacteriostatic protection in drinking-water filters and water systems.',
      'Sulfur-impregnated carbon supports mercury removal in natural gas, air, hydrogen, and other gas streams.',
      'Targeted impregnation supports removal of acid gases, ammonia, amines, and other specialty contaminants.',
    ],
    commonUses: [
      'Gas purification',
      'Civil and military gas protection',
      'Mercury removal',
      'Bacteriostatic drinking-water systems',
    ],
    sections: [
      {
        title: 'Why impregnation changes performance',
        body:
          'Impregnation creates a synergistic interaction between the chemical additive and the carbon substrate so the media can remove compounds that would be difficult for untreated carbon alone.',
      },
      {
        title: 'Water and gas examples',
        body:
          'Silver-impregnated carbon supports point-of-use water filters, while sulfur-impregnated carbon supports mercury capture in gas service. The broader positioning spans gas purification and protective equipment.',
      },
      {
        title: 'Common targets',
        body:
          'This category is the specialty branch of the portfolio, used when a buyer has a contaminant-specific requirement rather than a broad adsorption problem.',
        bullets: [
          'Mercury',
          'Acid gases',
          'Ammonia and amines',
          'Bacterial growth on carbon surfaces',
        ],
      },
    ],
    image:
      'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    slug: 'catalytic',
    name: 'Catalytic Activated Carbon',
    shortName: 'Catalytic',
    summary:
      'Surface-modified coconut shell carbon for chloramine, hydrogen sulfide, and difficult water-treatment contaminants.',
    intro:
      `Catalytic carbon supports chloramine reduction in ${siteConfig.utilityMarketLabel} drinking-water systems moving away from free chlorine.`,
    highlights: [
      'Used for chloramines, hydrogen sulfides, hydrogen peroxides, THMs, TCE, PCE, detergents, pesticides, phenols, and taste and odor compounds.',
      'Surface modification enhances the media’s natural ability to chemically change difficult contaminants.',
      'CATCARB is engineered for water-treatment applications requiring rapid chloramine and H2S decomposition.',
    ],
    commonUses: [
      'Chloramine reduction',
      'Hydrogen sulfide removal',
      'Taste and odor reduction',
      'Specialty water treatment',
    ],
    grades: ['CATCARB catalytic grades'],
    sections: [
      {
        title: 'Why utilities use it',
        body:
          `Many ${siteConfig.utilityMarketLabel} water utilities have transitioned to chloramine as a more stable disinfectant in response to regulatory pressure around disinfection by-products.`,
      },
      {
        title: 'Why standard carbon is not enough',
        body:
          'Standard activated carbon filters sized for chlorine removal have limited capacity for chloramine reduction at normal flow rates, which is where catalytic grades become important.',
      },
      {
        title: 'How CATCARB works',
        body:
          'CATCARB is surface modified, with particle size and pore structure tuned for adsorption while maintaining the hardness, surface area, and attrition resistance associated with high-quality coconut shell carbon.',
        bullets: [
          'Built for chloramine-heavy drinking-water programs',
          'Also suited for hydrogen sulfide decomposition',
          'Strong flagship product for Black Opal’s technical sales story',
        ],
      },
    ],
    image:
      'https://images.unsplash.com/photo-1774789599304-cca1e1ffbb95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRyZWF0bWVudCUyMHBsYW50JTIwaW5kdXN0cmlhbCUyMGZhY2lsaXR5fGVufDF8fHx8MTc3NTQ3NTQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export const applications: ApplicationEntry[] = [
  {
    slug: 'water-treatment',
    name: 'Water Treatment',
    summary:
      'Granular, powder, impregnated, and catalytic grades for drinking water, municipal systems, and wastewater purification.',
    intro:
      'Black Opal supplies activated carbon for drinking water, industrial process water, municipal systems, groundwater remediation, and wastewater polishing.',
    keyPoints: [
      'Activated carbon is an efficient and cost-effective option for industrial and municipal wastewater plus contaminated ground and groundwater.',
      'Coconut shell carbon supports chlorine reduction and adsorption of VOCs, pesticides, solvents, THMs, and other organics.',
      'The water-treatment range includes GAC, PAC, impregnated, acid/water-washed, and specialty catalytic grades.',
    ],
    recommendedProducts: ['granular', 'powder', 'impregnated', 'catalytic'],
    sections: [
      {
        title: 'POU water filters',
        body:
          'Water filters, cartridges, and carbon blocks are among the most widely used water-filtration technologies. Black Opal emphasizes balanced adsorption and pore structure, low ash, high strength, and consistent particle-size distribution.',
        bullets: [
          'NSF 42 positioning',
          'Prop 65 messaging',
          'Silver-impregnated and catalytic options for bacteriostatic and chloramine duties',
        ],
      },
      {
        title: 'Municipal and industrial water',
        body:
          'Municipal and industrial systems use activated carbon for taste, odor, and color removal, plus adsorption of VOCs, pesticides, disinfectant by-products, chlorinated hydrocarbons, and inhibitory compounds.',
      },
      {
        title: 'Wastewater treatment',
        body:
          'Granular carbon supports fixed-bed removal of dissolved non-biodegradable organics, while powder carbon supports sludge-contact treatment programs to improve stability and settling.',
        bullets: [
          'Process effluent',
          'Swimming pools and aquariums',
          'Mercury removal',
          'Groundwater remediation',
          'Pesticide removal',
        ],
      },
    ],
    image:
      'https://images.unsplash.com/photo-1758738880344-373b29019b33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGRyaW5raW5nJTIwd2F0ZXIlMjBnbGFzcyUyMHBvdXJpbmd8ZW58MXx8fHwxNzc1NDc1NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    slug: 'gold-recovery',
    name: 'Gold Recovery',
    summary:
      'Microporous coconut shell carbon grades for CIP, CIC, and tank-adsorbed precious-metal recovery systems.',
    intro:
      'Gold recovery is a specialist performance application where hardness, low platelets, low dust, and adsorption kinetics directly affect metal loading and carbon loss.',
    keyPoints: [
      'GC grades are highly microporous, high-hardness, and built with excellent attrition resistance.',
      'The product range emphasizes very low platelet content, zero dust, and vee-wire screening to keep fines to a minimum.',
      'Black Opal positions itself as a supplier to some of the world’s largest mining companies.',
    ],
    recommendedProducts: ['granular'],
    grades: ['GC E612 Gold Grade', 'GC E816 Gold Grade'],
    sections: [
      {
        title: 'Recovery systems',
        body:
          'GC grades are built for Carbon-in-Pulp, Carbon-in-Column, and tank-adsorbed systems where adsorption of metal and cyanide complexes has to happen quickly and cleanly.',
      },
      {
        title: 'Why the carbon is tuned this way',
        body:
          'The particle size and pore structure are engineered for precious-metal adsorption while maintaining the hardness needed to resist attrition in mining circuits.',
      },
      {
        title: 'Operating advantages',
        body:
          'Buyers specify these grades for durability, adsorption performance, and clean operation in recovery circuits.',
        bullets: [
          'Superior hardness to minimize attrition loss and dust',
          'Higher gold adsorption capacities for maximum loading',
          'Excellent gold adsorption rates for high throughput',
        ],
      },
    ],
    image:
      'https://images.unsplash.com/photo-1662251773377-104e93441427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwbWluaW5nJTIwb3BlcmF0aW9uJTIwbWFjaGluZXJ5JTIwZXh0cmFjdGlvbnxlbnwxfHx8fDE3NzU0NzU0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    slug: 'air-gas',
    name: 'Air & Gas',
    summary:
      'Coconut shell and impregnated grades for indoor air quality, protection equipment, flue gas, and odor control.',
    intro:
      'Air and gas purification depends on hardness and retentivity, making coconut shell carbon a strong base media for demanding filtration duties.',
    keyPoints: [
      'Air filtration requires excellent hardness and high retentivity.',
      'Coconut shell carbon fits air and gas service because of its microporous structure and toughness.',
      'Both standard and impregnated grades are suited for industrial and protective environments.',
    ],
    recommendedProducts: ['impregnated', 'granular'],
    sections: [
      {
        title: 'Protective equipment',
        body:
          'Respirators and gas masks containing IndoCarb VP granular activated carbon filters provide protection against acid gases, organic vapors, ammonia, mercury vapor, formaldehyde, and radioactive iodides.',
      },
      {
        title: 'Industrial and environmental filtration',
        body:
          'Air and gas applications include filters and adsorbers for indoor air quality, cabin air filtration, emission control, odor control, mines, chemical facilities, nuclear power stations, and manufacturing plants.',
      },
      {
        title: 'Named application areas',
        body:
          'Common use cases for this category include:',
        bullets: [
          'Cabin air filtration',
          'Protection equipment including gas masks',
          'Indoor air quality',
          'Treatment of flue gas',
          'Emission and odor control',
        ],
      },
    ],
    image:
      'https://images.unsplash.com/photo-1759646827242-cf09e30709aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXIlMjBmaWx0cmF0aW9uJTIwc3lzdGVtJTIwaW5kdXN0cmlhbCUyMHZlbnRpbGF0aW9ufGVufDF8fHx8MTc3NTQ3NTQ4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    slug: 'oil-gas',
    name: 'Oil & Gas',
    summary:
      'Activated carbon for vapor recovery, H2S removal, condensate polishing, and low-silica boiler-feed protection.',
    intro:
      'Oil and gas applications include refinery vapor recovery, hydrogen sulfide removal, and high-purity condensate boiler-feed water treatment.',
    keyPoints: [
      'Activated carbon adsorbs gasoline vapors, benzene, solvents, and hydrogen sulfide during refining.',
      'Condensate polishing helps protect ion-exchange resins and sensitive equipment.',
      'A major performance claim is extremely low silica leaching and nil ash for refinery water service.',
    ],
    recommendedProducts: ['granular', 'impregnated'],
    grades: ['Petro Grade'],
    sections: [
      {
        title: 'Refinery recovery and gas cleanup',
        body:
          'Activated carbon supports recovery of economically valuable vapors and removal of hydrogen sulfide during oil refining.',
      },
      {
        title: 'Condensate and boiler-feed water',
        body:
          'Black Opal emphasizes treated activated carbons that remove contaminants, de-oil condensate, and protect downstream ion-exchange resins, boiler tubes, and turbine blades from fouling and deterioration.',
      },
      {
        title: 'Operating advantages',
        body:
          'Refinery buyers typically prioritize these performance qualities.',
        bullets: [
          'Lowest level of silica leaching',
          'Low ash content and nil dust',
          'No pre-washing of filter beds required',
          'High hardness and attrition resistance',
        ],
      },
    ],
    image:
      'https://images.unsplash.com/photo-1614377493833-7f92e84773ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvaWwlMjBnYXMlMjByZWZpbmVyeSUyMHBpcGVzJTIwc3RlZWx8ZW58MXx8fHwxNzc1NDc1NDg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    slug: 'catalytic-carbon',
    name: 'Catalytic / Chloramine Removal',
    summary:
      'Specialty catalytic carbon for chloramine decomposition and hydrogen sulfide control in drinking-water systems.',
    intro:
      'Utilities are switching to chloramine, and catalytic activated carbon is the correct point-of-use or treatment response when standard chlorine carbon is not enough.',
    keyPoints: [
      'Chloramine adoption is tied to regulatory pressure on disinfection by-products formed by free chlorine and organics.',
      'Chloramine is more stable than chlorine but harder to remove with standard carbon products.',
      'CATCARB grades are specially developed for water-treatment applications needing faster decomposition performance.',
    ],
    recommendedProducts: ['catalytic'],
    grades: ['CATCARB'],
    sections: [
      {
        title: 'Why the market is changing',
        body:
          `Many ${siteConfig.utilityMarketLabel} water utilities are transitioning to chloramine disinfection, which changes the treatment requirements downstream for residential, commercial, and municipal filtration systems.`,
      },
      {
        title: 'Why catalytic carbon matters',
        body:
          'Standard granular activated carbon and carbon blocks have limited chloramine capacity at typical flow rates, which is why catalytic media is recommended instead.',
      },
      {
        title: 'How CATCARB works',
        body:
          'The CATCARB range is surface modified to rapidly decompose chloramine and hydrogen sulfide while retaining the hardness, surface area, and attrition resistance expected from high-quality coconut shell carbon.',
      },
    ],
    image:
      'https://images.unsplash.com/photo-1774789599304-cca1e1ffbb95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRyZWF0bWVudCUyMHBsYW50JTIwaW5kdXN0cmlhbCUyMGZhY2lsaXR5fGVufDF8fHx8MTc3NTQ3NTQ4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    slug: 'other-applications',
    name: 'Other Applications',
    summary:
      'Specialty grades for solvent recovery, food and beverage purification, edible oil, and related industrial processes.',
    intro:
      'Black Opal supplies specialty grades for solvent recovery plus food and beverage purification work beyond the main water, mining, gas, and refinery categories.',
    keyPoints: [
      'Solvent recovery supports printing, dry cleaning, and paint applications.',
      'Food and beverage applications focus on taste and odor control, CO2 purification, and edible-oil decolorization.',
      'Granular, extruded, and food-grade powder carbons support different process requirements.',
    ],
    recommendedProducts: ['granular', 'powder', 'impregnated'],
    sections: [
      {
        title: 'Solvent recovery',
        body:
          'Activated carbon adsorbs vaporized solvents from the exhaust air and then releases them during regeneration with hot steam or inert gas so the recovered solvent can be reused.',
      },
      {
        title: 'Food and beverages',
        body:
          'Activated carbon removes undesired odor and taste from beverages and edible oils, purifies brewery CO2, and removes residual disinfectants including chlorine, chloramines, and THMs.',
      },
      {
        title: 'Grades and outputs',
        body:
          'Specialty applications require application-matched activity levels, desorption characteristics, filtration performance, and purity instead of a one-size-fits-all carbon grade.',
        bullets: [
          'Solvent Recovery Grade',
          'Edible Oil Grade',
          'Food-grade powdered carbon',
        ],
      },
    ],
    image:
      'https://images.unsplash.com/photo-1554070211-e3953a3de374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbWFudWZhY3R1cmluZyUyMHdhcmVob3VzZSUyMGZhY2RvcnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzU0NzU0ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export const newsroomItems: NewsroomItem[] = [
  {
    slug: 'name-change-press-release',
    title: 'Name Change Press Release',
    type: 'press-release',
    summary:
      'Black Opal announced the completion of its transition from INDOCARB AC to Black Opal Carbons as part of a broader global branding effort.',
    detail: [
      `The transition process announced in 2019 moved toward completion with the ${siteConfig.marketName} brand operating under the Black Opal Carbons name.`,
      `The new name better reflects the product portfolio and aligns the ${siteConfig.marketName} business with the wider group, including manufacturing and export operations in South India.`,
      'Core operating elements remained the same: products, factory, address, facilities, pricing, support procedures, and day-to-day contacts.',
      'The announcement also covered expanded production capacity, additional sales and customer-service resources, and new specialty-product offerings.',
    ],
    bullets: [
      'Former name: INDOCARB AC',
      'Transition initiated in 2019',
      `Contact listed in release: ${companyDetails.infoEmail}`,
    ],
  },
  {
    slug: 'catalytic-carbon-resource',
    title: 'Catalytic Carbon',
    type: 'resource',
    summary:
      'Technical notes on catalytic activated carbon performance, chloramine reduction, and specialty water-treatment use cases.',
  },
  {
    slug: 'gold-grade-carbon-resource',
    title: 'Gold Grade Carbon',
    type: 'resource',
    summary:
      'Grade context for CIP, CIC, and tank-adsorbed precious-metal recovery systems where hardness and adsorption kinetics matter.',
  },
  {
    slug: 'powerpoint-presentation-resource',
    title: 'PowerPoint Presentation',
    type: 'resource',
    summary:
      'Company presentation material for procurement reviews and sales discussions.',
  },
  {
    slug: 'water-treatment-resource',
    title: 'Water Treatment',
    type: 'resource',
    summary:
      'Water-treatment context for drinking water, process water, wastewater polishing, and contaminant-specific grade selection.',
  },
  {
    slug: 'pou-filter-carbon-resource',
    title: 'POU Filter Carbon',
    type: 'resource',
    summary:
      'Point-of-use filter guidance for balanced adsorption, low ash, high strength, and consistent particle-size distribution.',
  },
];

export const productMap = Object.fromEntries(products.map((product) => [product.slug, product])) as Record<
  string,
  ProductEntry
>;

export const applicationMap = Object.fromEntries(
  applications.map((application) => [application.slug, application]),
) as Record<string, ApplicationEntry>;

export const newsroomMap = Object.fromEntries(newsroomItems.map((item) => [item.slug, item])) as Record<
  string,
  NewsroomItem
>;
