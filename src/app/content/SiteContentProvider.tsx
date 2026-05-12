import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { stegaClean } from '@sanity/client/stega';
import { fetchSanitySiteContent, isSanityConfigured, type SanitySiteContent } from '../cms/sanity';
import {
  applicationMap as fallbackApplicationMap,
  applications as fallbackApplications,
  homePageContent as fallbackHomePageContent,
  newsroomItems as fallbackNewsroomItems,
  newsroomMap as fallbackNewsroomMap,
  productMap as fallbackProductMap,
  products as fallbackProducts,
  type ApplicationEntry,
  type ContentSection,
  type HomePageContent,
  type NewsroomItem,
  type ProductEntry,
} from './siteContent';

export type ContentStatus = 'loading' | 'ready' | 'error';
export type ContentSource = 'static' | 'sanity' | 'sanity-preview';

type RefreshContentOptions = {
  showLoading?: boolean;
};

export type SiteContent = {
  homePage: HomePageContent;
  products: ProductEntry[];
  applications: ApplicationEntry[];
  newsroomItems: NewsroomItem[];
  productMap: Record<string, ProductEntry>;
  applicationMap: Record<string, ApplicationEntry>;
  newsroomMap: Record<string, NewsroomItem>;
  source: ContentSource;
  status: ContentStatus;
  error?: string;
  refresh: (options?: RefreshContentOptions) => Promise<void>;
};

type ContentInput = Pick<SiteContent, 'homePage' | 'products' | 'applications' | 'newsroomItems'>;
type SiteContentState = Omit<SiteContent, 'refresh'>;

function mapBySlug<T extends { slug: string }>(items: T[]) {
  return Object.fromEntries(items.map((item) => [item.slug, item])) as Record<string, T>;
}

function createSiteContent(
  content: ContentInput,
  source: ContentSource,
  status: ContentStatus,
  error?: string,
): SiteContentState {
  return {
    ...content,
    productMap: mapBySlug(content.products),
    applicationMap: mapBySlug(content.applications),
    newsroomMap: mapBySlug(content.newsroomItems),
    source,
    status,
    error,
  };
}

const fallbackContentInput: ContentInput = {
  homePage: fallbackHomePageContent,
  products: fallbackProducts,
  applications: fallbackApplications,
  newsroomItems: fallbackNewsroomItems,
};

const fallbackContentState = createSiteContent(fallbackContentInput, 'static', 'ready');
const fallbackContent: SiteContent = {
  ...fallbackContentState,
  refresh: async () => {},
};

