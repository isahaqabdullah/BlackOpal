import { createClient } from '@sanity/client';
import type { ApplicationEntry, HomePageContent, NewsroomItem, ProductEntry } from '../content/siteContent';

export type SanitySiteContent = {
  homePage?: Partial<HomePageContent> | null;
  products: ProductEntry[];
  applications: ApplicationEntry[];
  newsroomItems: NewsroomItem[];
};

export type SanitySiteContentResult = {
  content: SanitySiteContent;
  preview: boolean;
};

const env =
  (import.meta.env as Record<string, string | undefined> | undefined) ??
  (typeof process !== 'undefined' ? (process.env as Record<string, string | undefined>) : {});

const projectId = env.VITE_SANITY_PROJECT_ID?.trim();
const dataset = env.VITE_SANITY_DATASET?.trim();
const apiVersion = env.VITE_SANITY_API_VERSION?.trim() || '2026-04-15';
const siteId = env.VITE_SITE_ID?.trim() || 'black-opal-us';
const previewCookieName = 'black-opal-sanity-preview';
const previewPerspectiveParam = 'sanity-preview-perspective';

export const isSanityConfigured = Boolean(projectId && dataset);
export const configuredSiteId = siteId;

const sanityClient = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset: dataset!,
      apiVersion,
      useCdn: true,
    })
  : null;

const siteContentQuery = `{
  "homePage": *[
    _type == "homePage" &&
    (siteId == $siteId || (!defined(siteId) && _id == "homePage"))
  ] | order(select(siteId == $siteId => 0, 1))[0] {
    _id,
    _type,
    siteId,
    heroKicker,
    heroTitle,
    heroDescription,
    trustCertificationLabel,
    trustCertificationValue,
    trustEstablishedLabel,
    trustEstablishedValue,
    trustProductionLabel,
    trustProductionValue,
    trustLogisticsLabel,
    trustLogisticsValue,
    trustCapacityLabel,
    trustCapacityValue,
    productSectionKicker,
    productSectionTitle,
    applicationSectionKicker,
    applicationSectionTitle,
    companyEyebrow,
    companyTitle,
    companyBodyPrimary,
    companyBodySecondary,
    ctaTitle,
    ctaDescription,
    ctaPrimaryLabel,
    ctaSecondaryLabel
  },
  "products": *[_type == "product"] | order(coalesce(sortOrder, 999) asc, name asc) {
    _id,
    _type,
    "slug": coalesce(slug.current, slug),
    name,
    shortName,
    summary,
    intro,
    highlights,
    commonUses,
    grades,
    sections[] {
      _key,
      title,
      body,
      bullets
    },
    "image": coalesce(imageUrl, image.asset->url)
  },
  "applications": *[_type == "application"] | order(coalesce(sortOrder, 999) asc, name asc) {
    _id,
    _type,
    "slug": coalesce(slug.current, slug),
    name,
    summary,
    intro,
    keyPoints,
    recommendedProducts,
    grades,
    sections[] {
      _key,
      title,
      body,
      bullets
    },
    "image": coalesce(imageUrl, image.asset->url)
  },
  "newsroomItems": *[_type == "newsroomItem"] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    _type,
    "slug": coalesce(slug.current, slug),
    title,
    type,
    summary,
    detail,
    bullets
  }
}`;

export function isSanityPreviewActive() {
  if (typeof document === 'undefined') {
    return false;
  }

  if (new URLSearchParams(window.location.search).has(previewPerspectiveParam)) {
    return true;
  }

  return document.cookie
    .split(';')
    .map((item) => item.trim())
    .some((item) => item === `${previewCookieName}=1`);
}

async function fetchPreviewSiteContent() {
  const response = await fetch('/api/sanity-site-content', {
    credentials: 'include',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Unable to load Sanity preview content (${response.status}).`);
  }

  const data = (await response.json()) as Partial<SanitySiteContentResult>;

  if (!data.content) {
    throw new Error('Sanity preview API returned no content.');
  }

  return {
    content: data.content,
    preview: Boolean(data.preview),
  } satisfies SanitySiteContentResult;
}

export async function fetchSanitySiteContent(options: { preview?: boolean } = {}) {
  if (options.preview ?? isSanityPreviewActive()) {
    return fetchPreviewSiteContent();
  }

  if (!sanityClient) {
    return null;
  }

  const content = await sanityClient.fetch<SanitySiteContent>(siteContentQuery, { siteId });

  return {
    content,
    preview: false,
  } satisfies SanitySiteContentResult;
}
