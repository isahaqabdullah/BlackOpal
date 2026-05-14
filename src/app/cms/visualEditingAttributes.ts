'use client';

import { useEffect, useMemo, useState } from 'react';
import { createDataAttribute } from '@sanity/visual-editing/create-data-attribute';
import { useSiteContent } from '../content/SiteContentProvider';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || process.env.VITE_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || process.env.VITE_SANITY_DATASET?.trim();
const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL?.trim() || process.env.VITE_SANITY_STUDIO_URL?.trim();
const siteId = process.env.NEXT_PUBLIC_SITE_ID?.trim() || process.env.VITE_SITE_ID?.trim();

type VisualEditingContext = {
  enabled: boolean;
  studioUrl?: string;
};

function getEmbeddedPresentationContext(): VisualEditingContext {
  if (typeof window === 'undefined') {
    return { enabled: false };
  }

  const searchParams = new URLSearchParams(window.location.search);
  const isEmbeddedPreview = window.self !== window.top || Boolean(window.opener);

  if (!isEmbeddedPreview || !searchParams.has('sanity-preview-perspective')) {
    return { enabled: false };
  }

  return {
    enabled: true,
    studioUrl: `${window.location.origin}/studio`,
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

export function homePageDataAttribute(path: string, documentId = homePageDocumentId(), baseUrl = studioUrl) {
  if (!projectId || !dataset) {
    return undefined;
  }

  const resolvedDocumentId = documentId || homePageDocumentId();

  return createDataAttribute({
    baseUrl,
    dataset,
    id: resolvedDocumentId,
    path,
    projectId,
    type: 'homePage',
  }).toString();
}

export function productionPageDataAttribute(path: string, documentId = 'productionPage', baseUrl = studioUrl) {
  if (!projectId || !dataset) {
    return undefined;
  }

  return createDataAttribute({
    baseUrl,
    dataset,
    id: documentId,
    path,
    projectId,
    type: 'productionPage',
  }).toString();
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
