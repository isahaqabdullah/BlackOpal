import { defineCliConfig } from 'sanity/cli';

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  'replace-with-project-id';
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const studioSiteId = process.env.SANITY_STUDIO_SITE_ID || process.env.NEXT_PUBLIC_SITE_ID || 'black-opal-india';
const studioHost = normalizeStudioHost(process.env.SANITY_STUDIO_HOSTNAME);
const studioAppId =
  process.env.SANITY_STUDIO_APP_ID ||
  (studioSiteId === 'black-opal-middle-east' || studioHost === 'black-opal-middle-east-cms'
    ? 's406461ocl7gcx5ra2wj4gp6'
    : 'btdowwp2fud2nx86ucdflv2p');

function normalizeStudioHost(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const hostname = value.trim().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  return hostname.endsWith('.sanity.studio') ? hostname.slice(0, -'.sanity.studio'.length) : hostname;
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost,
  deployment: {
    appId: studioAppId,
  },
});
