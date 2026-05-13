type Office = {
  label: string;
  name: string;
  address: string[];
  phone?: string;
  email?: string;
  note?: string;
};

type Headquarters = {
  name: string;
  line1: string;
  line2: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
  countryCode: string;
};

const DEFAULT_SITE_URL = 'https://black-opal-india.vercel.app';
const DEFAULT_SITE_NAME = 'Black Opal Carbons';
const GROUP_HEADQUARTERS_LABEL = 'Black Opal Group Head Quarters';
const DEFAULT_DESCRIPTION =
  'Black Opal Carbons supplies coconut shell activated carbon manufactured and exported from India for water treatment, gold recovery, air and gas purification, oil and gas, and industrial applications.';
const runtimeEnv: Record<string, string | undefined> = {
  VITE_SITE_ID: process.env.NEXT_PUBLIC_SITE_ID ?? process.env.VITE_SITE_ID,
  VITE_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VITE_SITE_URL,
  VITE_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME ?? process.env.VITE_SITE_NAME,
  VITE_HOME_TITLE: process.env.NEXT_PUBLIC_HOME_TITLE ?? process.env.VITE_HOME_TITLE,
  VITE_SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION ?? process.env.VITE_SITE_DESCRIPTION,
  VITE_ORIGIN_STATEMENT: process.env.NEXT_PUBLIC_ORIGIN_STATEMENT ?? process.env.VITE_ORIGIN_STATEMENT,
  VITE_ORIGIN_DESCRIPTION: process.env.NEXT_PUBLIC_ORIGIN_DESCRIPTION ?? process.env.VITE_ORIGIN_DESCRIPTION,
  VITE_HERO_KICKER: process.env.NEXT_PUBLIC_HERO_KICKER ?? process.env.VITE_HERO_KICKER,
  VITE_HERO_TITLE: process.env.NEXT_PUBLIC_HERO_TITLE ?? process.env.VITE_HERO_TITLE,
  VITE_HERO_DESCRIPTION: process.env.NEXT_PUBLIC_HERO_DESCRIPTION ?? process.env.VITE_HERO_DESCRIPTION,
  VITE_HERO_LOCATION_PROOF: process.env.NEXT_PUBLIC_HERO_LOCATION_PROOF ?? process.env.VITE_HERO_LOCATION_PROOF,
  VITE_REGION_LABEL: process.env.NEXT_PUBLIC_REGION_LABEL ?? process.env.VITE_REGION_LABEL,
  VITE_SERVICE_AREA: process.env.NEXT_PUBLIC_SERVICE_AREA ?? process.env.VITE_SERVICE_AREA,
  VITE_MARKET_NAME: process.env.NEXT_PUBLIC_MARKET_NAME ?? process.env.VITE_MARKET_NAME,
  VITE_UTILITY_MARKET_LABEL: process.env.NEXT_PUBLIC_UTILITY_MARKET_LABEL ?? process.env.VITE_UTILITY_MARKET_LABEL,
  VITE_HEADQUARTERS_NAME: process.env.NEXT_PUBLIC_HEADQUARTERS_NAME ?? process.env.VITE_HEADQUARTERS_NAME,
  VITE_HEADQUARTERS_LABEL: process.env.NEXT_PUBLIC_HEADQUARTERS_LABEL ?? process.env.VITE_HEADQUARTERS_LABEL,
  VITE_HEADQUARTERS_DESCRIPTOR:
    process.env.NEXT_PUBLIC_HEADQUARTERS_DESCRIPTOR ?? process.env.VITE_HEADQUARTERS_DESCRIPTOR,
  VITE_ADDRESS_LINE_1: process.env.NEXT_PUBLIC_ADDRESS_LINE_1 ?? process.env.VITE_ADDRESS_LINE_1,
  VITE_ADDRESS_LINE_2: process.env.NEXT_PUBLIC_ADDRESS_LINE_2 ?? process.env.VITE_ADDRESS_LINE_2,
  VITE_ADDRESS_LOCALITY: process.env.NEXT_PUBLIC_ADDRESS_LOCALITY ?? process.env.VITE_ADDRESS_LOCALITY,
  VITE_ADDRESS_REGION: process.env.NEXT_PUBLIC_ADDRESS_REGION ?? process.env.VITE_ADDRESS_REGION,
  VITE_POSTAL_CODE: process.env.NEXT_PUBLIC_POSTAL_CODE ?? process.env.VITE_POSTAL_CODE,
  VITE_ADDRESS_COUNTRY: process.env.NEXT_PUBLIC_ADDRESS_COUNTRY ?? process.env.VITE_ADDRESS_COUNTRY,
  VITE_ADDRESS_COUNTRY_CODE: process.env.NEXT_PUBLIC_ADDRESS_COUNTRY_CODE ?? process.env.VITE_ADDRESS_COUNTRY_CODE,
  VITE_PHONE_DISPLAY: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? process.env.VITE_PHONE_DISPLAY,
  VITE_PHONE_HREF: process.env.NEXT_PUBLIC_PHONE_HREF ?? process.env.VITE_PHONE_HREF,
  VITE_FAX: process.env.NEXT_PUBLIC_FAX ?? process.env.VITE_FAX,
  VITE_INFO_EMAIL: process.env.NEXT_PUBLIC_INFO_EMAIL ?? process.env.VITE_INFO_EMAIL,
  VITE_SALES_EMAIL: process.env.NEXT_PUBLIC_SALES_EMAIL ?? process.env.VITE_SALES_EMAIL,
  VITE_MARKET_BASE_TITLE: process.env.NEXT_PUBLIC_MARKET_BASE_TITLE ?? process.env.VITE_MARKET_BASE_TITLE,
  VITE_MARKET_BASE_DESCRIPTION:
    process.env.NEXT_PUBLIC_MARKET_BASE_DESCRIPTION ?? process.env.VITE_MARKET_BASE_DESCRIPTION,
  VITE_COMPANY_EYEBROW: process.env.NEXT_PUBLIC_COMPANY_EYEBROW ?? process.env.VITE_COMPANY_EYEBROW,
  VITE_COMPANY_TITLE: process.env.NEXT_PUBLIC_COMPANY_TITLE ?? process.env.VITE_COMPANY_TITLE,
  VITE_COMPANY_BODY_PRIMARY: process.env.NEXT_PUBLIC_COMPANY_BODY_PRIMARY ?? process.env.VITE_COMPANY_BODY_PRIMARY,
  VITE_COMPANY_BODY_SECONDARY:
    process.env.NEXT_PUBLIC_COMPANY_BODY_SECONDARY ?? process.env.VITE_COMPANY_BODY_SECONDARY,
  VITE_CONTACT_TITLE: process.env.NEXT_PUBLIC_CONTACT_TITLE ?? process.env.VITE_CONTACT_TITLE,
  VITE_CONTACT_DESCRIPTION: process.env.NEXT_PUBLIC_CONTACT_DESCRIPTION ?? process.env.VITE_CONTACT_DESCRIPTION,
  VITE_ADDITIONAL_OFFICES_TITLE:
    process.env.NEXT_PUBLIC_ADDITIONAL_OFFICES_TITLE ?? process.env.VITE_ADDITIONAL_OFFICES_TITLE,
  VITE_LOGISTICS_SUMMARY: process.env.NEXT_PUBLIC_LOGISTICS_SUMMARY ?? process.env.VITE_LOGISTICS_SUMMARY,
  VITE_PRODUCTION_CENTER_COUNT:
    process.env.NEXT_PUBLIC_PRODUCTION_CENTER_COUNT ?? process.env.VITE_PRODUCTION_CENTER_COUNT,
  VITE_ADDITIONAL_OFFICES_JSON:
    process.env.NEXT_PUBLIC_ADDITIONAL_OFFICES_JSON ?? process.env.VITE_ADDITIONAL_OFFICES_JSON,
  VITE_LEGACY_NAME: process.env.NEXT_PUBLIC_LEGACY_NAME ?? process.env.VITE_LEGACY_NAME,
};

