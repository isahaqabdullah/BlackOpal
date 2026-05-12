'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import {
  fallbackContentInput,
  mapBySlug,
  type ContentInput,
} from './siteContentResolver';
import type { ApplicationEntry, HomePageContent, NewsroomItem, ProductEntry, ProductionPageContent } from './siteContent';

export type ContentStatus = 'loading' | 'ready' | 'error';
export type ContentSource = 'static' | 'sanity' | 'sanity-preview';

export type SiteContent = {
  homePage: HomePageContent;
  productionPage: ProductionPageContent;
  products: ProductEntry[];
  applications: ApplicationEntry[];
  newsroomItems: NewsroomItem[];
  productMap: Record<string, ProductEntry>;
  applicationMap: Record<string, ApplicationEntry>;
  newsroomMap: Record<string, NewsroomItem>;
  source: ContentSource;
  status: ContentStatus;
  error?: string;
  refresh: () => Promise<void>;
};

type SiteContentProviderProps = {
  children: ReactNode;
  initialContent?: ContentInput;
  initialSource?: ContentSource;
};

function createSiteContent(content: ContentInput, source: ContentSource): SiteContent {
  return {
    ...content,
    productMap: mapBySlug(content.products),
    applicationMap: mapBySlug(content.applications),
    newsroomMap: mapBySlug(content.newsroomItems),
    source,
    status: 'ready',
    refresh: async () => {},
  };
}

const fallbackContent = createSiteContent(fallbackContentInput, 'static');
const SiteContentContext = createContext<SiteContent>(fallbackContent);

export function SiteContentProvider({
  children,
  initialContent = fallbackContentInput,
  initialSource = 'static',
}: SiteContentProviderProps) {
  const value = useMemo(() => createSiteContent(initialContent, initialSource), [initialContent, initialSource]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