function textValue(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function cleanTextValue(value: unknown, fallback = '') {
  return textValue(typeof value === 'string' ? stegaClean(value) : value, fallback);
}

function stringArray(value: unknown, fallback: string[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const values = value.filter((item): item is string => typeof item === 'string' && item.trim());
  return values.length ? values : fallback;
}

function cleanStringArray(value: unknown, fallback: string[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const values = value
    .map((item) => (typeof item === 'string' ? stegaClean(item).trim() : ''))
    .filter(Boolean);

  return values.length ? values : fallback;
}

function contentSections(value: unknown, fallback: ContentSection[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const sections = value
    .map((section) => {
      if (!section || typeof section !== 'object') {
        return null;
      }

      const item = section as Partial<ContentSection>;
      const title = textValue(item.title);
      const body = textValue(item.body);

      if (!title || !body) {
        return null;
      }

      return {
        _key: cleanTextValue(item._key),
        title,
        body,
        bullets: stringArray(item.bullets),
      };
    })
    .filter((section): section is ContentSection => Boolean(section));

  return sections.length ? sections : fallback;
}

function normalizeProduct(value: Partial<ProductEntry>, fallback?: ProductEntry) {
  const slug = cleanTextValue(value.slug, fallback?.slug);
  const name = textValue(value.name, fallback?.name);
  const shortName = textValue(value.shortName, fallback?.shortName || name);
  const summary = textValue(value.summary, fallback?.summary);
  const intro = textValue(value.intro, fallback?.intro);
  const image = cleanTextValue(value.image, fallback?.image);

  if (!slug || !name || !summary || !intro || !image) {
    return null;
  }

  return {
    _id: cleanTextValue(value._id),
    _type: value._type === 'product' ? value._type : undefined,
    slug,
    name,
    shortName,
    summary,
    intro,
    highlights: stringArray(value.highlights, fallback?.highlights),
    commonUses: stringArray(value.commonUses, fallback?.commonUses),
    grades: stringArray(value.grades, fallback?.grades),
    sections: contentSections(value.sections, fallback?.sections),
    image,
  } satisfies ProductEntry;
}

function normalizeApplication(value: Partial<ApplicationEntry>, fallback?: ApplicationEntry) {
  const slug = cleanTextValue(value.slug, fallback?.slug);
  const name = textValue(value.name, fallback?.name);
  const summary = textValue(value.summary, fallback?.summary);
  const intro = textValue(value.intro, fallback?.intro);
  const image = cleanTextValue(value.image, fallback?.image);

  if (!slug || !name || !summary || !intro || !image) {
    return null;
  }

  return {
    _id: cleanTextValue(value._id),
    _type: value._type === 'application' ? value._type : undefined,
    slug,
    name,
    summary,
    intro,
    keyPoints: stringArray(value.keyPoints, fallback?.keyPoints),
    recommendedProducts: cleanStringArray(value.recommendedProducts, fallback?.recommendedProducts),
    grades: stringArray(value.grades, fallback?.grades),
    sections: contentSections(value.sections, fallback?.sections),
    image,
  } satisfies ApplicationEntry;
}

function normalizeNewsroomItem(value: Partial<NewsroomItem>, fallback?: NewsroomItem) {
  const slug = cleanTextValue(value.slug, fallback?.slug);
  const title = textValue(value.title, fallback?.title);
  const summary = textValue(value.summary, fallback?.summary);
  const rawType = cleanTextValue(value.type, fallback?.type);
  const type = rawType === 'press-release' || rawType === 'resource' ? rawType : fallback?.type;

  if (!slug || !title || !summary || !type) {
    return null;
  }

  return {
    _id: cleanTextValue(value._id),
    _type: value._type === 'newsroomItem' ? value._type : undefined,
    slug,
    title,
    type,
    summary,
    detail: stringArray(value.detail, fallback?.detail),
    bullets: stringArray(value.bullets, fallback?.bullets),
  } satisfies NewsroomItem;
}

function normalizeHomePage(value?: Partial<HomePageContent> | null): HomePageContent {
  const fallback = fallbackHomePageContent;
  const id = cleanTextValue(value?._id);

  return {
    _id: id || undefined,
    _type: value?._type === 'homePage' ? value._type : undefined,
    siteId: cleanTextValue(value?.siteId, fallback.siteId),
    heroKicker: textValue(value?.heroKicker, fallback.heroKicker),
    heroTitle: textValue(value?.heroTitle, fallback.heroTitle),
    heroDescription: textValue(value?.heroDescription, fallback.heroDescription),
    trustCertificationLabel: textValue(value?.trustCertificationLabel, fallback.trustCertificationLabel),
    trustCertificationValue: textValue(value?.trustCertificationValue, fallback.trustCertificationValue),
    trustEstablishedLabel: textValue(value?.trustEstablishedLabel, fallback.trustEstablishedLabel),
    trustEstablishedValue: textValue(value?.trustEstablishedValue, fallback.trustEstablishedValue),
    trustProductionLabel: textValue(value?.trustProductionLabel, fallback.trustProductionLabel),
    trustProductionValue: textValue(value?.trustProductionValue, fallback.trustProductionValue),
    trustLogisticsLabel: textValue(value?.trustLogisticsLabel, fallback.trustLogisticsLabel),
    trustLogisticsValue: textValue(value?.trustLogisticsValue, fallback.trustLogisticsValue),
    trustCapacityLabel: textValue(value?.trustCapacityLabel, fallback.trustCapacityLabel),
    trustCapacityValue: textValue(value?.trustCapacityValue, fallback.trustCapacityValue),
    productSectionKicker: textValue(value?.productSectionKicker, fallback.productSectionKicker),
    productSectionTitle: textValue(value?.productSectionTitle, fallback.productSectionTitle),
    applicationSectionKicker: textValue(value?.applicationSectionKicker, fallback.applicationSectionKicker),
    applicationSectionTitle: textValue(value?.applicationSectionTitle, fallback.applicationSectionTitle),
    companyEyebrow: textValue(value?.companyEyebrow, fallback.companyEyebrow),
    companyTitle: textValue(value?.companyTitle, fallback.companyTitle),
    companyBodyPrimary: textValue(value?.companyBodyPrimary, fallback.companyBodyPrimary),
    companyBodySecondary: textValue(value?.companyBodySecondary, fallback.companyBodySecondary),
    ctaTitle: textValue(value?.ctaTitle, fallback.ctaTitle),
    ctaDescription: textValue(value?.ctaDescription, fallback.ctaDescription),
    ctaPrimaryLabel: textValue(value?.ctaPrimaryLabel, fallback.ctaPrimaryLabel),
    ctaSecondaryLabel: textValue(value?.ctaSecondaryLabel, fallback.ctaSecondaryLabel),
  };
}

function mergeBySlug<T extends { slug: string }>(
  cmsItems: T[] | undefined,
  fallbackItems: T[],
  fallbackMap: Record<string, T>,
  normalize: (value: Partial<T>, fallback?: T) => T | null,
) {
  if (!cmsItems?.length) {
    return fallbackItems;
  }

  const seen = new Set<string>();
  const normalized = cmsItems
    .map((item) => normalize(item, fallbackMap[cleanTextValue(item.slug)]))
    .filter((item): item is T => Boolean(item))
    .filter((item) => {
      if (seen.has(item.slug)) {
        return false;
      }

      seen.add(item.slug);
      return true;
    });

  if (!normalized.length) {
    return fallbackItems;
  }

  return [...normalized, ...fallbackItems.filter((item) => !seen.has(item.slug))];
}

function mergeSanityContent(content: SanitySiteContent): ContentInput {
  return {
    homePage: normalizeHomePage(content.homePage),
    products: mergeBySlug(content.products, fallbackProducts, fallbackProductMap, normalizeProduct),
    applications: mergeBySlug(
      content.applications,
      fallbackApplications,
      fallbackApplicationMap,
      normalizeApplication,
    ),
    newsroomItems: mergeBySlug(
      content.newsroomItems,
      fallbackNewsroomItems,
      fallbackNewsroomMap,
      normalizeNewsroomItem,
    ),
  };
}

const SiteContentContext = createContext<SiteContent>(fallbackContent);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContentState>(() =>
    isSanityConfigured ? { ...fallbackContentState, status: 'loading' } : fallbackContentState,
  );

  const loadContent = useCallback(async ({ showLoading = true }: RefreshContentOptions = {}) => {
    if (!isSanityConfigured) {
      setContent(fallbackContentState);
      return;
    }

    if (showLoading) {
      setContent({ ...fallbackContentState, status: 'loading' });
    }

    try {
      const result = await fetchSanitySiteContent();

      if (!result) {
        setContent(fallbackContentState);
        return;
      }

      setContent(
        createSiteContent(
          mergeSanityContent(result.content),
          result.preview ? 'sanity-preview' : 'sanity',
          'ready',
        ),
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unable to load Sanity content.';
      setContent(createSiteContent(fallbackContentInput, 'static', 'error', message));
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    loadContent().catch((error: unknown) => {
      if (!isMounted) {
        return;
      }

      const message = error instanceof Error ? error.message : 'Unable to load Sanity content.';
      setContent(createSiteContent(fallbackContentInput, 'static', 'error', message));
    });

    return () => {
      isMounted = false;
    };
  }, [loadContent]);

  const value = useMemo(() => ({ ...content, refresh: loadContent }), [content, loadContent]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}
