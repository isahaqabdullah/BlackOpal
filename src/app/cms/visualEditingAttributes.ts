import { createDataAttribute } from '@sanity/visual-editing/create-data-attribute';
import { isSanityPreviewActive } from './sanity';

const env = import.meta.env as Record<string, string | undefined>;

const projectId = env.VITE_SANITY_PROJECT_ID?.trim();
const dataset = env.VITE_SANITY_DATASET?.trim();
const studioUrl = env.VITE_SANITY_STUDIO_URL?.trim();
const siteId = env.VITE_SITE_ID?.trim();

export function homePageDocumentId(fallbackId = 'homePage') {
  if (siteId === 'black-opal-india' || siteId === 'black-opal-middle-east') {
    return `homePage-${siteId}`;
  }

  return fallbackId;
}

export function homePageDataAttribute(path: string, documentId = homePageDocumentId()) {
  if (!isSanityPreviewActive() || !projectId || !dataset) {
    return undefined;
  }

  const resolvedDocumentId = documentId || homePageDocumentId();

  return createDataAttribute({
    baseUrl: studioUrl,
    dataset,
    id: resolvedDocumentId,
    path,
    projectId,
    type: 'homePage',
  }).toString();
}
