type Warehouse = {
  name: string;
  address: string[];
};

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

const DEFAULT_SITE_URL = 'https://www.blackopalcarbons.com';
const DEFAULT_SITE_NAME = 'Black Opal Carbons';
const DEFAULT_DESCRIPTION =
  'Black Opal Carbons supplies coconut shell activated carbon manufactured and exported from India for water treatment, gold recovery, air and gas purification, oil and gas, and industrial applications.';

const defaultWarehouses: Warehouse[] = [
  {
    name: 'Florida',
    address: ['6333 Pelican Creek Circle', 'Riverview, FL 33578'],
  },
  {
    name: 'New Jersey',
    address: ['1578 Sussex Turnpike', 'Randolph, NJ 07869'],
  },
  {
    name: 'Ohio',
    address: ['Scippo Creek Rd', 'Circleville, OH 43113'],
  },
];

function envValue(name: string, fallback: string) {
  const value = import.meta.env[name] as string | undefined;
  return value?.trim() || fallback;
}

function optionalEnvValue(name: string, fallback = '') {
  const value = import.meta.env[name] as string | undefined;
  return value?.trim() || fallback;
}

function phoneHref(phoneDisplay: string) {
  const sanitized = phoneDisplay.replace(/[^\d+]/g, '');
  return sanitized ? `tel:${sanitized}` : '';
}

function parseWarehouses(value: string | undefined): Warehouse[] | undefined {
  if (!value?.trim()) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(value) as Warehouse[];

    if (
      Array.isArray(parsed) &&
      parsed.every(
        (warehouse) =>
          typeof warehouse?.name === 'string' &&
          Array.isArray(warehouse.address) &&
          warehouse.address.every((line) => typeof line === 'string'),
      )
    ) {
      return parsed;
    }
  } catch {
    // Invalid optional deployment config should not break rendering.
  }

  return undefined;
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
const regionLabel = envValue('VITE_REGION_LABEL', 'U.S.');
const serviceArea = envValue('VITE_SERVICE_AREA', 'US');
const marketName = envValue('VITE_MARKET_NAME', 'North American');
const utilityMarketLabel = envValue('VITE_UTILITY_MARKET_LABEL', regionLabel);
const warehouses = parseWarehouses(import.meta.env.VITE_WAREHOUSES_JSON) ?? defaultWarehouses;
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
const additionalOffices = parseOffices(import.meta.env.VITE_ADDITIONAL_OFFICES_JSON) ?? defaultAdditionalOffices;
const defaultLogisticsSummary = warehouses.length
  ? 'Company-owned manufacturing, 50 million lbs annual capacity, and final quality assurance before shipment support consistent coconut activated carbon supply.'
  : 'Company-owned manufacturing, controlled particle sizing, and final quality assurance before shipment support consistent coconut activated carbon supply.';
const headquartersLabel = envValue('VITE_HEADQUARTERS_LABEL', 'U.S. headquarters');
const headquartersDescriptor = envValue('VITE_HEADQUARTERS_DESCRIPTOR', 'U.S. headquarters');
const marketBaseTitle = envValue('VITE_MARKET_BASE_TITLE', 'Manufacturing base and office network');
const marketBaseDescription = envValue(
  'VITE_MARKET_BASE_DESCRIPTION',
  "Black Opal's state-of-the-art factory in India anchors 50 million lbs of annual coconut activated carbon capacity. The U.S. headquarters, India office, and Middle East office keep customers connected to the team for enquiries, technical support, and service.",
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

export const siteConfig = {
  siteName,
  siteUrl,
  siteId: envValue('VITE_SITE_ID', 'black-opal-us'),
  homeTitle: envValue('VITE_HOME_TITLE', `Coconut Shell Activated Carbon Supplier | ${siteName}`),
  defaultDescription: envValue('VITE_SITE_DESCRIPTION', DEFAULT_DESCRIPTION.replace(DEFAULT_SITE_NAME, siteName)),
  defaultImagePath: '/og-image.svg',
  heroKicker: envValue('VITE_HERO_KICKER', 'Prop 65 Compliant'),
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
    warehouses.length ? 'India Manufacturing + Warehouse Network' : 'India Manufacturing + Export Support',
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
  warehouseCount: String(warehouses.length),
  productionCenterCount: envValue('VITE_PRODUCTION_CENTER_COUNT', '3'),
  warehouseLocationCount: optionalEnvValue('VITE_WAREHOUSE_LOCATION_COUNT', String(warehouses.length)),
  warehouseSummary: optionalEnvValue(
    'VITE_WAREHOUSE_SUMMARY',
    warehouses.map((warehouse) => warehouse.address[warehouse.address.length - 1]).join(' · '),
  ),
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
  warehouses,
  websiteContact,
};

export { siteUrl };
