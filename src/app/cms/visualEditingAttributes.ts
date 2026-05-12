'use client';

import { createDataAttribute } from '@sanity/visual-editing/create-data-attribute';
import { useSiteContent } from '../content/SiteContentProvider';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || process.env.VITE_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || process.env.VITE_SANITY_DATASET?.trim();
const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL?.trim() || process.env.VITE_SANITY_STUDIO_URL?.trim();
const siteId = process.env.NEXT_PUBLIC_SITE_ID?.trim() || process.env.VITE_SITE_ID?.trim();

export function homePageDocumentId(fallbackId = 'homePage') {
  if (siteId === 'black-opal-india' || siteId === 'black-opal-middle-east') {
    return `homePage-${siteId}`;
  }

  return fallbackId;
}

export function homePageDataAttribute(path: string, documentId = homePageDocumentId()) {
  if (!projectId || !dataset) {
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

export function productionPageDataAttribute(path: string, documentId = 'productionPage') {
  if (!projectId || !dataset) {
    return undefined;
  }

  return createDataAttribute({
    baseUrl: studioUrl,
    dataset,
    id: documentId,
    path,
    projectId,
    type: 'productionPage',
  }).toString();
}

export function useHomePageDataAttribute(documentId?: string) {
  const { source } = useSiteContent();

  return (path: string) => {
    if (source !== 'sanity-preview') {
      return undefined;
    }

    return homePageDataAttribute(path, documentId);
  };
}

export function useProductionPageDataAttribute(documentId?: string) {
  const { source } = useSiteContent();

  return (path: string) => {
    if (source !== 'sanity-preview') {
      return undefined;
    }

    return productionPageDataAttribute(path, documentId);
  };
}
