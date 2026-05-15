import { createClient } from '@sanity/client';
import type { SanitySiteContent } from '../content/siteContentResolver';

type SanityClientOptions = {
  preview?: boolean;
  studioUrl?: string;
};

function envValue(nextName: string) {
  return process.env[nextName]?.trim() || '';
}

export const sanityProjectId = envValue('NEXT_PUBLIC_SANITY_PROJECT_ID');
export const sanityDataset = envValue('NEXT_PUBLIC_SANITY_DATASET') || 'production';
export const sanityApiVersion = envValue('NEXT_PUBLIC_SANITY_API_VERSION') || '2026-04-15';
export const configuredSiteId = envValue('NEXT_PUBLIC_SITE_ID') || 'black-opal-middle-east';
export const sanityStudioUrl = envValue('NEXT_PUBLIC_SANITY_STUDIO_URL') || 'http://localhost:3333';

export const isSanityConfigured = Boolean(sanityProjectId && sanityDataset);

export const siteContentQuery = `{
  "homePage": *[
    _type == "homePage" &&
    (siteId == $siteId || (!defined(siteId) && _id == "homePage"))
  ] | order(select(siteId == $siteId => 0, 1))[0] {
    _id,
    _type,
    siteId,
    "seo": {
      "seoTitle": seo.seoTitle,
      "seoDescription": seo.seoDescription,
      "seoImage": coalesce(seo.seoImage.asset->url, seo.seoImageUrl),
      "noIndex": seo.noIndex
    },
    heroLogoImage,
    heroLogoAlt,
    heroKicker,
    heroTitle,
    heroDescription,
    heroLegacyLabel,
    heroVideoUrl,
    heroVideoLabel,
    heroVideoFallback,
    trustCertificationLabel,
    trustCertificationValue,
    trustEstablishedLabel,
    trustEstablishedValue,
    trustProductionLabel,
    trustProductionValue,
    trustCapacityLabel,
    trustCapacityValue,
    productSectionKicker,
    productSectionTitle,
    applicationSectionKicker,
    applicationSectionTitle,
    companyImage,
    companyImageAlt,
    companyEyebrow,
    companyTitle,
    companyBodyPrimary,
    companyBodySecondary,
    companyMetrics,
    ctaTitle,
    ctaDescription,
    whyKicker,
    whyTitle,
    whyReasons,
    featuredCapabilitiesLabel,
    featuredCapabilities[] {
      _key,
      label,
      title,
      copy,
      highlights,
      imageSource,
      imageSlug,
      imageUrl,
      imageAlt
    }
  },
  "siteSettings": *[_type == "siteSettings" && siteId == $siteId][0] {
    _id,
    _type,
    siteId,
    pageIntro {
      breadcrumbAriaLabel,
      homeLabel,
      homePath
    }
  },
  "pageCopy": *[_type == "pageCopy" && _id == "pageCopy"][0] {
    _id,
    _type,
    productsPage {
      seo,
      intro,
      highlightsLabel,
      commonUsesLabel,
      referencedGradesLabel
    },
    productDetailPage {
      introLabel,
      productsPath,
      productsBreadcrumbLabel,
      overviewLabel,
      commonUsesLabel,
      ctaTitle,
      ctaDescription
    },
    applicationsPage {
      seo,
      intro,
      itemLabel,
      keyPointsLabel,
      recommendedProductsLabel
    },
    applicationDetailPage {
      introLabel,
      applicationsPath,
      applicationsBreadcrumbLabel,
      overviewLabel,
      referencedGradesLabel,
      recommendedProductsLabel,
      recommendedProductsTitle,
      recommendedProductsDescription
    },
    newsroomPage {
      seo,
      intro,
      featuredUpdateLabel,
      whyMattersLabel,
      whyMattersBody,
      resourcesTitle,
      resourcesDescription,
      resourceLabel
    },
    newsroomPreview {
      kicker,
      title,
      description,
      pressReleaseLabel,
      resourceLabel
    },
    pressReleasePage {
      introLabel,
      newsroomPath,
      newsroomBreadcrumbLabel,
      keyPointsLabel
    },
    notFoundPage {
      seo,
      label,
      title,
      description
    }
  },
  "aboutPage": *[_type == "aboutPage" && siteId == $siteId][0] {
    _id,
    _type,
    siteId,
    "seo": {
      "seoTitle": seo.seoTitle,
      "seoDescription": seo.seoDescription,
      "seoImage": coalesce(seo.seoImage.asset->url, seo.seoImageUrl),
      "noIndex": seo.noIndex
    },
    "heroImage": coalesce(heroImageUrl, heroImage.asset->url),
    titleLogoImage,
    heroImageAlt,
    intro,
    storyTitle,
    storyParagraphs,
    officeNetworkLabel,
    metrics,
    cards,
    brandUpdateLabel
  },
  "productionPage": *[_type == "productionPage" && _id == "productionPage"][0] {
    _id,
    _type,
    "seo": {
      "seoTitle": seo.seoTitle,
      "seoDescription": seo.seoDescription,
      "seoImage": coalesce(seo.seoImage.asset->url, seo.seoImageUrl),
      "noIndex": seo.noIndex
    },
    intro,
    glanceLabel,
    glanceItems,
    overviewTitle,
    overviewBody,
    "image": coalesce(imageUrl, image.asset->url),
    imageAlt,
    qualityKicker,
    qualityTitle,
    qualityParagraphs,
    activationKicker,
    activationSteps,
    activationNote,
    contactTextBeforeEmail,
    contactTextAfterEmail
  },
  "products": *[_type == "product"] | order(coalesce(sortOrder, 999) asc, name asc) {
    _id,
    _type,
    "slug": coalesce(slug.current, slug),
    "seo": {
      "seoTitle": seo.seoTitle,
      "seoDescription": seo.seoDescription,
      "seoImage": coalesce(seo.seoImage.asset->url, seo.seoImageUrl),
      "noIndex": seo.noIndex
    },
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
    "seo": {
      "seoTitle": seo.seoTitle,
      "seoDescription": seo.seoDescription,
      "seoImage": coalesce(seo.seoImage.asset->url, seo.seoImageUrl),
      "noIndex": seo.noIndex
    },
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
    "seo": {
      "seoTitle": seo.seoTitle,
      "seoDescription": seo.seoDescription,
      "seoImage": coalesce(seo.seoImage.asset->url, seo.seoImageUrl),
      "noIndex": seo.noIndex
    },
    title,
    type,
    summary,
    detail,
    bullets
  }
}`;

function readToken() {
  return process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN;
}

export function createSanityClient({ preview = false, studioUrl = sanityStudioUrl }: SanityClientOptions = {}) {
  if (!isSanityConfigured) {
    return null;
  }

  const token = preview ? readToken() : undefined;

  if (preview && !token) {
    throw new Error('Missing SANITY_API_READ_TOKEN for draft preview.');
  }

  return createClient({
    projectId: sanityProjectId!,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    useCdn: false,
    token,
    perspective: preview ? 'previewDrafts' : 'published',
    stega: preview
      ? {
          enabled: true,
          studioUrl,
        }
      : false,
  });
}

export async function fetchSanitySiteContent({
  preview = false,
  studioUrl,
}: SanityClientOptions = {}): Promise<SanitySiteContent | null> {
  const client = createSanityClient({ preview, studioUrl });

  if (!client) {
    return null;
  }

  const data = (await client.fetch<SanitySiteContent>(
    siteContentQuery,
    { siteId: configuredSiteId },
    {
      filterResponse: false,
      resultSourceMap: preview ? 'withKeyArraySelector' : false,
      cache: 'no-store' as const,
    },
  )) as unknown;

  return (data as { result?: SanitySiteContent }).result || (data as SanitySiteContent);
}
