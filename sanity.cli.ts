import { defineCliConfig } from 'sanity/cli';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'replace-with-project-id';
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || 'production';
const studioHost = normalizeStudioHost(process.env.SANITY_STUDIO_HOSTNAME);

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
});