function envValue(name: string, fallback: string) {
  const value = runtimeEnv[name] as string | undefined;
  return value?.trim() || fallback;
}

function normalizeHeadquartersCopy(value: string) {
  return value.replace(/\b(?:the\s+)?U\.S\. headquarters\b/gi, GROUP_HEADQUARTERS_LABEL);
}

function officeKind(office: Office) {
  const text = `${office.label} ${office.name} ${office.address.join(' ')}`.toLowerCase();

  if (/head\s*quarters|headquarters/.test(text)) {
    return 'headquarters';
  }

  if (text.includes('middle east') || text.includes('abu dhabi') || text.includes('uae')) {
    return 'middleEast';
  }

  if (text.includes('india') || text.includes('kerala') || text.includes('aluva')) {
    return 'india';
  }

  return 'other';
}

function orderOfficeNetwork(offices: Office[], activeSiteId: string) {
  const preferredOrder =
    activeSiteId === 'black-opal-middle-east'
      ? ['middleEast', 'india', 'other', 'headquarters']
      : ['india', 'middleEast', 'other', 'headquarters'];

  return offices
    .map((office, index) => ({ office, index, priority: preferredOrder.indexOf(officeKind(office)) }))
    .sort((a, b) => {
      const aPriority = a.priority === -1 ? preferredOrder.length : a.priority;
      const bPriority = b.priority === -1 ? preferredOrder.length : b.priority;

      return aPriority - bPriority || a.index - b.index;
    })
    .map(({ office }) => office);
}

