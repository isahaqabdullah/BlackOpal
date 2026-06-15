import { existsSync, readFileSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createClient } from '@sanity/client';

export const CMS_DOCUMENT_TYPES = [
  'homePage',
  'siteSettings',
  'pageCopy',
  'aboutPage',
  'productionPage',
  'product',
  'application',
  'newsroomItem',
];
export const SITE_IDS = ['black-opal-india', 'black-opal-middle-east'];

export const cmsDocumentsProjection = `{
  _id,
  _type,
  _rev,
  _type == "homePage" => {
    seo,
    siteId,
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
  _type == "siteSettings" => {
    siteId,
    pageIntro {
      breadcrumbAriaLabel,
      homeLabel,
      homePath
    }
  },
  _type == "pageCopy" => {
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
  _type == "aboutPage" => {
    siteId,
    seo,
    intro,
    titleLogoImage,
    heroImage,
    heroImageUrl,
    heroImageAlt,
    storyTitle,
    storyParagraphs,
    officeNetworkLabel,
    metrics,
    cards,
    brandUpdateLabel
  },
  _type == "productionPage" => {
    seo,
    intro,
    glanceLabel,
    glanceItems,
    overviewTitle,
    overviewBody,
    image,
    imageUrl,
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
    packagingMedia,
    packagingDocumentLabel,
    packagingDocumentUrl,
    contactTextBeforeEmail,
    contactTextAfterEmail
  },
  _type == "product" => {
    seo,
    sortOrder,
    name,
    shortName,
    slug,
    summary,
    intro,
    highlights,
    commonUses,
    grades,
    sections,
    image,
    imageUrl
  },
  _type == "application" => {
    seo,
    sortOrder,
    name,
    slug,
    summary,
    intro,
    keyPoints,
    recommendedProducts,
    grades,
    sections,
    image,
    imageUrl
  },
  _type == "newsroomItem" => {
    seo,
    publishedAt,
    title,
    slug,
    type,
    summary,
    detail,
    bullets,
    documentUrl,
    documentLabel
  }
}`;

const cmsDocumentsQuery = `*[_type in $types] | order(
  _type asc,
  coalesce(siteId, ""),
  coalesce(sortOrder, 999),
  coalesce(slug.current, ""),
  _id asc
) ${cmsDocumentsProjection}`;

const cmsDocumentsByIdQuery = `*[_id in $ids] | order(_id asc) ${cmsDocumentsProjection}`;

function readEnvFile(filePath) {
  if (!existsSync(filePath)) {
    return {};
  }

  return Object.fromEntries(
    readFileSync(filePath, 'utf8')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const separatorIndex = line.indexOf('=');
        const key = line.slice(0, separatorIndex).trim();
        const rawValue = line.slice(separatorIndex + 1).trim();
        const value =
          (rawValue.startsWith('"') && rawValue.endsWith('"')) ||
          (rawValue.startsWith("'") && rawValue.endsWith("'"))
            ? rawValue.slice(1, -1)
            : rawValue;
        return [key, value];
      }),
  );
}

export function readSanityEnv() {
  return {
    ...readEnvFile(path.resolve('.env')),
    ...readEnvFile(path.resolve('.env.local')),
    ...process.env,
  };
}

export function readSanityConfig() {
  const env = readSanityEnv();
  const projectId = env.SANITY_STUDIO_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = env.SANITY_STUDIO_DATASET || env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION || env.SANITY_API_VERSION || '2026-04-15';
  const readToken = env.SANITY_API_READ_TOKEN || env.SANITY_API_TOKEN;
  const writeToken = env.SANITY_API_WRITE_TOKEN || env.SANITY_API_TOKEN;

  if (!projectId || !dataset) {
    throw new Error('Missing Sanity project ID or dataset configuration.');
  }

  return { apiVersion, dataset, projectId, readToken, writeToken };
}

export function createSanitySyncClient({ write = false } = {}) {
  const config = readSanityConfig();
  const token = write ? config.writeToken : config.readToken;

  if (write && !token) {
    throw new Error('Missing SANITY_API_WRITE_TOKEN or SANITY_API_TOKEN for write operations.');
  }

  return createClient({
    apiVersion: config.apiVersion,
    dataset: config.dataset,
    projectId: config.projectId,
    token,
    useCdn: false,
    perspective: 'published',
  });
}

export async function fetchCmsDocuments(client) {
  return client.fetch(cmsDocumentsQuery, { types: CMS_DOCUMENT_TYPES });
}

export async function fetchCmsDocumentsById(client, ids) {
  if (!ids.length) {
    return [];
  }

  return client.fetch(cmsDocumentsByIdQuery, { ids });
}

const preferredKeyOrder = [
  '_id',
  '_type',
  '_rev',
  'siteId',
  'sortOrder',
  'publishedAt',
  'name',
  'shortName',
  'title',
  'slug',
  'type',
];

function sortKeys(keys) {
  return [...keys].sort((left, right) => {
    const leftIndex = preferredKeyOrder.indexOf(left);
    const rightIndex = preferredKeyOrder.indexOf(right);

    if (leftIndex !== -1 || rightIndex !== -1) {
      return (leftIndex === -1 ? 999 : leftIndex) - (rightIndex === -1 ? 999 : rightIndex);
    }

    return left.localeCompare(right);
  });
}

export function stableValue(value) {
  if (Array.isArray(value)) {
    return value.map(stableValue);
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  return Object.fromEntries(sortKeys(Object.keys(value)).map((key) => [key, stableValue(value[key])]));
}

export function stableStringify(value) {
  return JSON.stringify(stableValue(value));
}

export function stripRevision(document) {
  const { _rev, ...rest } = document;
  return rest;
}

export function systemlessFields(document) {
  return Object.fromEntries(
    Object.entries(document).filter(([key]) => !['_id', '_type', '_rev'].includes(key)),
  );
}

export function documentForCreate(document) {
  return stripRevision(document);
}

export function snapshotPathForDataset(dataset) {
  return path.resolve('sanity/snapshots', `${dataset}.ndjson`);
}

export async function writeSnapshot(filePath, documents) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const content = `${documents.map((document) => stableStringify(document)).join('\n')}\n`;
  await writeFile(filePath, content);
}

export async function readSnapshot(filePath) {
  const content = await readFile(filePath, 'utf8');

  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const document = JSON.parse(line);

      if (!document._id || !document._type || !document._rev) {
        throw new Error(`Invalid snapshot document on line ${index + 1}: _id, _type, and _rev are required.`);
      }

      if (String(document._id).startsWith('drafts.')) {
        throw new Error(`Draft document snapshots are not supported: ${document._id}`);
      }

      return document;
    });
}

export function parseSnapshotArg(argv) {
  const fileFlagIndex = argv.findIndex((arg) => arg === '--file' || arg === '--snapshot');
  const config = readSanityConfig();

  if (fileFlagIndex !== -1) {
    const filePath = argv[fileFlagIndex + 1];

    if (!filePath) {
      throw new Error(`${argv[fileFlagIndex]} requires a file path.`);
    }

    return path.resolve(filePath);
  }

  return snapshotPathForDataset(config.dataset);
}
