import { stegaClean } from '@sanity/client/stega';
import {
  applicationMap as fallbackApplicationMap,
  applications as fallbackApplications,
  homePageContent as fallbackHomePageContent,
  newsroomItems as fallbackNewsroomItems,
  newsroomMap as fallbackNewsroomMap,
  productMap as fallbackProductMap,
  products as fallbackProducts,
  productionPageContent as fallbackProductionPageContent,
  type ApplicationEntry,
  type ContentSection,
  type HomePageContent,
  type NewsroomItem,
  type ProductEntry,
  type ProductionPageContent,
  type SeoFields,
} from './siteContent';

export type SanitySiteContent = {
  homePage?: Partial<HomePageContent> | null;
  productionPage?: Partial<ProductionPageContent> | null;
  products?: Partial<ProductEntry>[];
  applications?: Partial<ApplicationEntry>[];
  newsroomItems?: Partial<NewsroomItem>[];
};

export type ContentInput = {
  homePage: HomePageContent;
  productionPage: ProductionPageContent;
  products: ProductEntry[];
  applications: ApplicationEntry[];
  newsroomItems: NewsroomItem[];
};

export type SeoContentInput = ContentInput & {
  productMap: Record<string, ProductEntry>;
  applicationMap: Record<string, ApplicationEntry>;
  newsroomMap: Record<string, NewsroomItem>;
};

export const fallbackContentInput: ContentInput = {
  homePage: fallbackHomePageContent,
  productionPage: fallbackProductionPageContent,
  products: fallbackProducts,
  applications: fallbackApplications,
  newsroomItems: fallbackNewsroomItems,
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

  const values = value.filter(
    (item): item is string => typeof item === 'string' && item.trim().length > 0,
  );
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

function normalizeSeo(value?: Partial<SeoFields>, fallback?: SeoFields): SeoFields | undefined {
  const seo = {
    seoTitle: cleanTextValue(value?.seoTitle, fallback?.seoTitle),
    seoDescription: cleanTextValue(value?.seoDescription, fallback?.seoDescription),
    seoImage: cleanTextValue(value?.seoImage, fallback?.seoImage),
    noIndex: typeof value?.noIndex === 'boolean' ? value.noIndex : fallback?.noIndex,
  };

  return seo.seoTitle || seo.seoDescription || seo.seoImage || seo.noIndex !== undefined ? seo : undefined;
}

function contentSections(value: unknown, fallback: ContentSection[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const sections = value
    .map((section): ContentSection | null => {
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
        _key: cleanTextValue(item._key) || undefined,
        title,
        body,
        bullets: stringArray(item.bullets),
      };
    })
    .filter((section): section is ContentSection => section !== null);

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
    seo: normalizeSeo(value.seo, fallback?.seo),
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
    seo: normalizeSeo(value.seo, fallback?.seo),
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
    seo: normalizeSeo(value.seo, fallback?.seo),
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
    seo: normalizeSeo(value?.seo, fallback.seo),
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

function normalizeProductionPage(value?: Partial<ProductionPageContent> | null): ProductionPageContent {
  const fallback = fallbackProductionPageContent;
  const id = cleanTextValue(value?._id);

  return {
    _id: id || undefined,
    _type: value?._type === 'productionPage' ? value._type : undefined,
    overviewTitle: textValue(value?.overviewTitle, fallback.overviewTitle),
  };
}

function mergeBySlug<T extends { slug: string }>(
  cmsItems: Partial<T>[] | undefined,
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

export function mapBySlug<T extends { slug: string }>(items: T[]) {
  return Object.fromEntries(items.map((item) => [item.slug, item])) as Record<string, T>;
}

export function mergeSanityContent(content?: SanitySiteContent | null): ContentInput {
  if (!content) {
    return fallbackContentInput;
  }

  return {
    homePage: normalizeHomePage(content.homePage),
    productionPage: normalizeProductionPage(content.productionPage),
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

export function toSeoContent(content: ContentInput): SeoContentInput {
  return {
    ...content,
    productMap: mapBySlug(content.products),
    applicationMap: mapBySlug(content.applications),
    newsroomMap: mapBySlug(content.newsroomItems),
  };
}