function optionalEnvValue(name: string, fallback = '') {
  const value = runtimeEnv[name] as string | undefined;
  return value?.trim() || fallback;
}

function phoneHref(phoneDisplay: string) {
  const sanitized = phoneDisplay.replace(/[^\d+]/g, '');
  return sanitized ? `tel:${sanitized}` : '';
}

function parseOffices(value: string | undefined): Office[] | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(value) as Office[];

    if (
      Array.isArray(parsed) &&
      parsed.every(
        (office) =>
          typeof office?.label === 'string' &&
          typeof office.name === 'string' &&
          Array.isArray(office.address) &&
          office.address.every((line) => typeof line === 'string') &&
          (office.phone === undefined || typeof office.phone === 'string') &&
          (office.email === undefined || typeof office.email === 'string') &&
          (office.note === undefined || typeof office.note === 'string'),
      )
    ) {
      return parsed;
    }
  } catch {
    // Invalid optional deployment config should not break rendering.
  }

  return undefined;
}

const siteName = envValue('VITE_SITE_NAME', DEFAULT_SITE_NAME);
const siteUrl = envValue('VITE_SITE_URL', DEFAULT_SITE_URL).replace(/\/+$/, '');
const siteId = envValue('VITE_SITE_ID', 'black-opal-india');
const regionLabel = envValue('VITE_REGION_LABEL', 'U.S.');
const serviceArea = envValue('VITE_SERVICE_AREA', 'US');
const marketName = envValue('VITE_MARKET_NAME', 'North American');
const utilityMarketLabel = envValue('VITE_UTILITY_MARKET_LABEL', regionLabel);
const originStatement = envValue('VITE_ORIGIN_STATEMENT', 'Manufactured and exported from India');
const originDescription = envValue(
  'VITE_ORIGIN_DESCRIPTION',
  'coconut shell activated carbon manufactured and exported from India',
);

const headquarters: Headquarters = {
  name: envValue('VITE_HEADQUARTERS_NAME', siteName),
  line1: envValue('VITE_ADDRESS_LINE_1', '651 Holiday Dr, STE 400'),
  line2: envValue('VITE_ADDRESS_LINE_2', 'Pittsburgh, PA 15220, USA'),
  locality: envValue('VITE_ADDRESS_LOCALITY', 'Pittsburgh'),
  region: envValue('VITE_ADDRESS_REGION', 'PA'),
  postalCode: envValue('VITE_POSTAL_CODE', '15220'),
  country: envValue('VITE_ADDRESS_COUNTRY', 'United States'),
  countryCode: envValue('VITE_ADDRESS_COUNTRY_CODE', 'US'),
};

const phoneDisplay = envValue('VITE_PHONE_DISPLAY', '+1 (412) 928-4970');
const fax = optionalEnvValue('VITE_FAX', '+1 (412) 365-5634');
const infoEmail = envValue('VITE_INFO_EMAIL', 'info@blackopalcarbons.com');
const salesEmail = envValue('VITE_SALES_EMAIL', 'sales@blackopalcarbons.com');
const defaultAdditionalOffices: Office[] = [
  {
    label: 'India office',
    name: 'Black Opal Private Limited',
    address: ['XV/100, Nr. DYSP office', 'Kalathil Road, Aluva, Kerala, India'],
    phone: '+91 9995994799',
    email: 'info@blackopal.co.in',
    note: 'Manufacturing and export coordination for coconut shell activated carbon from India.',
  },
  {
    label: 'Middle East office',
    name: 'Black Opal Carbons',
    address: ['Smart Station, 1st Floor, Incubator Bldg. I Masdar City', 'Abu Dhabi, UAE'],
    phone: '+971 50 240 4708',
    email: 'info@blackopalcarbonsme.com',
    note: 'Regional office for Middle East customer coordination.',
  },
];
const additionalOffices = parseOffices(runtimeEnv.VITE_ADDITIONAL_OFFICES_JSON) ?? defaultAdditionalOffices;
const defaultLogisticsSummary =
  'Company-owned manufacturing, 35000 metric tons annual capacity, and final quality assurance before shipment support consistent coconut activated carbon supply.';
