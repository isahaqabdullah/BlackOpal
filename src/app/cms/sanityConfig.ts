function envValue(nextName: string) {
  return process.env[nextName]?.trim() || '';
}

export const sanityProjectId = envValue('NEXT_PUBLIC_SANITY_PROJECT_ID');
export const sanityDataset = envValue('NEXT_PUBLIC_SANITY_DATASET') || 'production';
export const sanityApiVersion = envValue('NEXT_PUBLIC_SANITY_API_VERSION') || '2026-04-15';
export const configuredSiteId = envValue('NEXT_PUBLIC_SITE_ID') || 'black-opal-india';
export const sanityStudioUrl = envValue('NEXT_PUBLIC_SANITY_STUDIO_URL') || 'http://localhost:3000/studio';

export const isSanityConfigured = Boolean(sanityProjectId && sanityDataset);

export function readSanityServerToken() {
  return process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN;
}

export function readSanityBrowserToken() {
  return process.env.SANITY_API_READ_TOKEN || false;
}
