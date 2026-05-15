import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  aboutPageContent,
  applications,
  homePageContent,
  newsroomItems,
  pageCopyContent,
  products,
  productionPageContent,
  siteSettingsContent,
  type ContentSection,
  type FeatureCardEntry,
  type FeaturedCapabilityEntry,
  type LabelValueEntry,
  type PageIntroContent,
  type ProductionStepEntry,
} from '../src/app/content/siteContent';
import { resolveSeo } from '../src/app/seo';

type SanityDocument = Record<string, unknown> & {
  _id: string;
  _type: string;
};

const outputPath = path.resolve('sanity/seed.ndjson');

function slugField(slug: string) {
  return { _type: 'slug', current: slug };
}

function keyFrom(value: string, index: number) {
  const normalized = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${normalized || 'item'}-${index}`;
}

function omitFields<T extends Record<string, unknown>>(source: T, fields: string[]) {
  return Object.fromEntries(Object.entries(source).filter(([key]) => !fields.includes(key)));
}

function sectionsForSanity(sections: ContentSection[]) {
  return sections.map((section, index) => ({
    _type: 'contentSection',
    _key: keyFrom(section.title, index),
    title: section.title,
    body: section.body,
    bullets: section.bullets,
  }));
}

function labelValuesForSanity(items: LabelValueEntry[]) {
  return items.map((item, index) => ({
    _type: 'labelValueEntry',
    _key: keyFrom(`${item.value}-${item.label}`, index),
    value: item.value,
    label: item.label,
  }));
}

function featureCardsForSanity(cards: FeatureCardEntry[]) {
  return cards.map((card, index) => ({
    _type: 'featureCardEntry',
    _key: keyFrom(card.title, index),
    icon: card.icon,
    title: card.title,
    desc: card.desc,
  }));
}

function pageIntroForSanity(intro: PageIntroContent) {
  return {
    _type: 'pageIntro',
    label: intro.label,
    title: intro.title,
    description: intro.description,
    breadcrumbLabel: intro.breadcrumbLabel,
  };
}

function featuredCapabilitiesForSanity(capabilities: FeaturedCapabilityEntry[]) {
  return capabilities.map((capability, index) => ({
    _type: 'featuredCapabilityEntry',
    _key: keyFrom(capability.title, index),
    label: capability.label,
    title: capability.title,
    copy: capability.copy,
    highlights: capability.highlights,
    imageSource: capability.imageSource,
    imageSlug: capability.imageSlug,
    imageUrl: capability.imageUrl,
    imageAlt: capability.imageAlt,
  }));
}

function productionStepsForSanity(steps: ProductionStepEntry[]) {
  return steps.map((step, index) => ({
    _type: 'productionStepEntry',
    _key: keyFrom(`${step.step}-${step.title}`, index),
    step: step.step,
    title: step.title,
    body: step.body,
  }));
}

function seoFor(pathname: string) {
  const metadata = resolveSeo(pathname);

  return {
    seoTitle: metadata.title,
    seoDescription: metadata.description,
    noIndex: metadata.noindex ?? false,
  };
}

const productDocuments: SanityDocument[] = products.map((product, index) => ({
  _id: `product-${product.slug}`,
  _type: 'product',
  seo: seoFor(`/products/${product.slug}`),
  sortOrder: index + 1,
  name: product.name,
  shortName: product.shortName,
  slug: slugField(product.slug),
  summary: product.summary,
  intro: product.intro,
  highlights: product.highlights,
  commonUses: product.commonUses,
  grades: product.grades,
  sections: sectionsForSanity(product.sections),
  imageUrl: product.image,
}));

const homePageButtonFields = [
  'heroPrimaryCtaPath',
  'heroPrimaryCtaLabel',
  'heroSecondaryCtaPath',
  'heroSecondaryCtaLabel',
  'productCardCtaLabel',
  'applicationCardCtaLabel',
  'companyAboutCtaPath',
  'companyAboutCtaLabel',
  'companyProductionCtaPath',
  'companyProductionCtaLabel',
  'ctaPrimaryPath',
  'ctaPrimaryLabel',
  'ctaSecondaryPath',
  'ctaSecondaryLabel',
  'featuredCapabilitiesPreviousLabel',
  'featuredCapabilitiesNextLabel',
  'featuredCapabilitiesShowLabelPrefix',
];

const homePageDocuments: SanityDocument[] = ['black-opal-india', 'black-opal-middle-east'].map((siteId) => ({
  _id: `homePage-${siteId}`,
  _type: 'homePage',
  ...omitFields(homePageContent as unknown as Record<string, unknown>, homePageButtonFields),
  companyMetrics: labelValuesForSanity(homePageContent.companyMetrics),
  whyReasons: featureCardsForSanity(homePageContent.whyReasons),
  featuredCapabilities: featuredCapabilitiesForSanity(homePageContent.featuredCapabilities),
  seo: seoFor('/'),
  siteId,
}));

const siteSettingsDocuments: SanityDocument[] = ['black-opal-india', 'black-opal-middle-east'].map((siteId) => ({
  _id: `siteSettings-${siteId}`,
  _type: 'siteSettings',
  siteId,
  pageIntro: omitFields(siteSettingsContent.pageIntro, ['backHomeLabel', 'backHomePath']),
}));

const productsPageButtonFields = ['detailCtaLabel', 'quoteCtaPath', 'quoteCtaLabel'];
const productDetailButtonFields = ['allProductsCtaPath', 'allProductsCtaLabel', 'quoteCtaPath', 'quoteCtaLabel'];
const applicationsPageButtonFields = ['detailCtaLabel', 'discussCtaPath', 'discussCtaLabel'];
const applicationDetailButtonFields = ['discussCtaPath', 'discussCtaLabel'];
const newsroomPageButtonFields = ['brandDetailsCtaLabel', 'latestVersionCtaPath', 'latestVersionCtaLabel'];
const newsroomPreviewButtonFields = [
  'resourceCenterCtaPath',
  'resourceCenterCtaLabel',
  'brandUpdateCtaLabel',
  'requestResourceCtaPath',
  'requestResourceCtaLabel',
];
const pressReleaseButtonFields = ['salesCoordinationCtaPath', 'salesCoordinationCtaLabel'];
const notFoundButtonFields = ['homeCtaPath', 'homeCtaLabel', 'secondaryCtaPath', 'secondaryCtaLabel'];

const pageCopyDocument: SanityDocument = {
  _id: 'pageCopy',
  _type: 'pageCopy',
  productsPage: {
    ...omitFields(pageCopyContent.productsPage as unknown as Record<string, unknown>, productsPageButtonFields),
    intro: pageIntroForSanity(pageCopyContent.productsPage.intro),
  },
  productDetailPage: omitFields(
    pageCopyContent.productDetailPage as unknown as Record<string, unknown>,
    productDetailButtonFields,
  ),
  applicationsPage: {
    ...omitFields(pageCopyContent.applicationsPage as unknown as Record<string, unknown>, applicationsPageButtonFields),
    intro: pageIntroForSanity(pageCopyContent.applicationsPage.intro),
  },
  applicationDetailPage: omitFields(
    pageCopyContent.applicationDetailPage as unknown as Record<string, unknown>,
    applicationDetailButtonFields,
  ),
  newsroomPage: {
    ...omitFields(pageCopyContent.newsroomPage as unknown as Record<string, unknown>, newsroomPageButtonFields),
    intro: pageIntroForSanity(pageCopyContent.newsroomPage.intro),
  },
  newsroomPreview: omitFields(
    pageCopyContent.newsroomPreview as unknown as Record<string, unknown>,
    newsroomPreviewButtonFields,
  ),
  pressReleasePage: omitFields(
    pageCopyContent.pressReleasePage as unknown as Record<string, unknown>,
    pressReleaseButtonFields,
  ),
  notFoundPage: omitFields(pageCopyContent.notFoundPage as unknown as Record<string, unknown>, notFoundButtonFields),
};

const { heroImage: aboutHeroImage } = aboutPageContent;
const aboutPageSeedContent = omitFields(aboutPageContent as unknown as Record<string, unknown>, [
  'heroImage',
  'brandTransitionCtaLabel',
  'productionCapabilityCtaLabel',
]);
const aboutPageDocuments: SanityDocument[] = ['black-opal-india', 'black-opal-middle-east'].map((siteId) => ({
  _id: `aboutPage-${siteId}`,
  _type: 'aboutPage',
  ...aboutPageSeedContent,
  siteId,
  intro: pageIntroForSanity(aboutPageContent.intro),
  metrics: labelValuesForSanity(aboutPageContent.metrics),
  cards: featureCardsForSanity(aboutPageContent.cards),
  heroImageUrl: aboutHeroImage,
}));

const { image: productionImage } = productionPageContent;
const productionPageSeedContent = omitFields(productionPageContent as unknown as Record<string, unknown>, [
  'image',
  'contactButtonLabel',
]);
const productionPageDocument: SanityDocument = {
  _id: 'productionPage',
  _type: 'productionPage',
  ...productionPageSeedContent,
  intro: pageIntroForSanity(productionPageContent.intro),
  glanceItems: labelValuesForSanity(productionPageContent.glanceItems),
  activationSteps: productionStepsForSanity(productionPageContent.activationSteps),
  imageUrl: productionImage,
};

const applicationDocuments: SanityDocument[] = applications.map((application, index) => ({
  _id: `application-${application.slug}`,
  _type: 'application',
  seo: seoFor(`/applications/${application.slug}`),
  sortOrder: index + 1,
  name: application.name,
  slug: slugField(application.slug),
  summary: application.summary,
  intro: application.intro,
  keyPoints: application.keyPoints,
  recommendedProducts: application.recommendedProducts,
  grades: application.grades,
  sections: sectionsForSanity(application.sections),
  imageUrl: application.image,
}));

const newsroomDocuments: SanityDocument[] = newsroomItems.map((item, index) => ({
  _id: `newsroom-item-${item.slug}`,
  _type: 'newsroomItem',
  seo: seoFor(`/newsroom/${item.slug}`),
  publishedAt: new Date(Date.UTC(2026, 0, 1, 12, newsroomItems.length - index)).toISOString(),
  title: item.title,
  slug: slugField(item.slug),
  type: item.type,
  summary: item.summary,
  detail: item.detail,
  bullets: item.bullets,
}));

const documents = [
  ...homePageDocuments,
  ...siteSettingsDocuments,
  pageCopyDocument,
  ...aboutPageDocuments,
  productionPageDocument,
  ...productDocuments,
  ...applicationDocuments,
  ...newsroomDocuments,
];
const ndjson = `${documents.map((document) => JSON.stringify(document)).join('\n')}\n`;

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, ndjson);

console.log(`Wrote ${documents.length} Sanity documents to ${outputPath}`);