const headquartersLabel = normalizeHeadquartersCopy(envValue('VITE_HEADQUARTERS_LABEL', GROUP_HEADQUARTERS_LABEL));
const headquartersDescriptor = normalizeHeadquartersCopy(
  envValue('VITE_HEADQUARTERS_DESCRIPTOR', GROUP_HEADQUARTERS_LABEL),
);
const marketBaseTitle = envValue('VITE_MARKET_BASE_TITLE', 'Manufacturing base and office network');
const marketBaseDescription = normalizeHeadquartersCopy(
  envValue(
    'VITE_MARKET_BASE_DESCRIPTION',
    "Black Opal's state-of-the-art factory in India anchors 35000 metric tons of annual coconut activated carbon capacity. Black Opal Group Head Quarters, India office, and Middle East office keep customers connected to the team for enquiries, technical support, and service.",
  ),
);
const normalizedRegion = regionLabel.toLowerCase().replace(/[^a-z0-9]/g, '');
const regionalContact = additionalOffices.find((office) =>
  office.label.toLowerCase().replace(/[^a-z0-9]/g, '').includes(normalizedRegion),
);
const websiteContact: Office = regionalContact ?? {
  label: headquartersLabel,
  name: headquarters.name,
  address: [headquarters.line1, headquarters.line2],
  phone: phoneDisplay,
  email: infoEmail,
};
const officeNetwork = orderOfficeNetwork(
  [
    ...additionalOffices,
    {
      label: headquartersLabel,
      name: headquarters.name,
      address: [headquarters.line1, headquarters.line2],
      phone: phoneDisplay,
      email: infoEmail,
    },
  ],
  siteId,
);

export const siteConfig = {
  siteName,
  siteUrl,
  siteId,
  homeTitle: envValue('VITE_HOME_TITLE', `Coconut Shell Activated Carbon Supplier | ${siteName}`),
  defaultDescription: envValue('VITE_SITE_DESCRIPTION', DEFAULT_DESCRIPTION.replace(DEFAULT_SITE_NAME, siteName)),
  defaultImagePath: '/og-image.svg',
  heroKicker: envValue('VITE_HERO_KICKER', 'NSF 42 / NSF 61 CERTIFIED - PROP 65 COMPLIANT'),
  heroTitle: envValue(
    'VITE_HERO_TITLE',
    'Coconut Shell Activated Carbon for Water, Air, Gas & Industrial Applications',
  ),
  heroDescription: envValue(
    'VITE_HERO_DESCRIPTION',
    `${originStatement}, Black Opal coconut shell activated carbon supports demanding water, air, gas, gold recovery, and industrial purification systems.`,
  ),
  originStatement,
  originDescription,
  heroLocationProof: envValue(
    'VITE_HERO_LOCATION_PROOF',
    'India Manufacturing + Export Support',
  ),
  companyEyebrow: envValue('VITE_COMPANY_EYEBROW', 'Our Company'),
  companyTitle: envValue('VITE_COMPANY_TITLE', 'Controlled from coconut shell selection to final shipment'),
  companyBodyPrimary: envValue(
    'VITE_COMPANY_BODY_PRIMARY',
    'Black Opal works from selected coconut shell feedstock through controlled activation, sizing, and final quality checks so each grade is built for repeatable adsorption performance.',
  ),
  companyBodySecondary: envValue(
    'VITE_COMPANY_BODY_SECONDARY',
    'Grades can be customised by mesh size, adsorption level, pH adjustment, washing, and impregnation requirements instead of forcing every application into the same carbon.',
  ),
  contactTitle: envValue('VITE_CONTACT_TITLE', 'Pricing, availability, and technical recommendations'),
  contactDescription: envValue(
    'VITE_CONTACT_DESCRIPTION',
    `Grade matching, availability, and logistics coordination start with the application conditions and expected volume.`,
  ),
  additionalOfficesTitle: envValue('VITE_ADDITIONAL_OFFICES_TITLE', 'Office network'),
  regionLabel,
  serviceArea,
  marketName,
  utilityMarketLabel,
  productionCenterCount: envValue('VITE_PRODUCTION_CENTER_COUNT', '3'),
  logisticsSummary: optionalEnvValue(
    'VITE_LOGISTICS_SUMMARY',
    defaultLogisticsSummary,
  ),
};

export const companyDetails = {
  legacyName: optionalEnvValue('VITE_LEGACY_NAME', 'INDOCARB AC'),
  headquarters,
  headquartersLabel,
  headquartersDescriptor,
  marketBaseTitle,
  marketBaseDescription,
  phoneDisplay,
  phoneHref: envValue('VITE_PHONE_HREF', phoneHref(phoneDisplay)),
  fax,
  infoEmail,
  salesEmail,
  additionalOffices,
  officeNetwork,
  websiteContact,
};

export { siteUrl };
