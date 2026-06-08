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

const DEFAULT_SITE_URL = 'https://www.blackopalcarbonsme.com';
const DEFAULT_SITE_NAME = 'Black Opal Private Limited';
const GROUP_HEADQUARTERS_LABEL = 'Black Opal Group Head Quarters';
const DEFAULT_DESCRIPTION =
  'Black Opal Private Limited manufactures and exports coconut shell activated carbon from India for water treatment, gold recovery, air and gas purification, and industrial applications across global export markets.';
const runtimeEnv: Record<string, string | undefined> = {
  SITE_ID: process.env.NEXT_PUBLIC_SITE_ID,
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  HOME_TITLE: process.env.NEXT_PUBLIC_HOME_TITLE,
  SITE_DESCRIPTION: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
  ORIGIN_STATEMENT: process.env.NEXT_PUBLIC_ORIGIN_STATEMENT,
  ORIGIN_DESCRIPTION: process.env.NEXT_PUBLIC_ORIGIN_DESCRIPTION,
  HERO_KICKER: process.env.NEXT_PUBLIC_HERO_KICKER,
  HERO_TITLE: process.env.NEXT_PUBLIC_HERO_TITLE,
  HERO_DESCRIPTION: process.env.NEXT_PUBLIC_HERO_DESCRIPTION,
  HERO_LOCATION_PROOF: process.env.NEXT_PUBLIC_HERO_LOCATION_PROOF,
  REGION_LABEL: process.env.NEXT_PUBLIC_REGION_LABEL,
  SERVICE_AREA: process.env.NEXT_PUBLIC_SERVICE_AREA,
  MARKET_NAME: process.env.NEXT_PUBLIC_MARKET_NAME,
  UTILITY_MARKET_LABEL: process.env.NEXT_PUBLIC_UTILITY_MARKET_LABEL,
  HEADQUARTERS_NAME: process.env.NEXT_PUBLIC_HEADQUARTERS_NAME,
  HEADQUARTERS_LABEL: process.env.NEXT_PUBLIC_HEADQUARTERS_LABEL,
  HEADQUARTERS_DESCRIPTOR:
    process.env.NEXT_PUBLIC_HEADQUARTERS_DESCRIPTOR,
  ADDRESS_LINE_1: process.env.NEXT_PUBLIC_ADDRESS_LINE_1,
  ADDRESS_LINE_2: process.env.NEXT_PUBLIC_ADDRESS_LINE_2,
  ADDRESS_LOCALITY: process.env.NEXT_PUBLIC_ADDRESS_LOCALITY,
  ADDRESS_REGION: process.env.NEXT_PUBLIC_ADDRESS_REGION,
  POSTAL_CODE: process.env.NEXT_PUBLIC_POSTAL_CODE,
  ADDRESS_COUNTRY: process.env.NEXT_PUBLIC_ADDRESS_COUNTRY,
  ADDRESS_COUNTRY_CODE: process.env.NEXT_PUBLIC_ADDRESS_COUNTRY_CODE,
  PHONE_DISPLAY: process.env.NEXT_PUBLIC_PHONE_DISPLAY,
  PHONE_HREF: process.env.NEXT_PUBLIC_PHONE_HREF,
  FAX: process.env.NEXT_PUBLIC_FAX,
  INFO_EMAIL: process.env.NEXT_PUBLIC_INFO_EMAIL,
  SALES_EMAIL: process.env.NEXT_PUBLIC_SALES_EMAIL,
  MARKET_BASE_TITLE: process.env.NEXT_PUBLIC_MARKET_BASE_TITLE,
  MARKET_BASE_DESCRIPTION:
    process.env.NEXT_PUBLIC_MARKET_BASE_DESCRIPTION,
  COMPANY_EYEBROW: process.env.NEXT_PUBLIC_COMPANY_EYEBROW,
  COMPANY_TITLE: process.env.NEXT_PUBLIC_COMPANY_TITLE,
  COMPANY_BODY_PRIMARY: process.env.NEXT_PUBLIC_COMPANY_BODY_PRIMARY,
  COMPANY_BODY_SECONDARY:
    process.env.NEXT_PUBLIC_COMPANY_BODY_SECONDARY,
  CONTACT_TITLE: process.env.NEXT_PUBLIC_CONTACT_TITLE,
  CONTACT_DESCRIPTION: process.env.NEXT_PUBLIC_CONTACT_DESCRIPTION,
  ADDITIONAL_OFFICES_TITLE:
    process.env.NEXT_PUBLIC_ADDITIONAL_OFFICES_TITLE,
  LOGISTICS_SUMMARY: process.env.NEXT_PUBLIC_LOGISTICS_SUMMARY,
  PRODUCTION_CENTER_COUNT:
    process.env.NEXT_PUBLIC_PRODUCTION_CENTER_COUNT,
  ADDITIONAL_OFFICES_JSON:
    process.env.NEXT_PUBLIC_ADDITIONAL_OFFICES_JSON,
  LEGACY_NAME: process.env.NEXT_PUBLIC_LEGACY_NAME,
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

function dedupeOffices(offices: Office[]) {
  const seen = new Set<string>();

  return offices.filter((office) => {
    const signature = `${office.label}|${office.name}|${office.address.join('|')}`.toLowerCase();
    if (seen.has(signature)) {
      return false;
    }

    seen.add(signature);
    return true;
  });
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

const siteName = envValue('SITE_NAME', DEFAULT_SITE_NAME);
const siteUrl = envValue('SITE_URL', DEFAULT_SITE_URL).replace(/\/+$/, '');
const siteId = envValue('SITE_ID', 'black-opal-india');
const regionLabel = envValue('REGION_LABEL', 'India');
const serviceArea = envValue('SERVICE_AREA', 'Global export markets');
const marketName = envValue('MARKET_NAME', 'global export markets');
const utilityMarketLabel = envValue('UTILITY_MARKET_LABEL', regionLabel);
const originStatement = envValue('ORIGIN_STATEMENT', 'Manufactured and exported from India');
const originDescription = envValue(
  'ORIGIN_DESCRIPTION',
  'coconut shell activated carbon manufactured and exported from India',
);

const headquarters: Headquarters = {
  name: envValue('HEADQUARTERS_NAME', siteName),
  line1: envValue('ADDRESS_LINE_1', 'XV/100, Nr. DYSP office'),
  line2: envValue('ADDRESS_LINE_2', 'Kalathil Road, Aluva, Kerala, India'),
  locality: envValue('ADDRESS_LOCALITY', 'Aluva'),
  region: envValue('ADDRESS_REGION', 'Kerala'),
  postalCode: envValue('POSTAL_CODE', '683101'),
  country: envValue('ADDRESS_COUNTRY', 'India'),
  countryCode: envValue('ADDRESS_COUNTRY_CODE', 'IN'),
};

const phoneDisplay = envValue('PHONE_DISPLAY', '+91 9995994799');
const fax = optionalEnvValue('FAX');
const infoEmail = envValue('INFO_EMAIL', 'info@blackopal.co.in');
const salesEmail = envValue('SALES_EMAIL', 'info@blackopal.co.in');
const groupHeadquartersOffice: Office = {
  label: GROUP_HEADQUARTERS_LABEL,
  name: 'Black Opal Carbons',
  address: ['651 Holiday Dr, STE 400', 'Pittsburgh, PA 15220, USA'],
  phone: '+1 (412) 928-4970',
  email: 'info@blackopalcarbons.com',
};
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
  groupHeadquartersOffice,
];
const additionalOffices = parseOffices(runtimeEnv.ADDITIONAL_OFFICES_JSON) ?? defaultAdditionalOffices;
const defaultLogisticsSummary =
  'Company-owned manufacturing, 35000 metric tons annual capacity, and final quality assurance before shipment support consistent coconut activated carbon supply.';
const headquartersLabel = normalizeHeadquartersCopy(envValue('HEADQUARTERS_LABEL', GROUP_HEADQUARTERS_LABEL));
const headquartersDescriptor = normalizeHeadquartersCopy(
  envValue('HEADQUARTERS_DESCRIPTOR', GROUP_HEADQUARTERS_LABEL),
);
const marketBaseTitle = envValue('MARKET_BASE_TITLE', 'Manufacturing base and office network');
const marketBaseDescription = normalizeHeadquartersCopy(
  envValue(
    'MARKET_BASE_DESCRIPTION',
    "Black Opal's state-of-the-art factory in India anchors 35000 metric tons of annual coconut activated carbon capacity. Black Opal Group Head Quarters, India office, and Middle East office keep customers connected to the team for enquiries, technical support, and service.",
  ),
);
const configuredContact: Office = {
  label: headquartersLabel,
  name: headquarters.name,
  address: [headquarters.line1, headquarters.line2],
  phone: phoneDisplay,
  email: infoEmail,
};
const normalizedRegion = regionLabel.toLowerCase().replace(/[^a-z0-9]/g, '');
const regionalContact = additionalOffices.find((office) =>
  office.label.toLowerCase().replace(/[^a-z0-9]/g, '').includes(normalizedRegion),
);
const configuredContactMatchesRegion =
  normalizedRegion && officeKind(configuredContact).toLowerCase().includes(normalizedRegion);
const websiteContact: Office = configuredContactMatchesRegion ? configuredContact : regionalContact ?? configuredContact;
const officeNetwork = orderOfficeNetwork(
  dedupeOffices([
    configuredContact,
    ...additionalOffices,
    groupHeadquartersOffice,
  ]),
  siteId,
);

export const siteConfig = {
  siteName,
  siteUrl,
  siteId,
  homeTitle: envValue('HOME_TITLE', `Coconut Shell Activated Carbon Supplier | ${siteName}`),
  defaultDescription: envValue('SITE_DESCRIPTION', DEFAULT_DESCRIPTION.replace(DEFAULT_SITE_NAME, siteName)),
  defaultImagePath: '/og-image.svg',
  heroKicker: envValue('HERO_KICKER', 'NSF 42 / NSF 61 CERTIFIED - PROP 65 COMPLIANT'),
  heroTitle: envValue(
    'HERO_TITLE',
    'Coconut Shell Activated Carbon for Water, Air, Gas & Industrial Applications',
  ),
  heroDescription: envValue(
    'HERO_DESCRIPTION',
    `${originStatement}, Black Opal manufactures coconut shell activated carbon for global water treatment, air and gas purification, gold recovery, oil and gas, and specialty purification systems.`,
  ),
  originStatement,
  originDescription,
  heroLocationProof: envValue(
    'HERO_LOCATION_PROOF',
    'India Manufacturing + Export Support',
  ),
  companyEyebrow: envValue('COMPANY_EYEBROW', 'Our Company'),
  companyTitle: envValue('COMPANY_TITLE', 'Controlled from coconut shell selection to final shipment'),
  companyBodyPrimary: envValue(
    'COMPANY_BODY_PRIMARY',
    'Black Opal works from selected coconut shell feedstock through controlled activation, sizing, and final quality checks so each grade is built for repeatable adsorption performance.',
  ),
  companyBodySecondary: envValue(
    'COMPANY_BODY_SECONDARY',
    'Grades can be customised by mesh size, adsorption level, pH adjustment, washing, and impregnation requirements instead of forcing every application into the same carbon.',
  ),
  contactTitle: envValue('CONTACT_TITLE', 'Availability and technical recommendations'),
  contactDescription: envValue(
    'CONTACT_DESCRIPTION',
    `Grade matching, availability, and logistics coordination start with the application conditions and expected volume.`,
  ),
  additionalOfficesTitle: envValue('ADDITIONAL_OFFICES_TITLE', 'Office network'),
  regionLabel,
  serviceArea,
  marketName,
  utilityMarketLabel,
  productionCenterCount: envValue('PRODUCTION_CENTER_COUNT', '3'),
  logisticsSummary: optionalEnvValue(
    'LOGISTICS_SUMMARY',
    defaultLogisticsSummary,
  ),
};

export const companyDetails = {
  legacyName: optionalEnvValue('LEGACY_NAME', 'INDOCARB AC'),
  headquarters,
  headquartersLabel,
  headquartersDescriptor,
  marketBaseTitle,
  marketBaseDescription,
  phoneDisplay,
  phoneHref: envValue('PHONE_HREF', phoneHref(phoneDisplay)),
  fax,
  infoEmail,
  salesEmail,
  additionalOffices,
  officeNetwork,
  websiteContact,
};

export { siteUrl };
