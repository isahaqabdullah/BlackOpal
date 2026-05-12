import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { applications, homePageContent, newsroomItems, products, productionPageContent, type ContentSection } from '../src/app/content/siteContent';
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

function sectionsForSanity(sections: ContentSection[]) {
  return sections.map((section, index) => ({
    _type: 'contentSection',
    _key: keyFrom(section.title, index),
    title: section.title,
    body: section.body,
    bullets: section.bullets,
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

const homePageDocuments: SanityDocument[] = ['black-opal-india', 'black-opal-middle-east'].map((siteId) => ({
  _id: `homePage-${siteId}`,
  _type: 'homePage',
  ...homePageContent,
  seo: seoFor('/'),
  siteId,
}));

const productionPageDocument: SanityDocument = {
  _id: 'productionPage',
  _type: 'productionPage',
  ...productionPageContent,
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

const documents = [...homePageDocuments, productionPageDocument, ...productDocuments, ...applicationDocuments, ...newsroomDocuments];
const ndjson = `${documents.map((document) => JSON.stringify(document)).join('\n')}\n`;

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, ndjson);

console.log(`Wrote ${documents.length} Sanity documents to ${outputPath}`);
