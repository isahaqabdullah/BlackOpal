import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { applications, homePageContent, newsroomItems, products, type ContentSection } from '../src/app/content/siteContent';

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

const productDocuments: SanityDocument[] = products.map((product, index) => ({
  _id: `product-${product.slug}`,
  _type: 'product',
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
  siteId,
}));

const applicationDocuments: SanityDocument[] = applications.map((application, index) => ({
  _id: `application-${application.slug}`,
  _type: 'application',
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
  publishedAt: new Date(Date.UTC(2026, 0, 1, 12, newsroomItems.length - index)).toISOString(),
  title: item.title,
  slug: slugField(item.slug),
  type: item.type,
  summary: item.summary,
  detail: item.detail,
  bullets: item.bullets,
}));

const documents = [...homePageDocuments, ...productDocuments, ...applicationDocuments, ...newsroomDocuments];
const ndjson = `${documents.map((document) => JSON.stringify(document)).join('\n')}\n`;

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, ndjson);

console.log(`Wrote ${documents.length} Sanity documents to ${outputPath}`);
