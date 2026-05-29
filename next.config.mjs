const publicEnvKeys = [
  'SITE_ID',
  'SITE_URL',
  'SITE_NAME',
  'HOME_TITLE',
  'SITE_DESCRIPTION',
  'ORIGIN_STATEMENT',
  'ORIGIN_DESCRIPTION',
  'HERO_KICKER',
  'HERO_TITLE',
  'HERO_DESCRIPTION',
  'HERO_LOCATION_PROOF',
  'REGION_LABEL',
  'SERVICE_AREA',
  'MARKET_NAME',
  'UTILITY_MARKET_LABEL',
  'HEADQUARTERS_NAME',
  'HEADQUARTERS_LABEL',
  'HEADQUARTERS_DESCRIPTOR',
  'ADDRESS_LINE_1',
  'ADDRESS_LINE_2',
  'ADDRESS_LOCALITY',
  'ADDRESS_REGION',
  'POSTAL_CODE',
  'ADDRESS_COUNTRY',
  'ADDRESS_COUNTRY_CODE',
  'PHONE_DISPLAY',
  'PHONE_HREF',
  'FAX',
  'INFO_EMAIL',
  'SALES_EMAIL',
  'MARKET_BASE_TITLE',
  'MARKET_BASE_DESCRIPTION',
  'COMPANY_EYEBROW',
  'COMPANY_TITLE',
  'COMPANY_BODY_PRIMARY',
  'COMPANY_BODY_SECONDARY',
  'CONTACT_TITLE',
  'CONTACT_DESCRIPTION',
  'ADDITIONAL_OFFICES_TITLE',
  'LOGISTICS_SUMMARY',
  'PRODUCTION_CENTER_COUNT',
  'ADDITIONAL_OFFICES_JSON',
  'LEGACY_NAME',
  'SANITY_PROJECT_ID',
  'SANITY_DATASET',
  'SANITY_API_VERSION',
  'SANITY_STUDIO_URL',
];

const env = Object.fromEntries(
  publicEnvKeys
    .map((key) => [`NEXT_PUBLIC_${key}`, process.env[`NEXT_PUBLIC_${key}`]])
    .filter((entry) => entry[1] !== undefined),
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  env,
  async headers() {
    if (process.env.NODE_ENV === 'production') {
      return [];
    }

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
  experimental: {
    prefetchInlining: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
