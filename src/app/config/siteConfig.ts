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
  'Black Opal Carbons supplies coconut shell activated carbon for water treatment, gold recovery, air and gas purification, oil and gas, and industrial applications.';

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

function parseOffices(value: string | undefined): Office[] {
  if (!value?.trim()) {
    return [];
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

  return [];
}

const siteName = envValue('VITE_SITE_NAME', DEFAULT_SITE_NAME);
const siteUrl = envValue('VITE_SITE_URL', DEFAULT_SITE_URL).replace(/\/+$/, '');
const regionLabel = envValue('VITE_REGION_LABEL', 'U.S.');
const serviceArea = envValue('VITE_SERVICE_AREA', 'US');
const marketName = envValue('VITE_MARKET_NAME', 'North American');
const utilityMarketLabel = envValue('VITE_UTILITY_MARKET_LABEL', regionLabel);
const warehouses = parseWarehouses(import.meta.env.VITE_WAREHOUSES_JSON) ?? defaultWarehouses;

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
const additionalOffices = parseOffices(import.meta.env.VITE_ADDITIONAL_OFFICES_JSON);
const defaultLogisticsSummary = warehouses.length
  ? `Strategic warehouse locations across the ${regionLabel} market for reduced lead times and reliable just-in-time delivery.`
  : `Regional sales and technical support for the ${regionLabel} market.`;

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
    'High-performance activated carbon solutions backed by large-scale manufacturing, certified quality, and application-specific expertise.',
  ),
  heroLocationProof: envValue(
    'VITE_HERO_LOCATION_PROOF',
    warehouses.length ? `${regionLabel} HQ + Warehouse Network` : `${regionLabel} HQ + Regional Support`,
  ),
  companyEyebrow: envValue('VITE_COMPANY_EYEBROW', 'Our Company'),
  companyTitle: envValue('VITE_COMPANY_TITLE', 'Built on reliability, consistency, and service'),
  companyBodyPrimary: envValue(
    'VITE_COMPANY_BODY_PRIMARY',
    'Black Opal was established in 2010 as a joint venture between a major coconut shell activated carbon manufacturer in India and experienced entrepreneurs from the activated carbon industry.',
  ),
  companyBodySecondary: envValue(
    'VITE_COMPANY_BODY_SECONDARY',
    `The ${headquarters.locality} office supports the ${marketName} market while production remains tied to large-scale manufacturing in India.`,
  ),
  contactTitle: envValue('VITE_CONTACT_TITLE', 'Request a quote, enquiry, or technical recommendation'),
  contactDescription: envValue(
    'VITE_CONTACT_DESCRIPTION',
    'Use this page for product enquiries, activated carbon quote requests, technical recommendations, and current availability.',
  ),
  additionalOfficesTitle: envValue('VITE_ADDITIONAL_OFFICES_TITLE', 'Regional presence'),
  regionLabel,
  serviceArea,
  marketName,
  utilityMarketLabel,
  warehouseCount: String(warehouses.length),
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
  headquartersLabel: envValue('VITE_HEADQUARTERS_LABEL', 'Marketing headquarters'),
  headquartersDescriptor: envValue('VITE_HEADQUARTERS_DESCRIPTOR', `${headquarters.locality} headquarters`),
  marketBaseTitle: envValue('VITE_MARKET_BASE_TITLE', `${headquarters.locality} commercial base`),
  marketBaseDescription: envValue(
    'VITE_MARKET_BASE_DESCRIPTION',
    `The ${headquarters.locality} commercial office supports sales, enquiries, and customer coordination from ${headquarters.line1}, ${headquarters.line2}.`,
  ),
  phoneDisplay,
  phoneHref: envValue('VITE_PHONE_HREF', phoneHref(phoneDisplay)),
  fax: optionalEnvValue('VITE_FAX', '+1 (412) 365-5634'),
  infoEmail: envValue('VITE_INFO_EMAIL', 'info@blackopalcarbons.com'),
  salesEmail: envValue('VITE_SALES_EMAIL', 'sales@blackopalcarbons.com'),
  additionalOffices,
  warehouses,
};

export { siteUrl };
