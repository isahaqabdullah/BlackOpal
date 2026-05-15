'use client';

import { useEffect, useMemo, useState } from 'react';
import { createDataAttribute } from '@sanity/visual-editing/create-data-attribute';
import { useSiteContent } from '../content/SiteContentProvider';
import { getSanityPresentationContext } from './presentationContext';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || process.env.VITE_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || process.env.VITE_SANITY_DATASET?.trim();
const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL?.trim() || process.env.VITE_SANITY_STUDIO_URL?.trim();
const siteId = process.env.NEXT_PUBLIC_SITE_ID?.trim() || process.env.VITE_SITE_ID?.trim();

type VisualEditingContext = {
  enabled: boolean;
  studioUrl?: string;
};

type SanityDocumentType =
  | 'homePage'
  | 'siteSettings'
  | 'pageCopy'
  | 'aboutPage'
  | 'contactPage'
  | 'productionPage'
  | 'product'
  | 'application'
  | 'newsroomItem';

function getEmbeddedPresentationContext(): VisualEditingContext {
  const presentationContext = getSanityPresentationContext();
  if (!presentationContext.enabled) {
    return { enabled: false };
  }

  return {
    enabled: true,
    studioUrl: presentationContext.studioUrl,
  };
}

function useVisualEditingContext(source: string): VisualEditingContext {
  const [isHydrated, setIsHydrated] = useState(false);
  const [embeddedPresentationContext, setEmbeddedPresentationContext] = useState<VisualEditingContext>({
    enabled: false,
  });

  useEffect(() => {
    setIsHydrated(true);
    setEmbeddedPresentationContext(getEmbeddedPresentationContext());
  }, []);

  return useMemo(
    () => ({
      enabled: isHydrated && (embeddedPresentationContext.enabled || source === 'sanity-preview'),
      studioUrl: embeddedPresentationContext.studioUrl || studioUrl,
    }),
    [embeddedPresentationContext.enabled, embeddedPresentationContext.studioUrl, isHydrated, source],
  );
}

export function homePageDocumentId(fallbackId = 'homePage') {
  if (siteId === 'black-opal-india' || siteId === 'black-opal-middle-east') {
    return `homePage-${siteId}`;
  }

  return fallbackId;
}

export function aboutPageDocumentId(fallbackId = 'aboutPage') {
  if (siteId === 'black-opal-india' || siteId === 'black-opal-middle-east') {
    return `aboutPage-${siteId}`;
  }

  return fallbackId;
}

export function siteSettingsDocumentId(fallbackId = 'siteSettings') {
  if (siteId === 'black-opal-india' || siteId === 'black-opal-middle-east') {
    return `siteSettings-${siteId}`;
  }

  return fallbackId;
}

export function contactPageDocumentId(fallbackId = 'contactPage') {
  if (siteId === 'black-opal-india' || siteId === 'black-opal-middle-east') {
    return `contactPage-${siteId}`;
  }

  return fallbackId;
}

export function documentDataAttribute(
  type: SanityDocumentType,
  documentId: string,
  path: string,
  baseUrl = studioUrl,
) {
  if (!projectId || !dataset) {
    return undefined;
  }

  return createDataAttribute({
    baseUrl,
    dataset,
    id: documentId,
    path,
    projectId,
    type,
  }).toString();
}

export function homePageDataAttribute(path: string, documentId = homePageDocumentId(), baseUrl = studioUrl) {
  return documentDataAttribute('homePage', documentId || homePageDocumentId(), path, baseUrl);
}

export function aboutPageDataAttribute(path: string, documentId = aboutPageDocumentId(), baseUrl = studioUrl) {
  return documentDataAttribute('aboutPage', documentId || aboutPageDocumentId(), path, baseUrl);
}

export function productionPageDataAttribute(path: string, documentId = 'productionPage', baseUrl = studioUrl) {
  return documentDataAttribute('productionPage', documentId, path, baseUrl);
}

export function siteSettingsDataAttribute(path: string, documentId = siteSettingsDocumentId(), baseUrl = studioUrl) {
  return documentDataAttribute('siteSettings', documentId || siteSettingsDocumentId(), path, baseUrl);
}

export function contactPageDataAttribute(path: string, documentId = contactPageDocumentId(), baseUrl = studioUrl) {
  return documentDataAttribute('contactPage', documentId || contactPageDocumentId(), path, baseUrl);
}

export function useHomePageDataAttribute(documentId?: string) {
  const { source } = useSiteContent();
  const visualEditingContext = useVisualEditingContext(source);

  return (path: string) => {
    if (!visualEditingContext.enabled) {
      return undefined;
    }

    return homePageDataAttribute(path, documentId, visualEditingContext.studioUrl);
  };
}

export function useSanityDataAttribute() {
  const { source } = useSiteContent();
  const visualEditingContext = useVisualEditingContext(source);

  return (type: SanityDocumentType, documentId: string | undefined, path: string) => {
    if (!visualEditingContext.enabled || !documentId) {
      return undefined;
    }

    return documentDataAttribute(type, documentId, path, visualEditingContext.studioUrl);
  };
}

export function useSiteSettingsDataAttribute(documentId?: string) {
  const dataAttribute = useSanityDataAttribute();

  return (path: string) => dataAttribute('siteSettings', documentId || siteSettingsDocumentId(), path);
}

export function usePageCopyDataAttribute() {
  const dataAttribute = useSanityDataAttribute();

  return (path: string) => dataAttribute('pageCopy', 'pageCopy', path);
}

export function useAboutPageDataAttribute(documentId?: string) {
  const { source } = useSiteContent();
  const visualEditingContext = useVisualEditingContext(source);

  return (path: string) => {
    if (!visualEditingContext.enabled) {
      return undefined;
    }

    return aboutPageDataAttribute(path, documentId, visualEditingContext.studioUrl);
  };
}

export function useProductionPageDataAttribute(documentId?: string) {
  const { source } = useSiteContent();
  const visualEditingContext = useVisualEditingContext(source);

  return (path: string) => {
    if (!visualEditingContext.enabled) {
      return undefined;
    }

    return productionPageDataAttribute(path, documentId, visualEditingContext.studioUrl);
  };
}

export function useContactPageDataAttribute(documentId?: string) {
  const { source } = useSiteContent();
  const visualEditingContext = useVisualEditingContext(source);

  return (path: string) => {
    if (!visualEditingContext.enabled) {
      return undefined;
    }

    return contactPageDataAttribute(path, documentId, visualEditingContext.studioUrl);
  };
}
