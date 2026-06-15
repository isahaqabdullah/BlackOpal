import { createClient } from '@sanity/client';
import type { SanitySiteContent } from '../content/siteContentResolver';
import { sanityFetch } from './live';
import {
  configuredSiteId,
  isSanityConfigured,
  readSanityServerToken,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityStudioUrl,
} from './sanityConfig';

export {
  configuredSiteId,
  isSanityConfigured,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityStudioUrl,
};

type SanityClientOptions = {
  preview?: boolean;
  studioUrl?: string;
};

export const siteContentQuery = `{
  "homePage": *[
    _type == "homePage" &&
    (_id == $homePageId || siteId == $siteId || (!defined(siteId) && _id == "homePage"))
  ] | order(select(_id == $homePageId => 0, siteId == $siteId => 1, 2))[0] {
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
    trustCertificationLinkLabel,
    trustCertificationLinkUrl,
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
  "siteSettings": *[
    _type == "siteSettings" &&
    (_id == $siteSettingsId || siteId == $siteId)
  ] | order(select(_id == $siteSettingsId => 0, siteId == $siteId => 1, 2))[0] {
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
  "aboutPage": *[
    _type == "aboutPage" &&
    (_id == $aboutPageId || siteId == $siteId)
  ] | order(select(_id == $aboutPageId => 0, siteId == $siteId => 1, 2))[0] {
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
    packagingKicker,
    packagingTitle,
    packagingBody,
    packagingMedia[] {
      _key,
      mediaType,
      title,
      caption,
      imageUrl,
      videoUrl,
      mediaAlt
    },
    packagingDocumentLabel,
    packagingDocumentUrl,
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
    bullets,
    documentUrl,
    documentLabel
  }
}`;

export function createSanityClient({ preview = false, studioUrl = sanityStudioUrl }: SanityClientOptions = {}) {
  if (!isSanityConfigured) {
    return null;
  }

  const token = preview ? readSanityServerToken() : undefined;

  if (preview && !token) {
    throw new Error('Missing SANITY_API_READ_TOKEN for draft preview.');
  }

  return createClient({
    projectId: sanityProjectId!,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    useCdn: !preview,
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
  if (!isSanityConfigured) {
    return null;
  }

  const params = {
    siteId: configuredSiteId,
    homePageId: `homePage-${configuredSiteId}`,
    siteSettingsId: `siteSettings-${configuredSiteId}`,
    aboutPageId: `aboutPage-${configuredSiteId}`,
  };

  if (process.env.NODE_ENV !== 'production') {
    const client = createSanityClient({ preview, studioUrl });
    return client?.fetch<SanitySiteContent>(siteContentQuery, params, {
      tag: 'black-opal.site-content',
    }) ?? null;
  }

  const { data } = await sanityFetch({
    query: siteContentQuery,
    params,
    perspective: preview ? 'drafts' : 'published',
    stega: preview,
    requestTag: 'black-opal.site-content',
  });

  return data as SanitySiteContent;
}
