import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool, type StructureResolver } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  'replace-with-project-id';
const dataset =
  process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const studioSiteId =
  process.env.SANITY_STUDIO_SITE_ID || process.env.NEXT_PUBLIC_SITE_ID || 'black-opal-india';
const previewOrigin =
  process.env.SANITY_STUDIO_PREVIEW_ORIGIN || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const studioSiteIdLiteral = JSON.stringify(studioSiteId);
const studioSiteLabel = studioSiteId === 'black-opal-middle-east' ? 'Middle East' : 'India';

function originFor(value: string | undefined) {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function documentLocation(title: string, href: string) {
  return { title, href };
}

const allowOrigins = Array.from(
  new Set(
    [
      originFor(previewOrigin),
      originFor(process.env.NEXT_PUBLIC_SITE_URL),
      'https://black-opal-india.vercel.app',
      'https://black-opal-middle-east.vercel.app',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ].filter((origin): origin is string => Boolean(origin)),
  ),
);

const structure: StructureResolver = (S) => {
  const singletonDocument = (schemaType: string, title: string, documentId: string) =>
    S.listItem()
      .id(documentId)
      .title(title)
      .schemaType(schemaType)
      .child(S.document().schemaType(schemaType).documentId(documentId).title(title));

  return S.list()
    .title('Content')
    .items([
      singletonDocument('homePage', `Home Page - ${studioSiteLabel}`, `homePage-${studioSiteId}`),
      singletonDocument('aboutPage', `About Page - ${studioSiteLabel}`, `aboutPage-${studioSiteId}`),
      singletonDocument('siteSettings', `Page Intro Labels - ${studioSiteLabel}`, `siteSettings-${studioSiteId}`),
      singletonDocument('pageCopy', 'Products, Applications, and Newsroom Copy', 'pageCopy'),
      singletonDocument('productionPage', 'Production Page', 'productionPage'),
      S.documentTypeListItem('product').title('Products'),
      S.documentTypeListItem('application').title('Applications'),
      S.documentTypeListItem('newsroomItem').title('Newsroom Items'),
    ]);
};

export default defineConfig({
  name: 'black-opal-cms',
  title: 'Black Opal CMS',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      title: 'Visual Editor',
      previewUrl: {
        initial: previewOrigin,
        previewMode: {
          enable: `${previewOrigin}/api/draft-mode/enable`,
          disable: `${previewOrigin}/api/draft-mode/disable`,
        },
      },
      allowOrigins,
      resolve: {
        mainDocuments: [
          { route: '/', filter: `_type == "homePage" && siteId == ${studioSiteIdLiteral}` },
          { route: '/about', filter: `_type == "aboutPage" && siteId == ${studioSiteIdLiteral}` },
          { route: '/production', filter: `_type == "productionPage" && _id == "productionPage"` },
          { route: '/products', filter: `_type == "pageCopy" && _id == "pageCopy"` },
          { route: '/products/:productSlug', filter: `_type == "product" && slug.current == $productSlug` },
          { route: '/applications', filter: `_type == "pageCopy" && _id == "pageCopy"` },
          { route: '/applications/:applicationSlug', filter: `_type == "application" && slug.current == $applicationSlug` },
          { route: '/newsroom', filter: `_type == "pageCopy" && _id == "pageCopy"` },
          { route: '/newsroom/:storySlug', filter: `_type == "newsroomItem" && slug.current == $storySlug` },
        ],
        locations: {
          homePage: {
            select: { title: 'heroTitle', siteId: 'siteId' },
            resolve: (document) => ({
              locations:
                document?.siteId === studioSiteId
                  ? [documentLocation(document.title || 'Home page', '/')]
                  : [],
            }),
          },
          productionPage: {
            select: { title: 'overviewTitle' },
            resolve: () => ({
              locations: [documentLocation('Production page', '/production')],
            }),
          },
          siteSettings: {
            select: { siteId: 'siteId' },
            resolve: (document) => ({
              locations: [
                ...(document?.siteId === studioSiteId
                  ? [
                      documentLocation('Page intro labels', '/products'),
                    ]
                  : []),
              ],
            }),
          },
          pageCopy: {
            select: { title: '_id' },
            resolve: () => ({
              locations: [
                documentLocation('Products listing', '/products'),
                documentLocation('Product detail template', '/products/granular'),
                documentLocation('Applications listing', '/applications'),
                documentLocation('Application detail template', '/applications/water-treatment'),
                documentLocation('Newsroom listing', '/newsroom'),
                documentLocation('Newsroom detail template', '/newsroom/name-change-press-release'),
                documentLocation('Home page newsroom preview', '/'),
              ],
            }),
          },
          aboutPage: {
            select: { title: 'intro.title', siteId: 'siteId' },
            resolve: (document) => ({
              locations: document?.siteId === studioSiteId ? [documentLocation('About page', '/about')] : [],
            }),
          },
          product: {
            select: { title: 'name', slug: 'slug.current' },
            resolve: (document) => ({
              locations: document?.slug
                ? [
                    documentLocation(document.title || 'Product detail', `/products/${document.slug}`),
                    documentLocation('Products listing', '/products'),
                    documentLocation('Home page feature areas', '/'),
                  ]
                : [documentLocation('Products listing', '/products')],
            }),
          },
          application: {
            select: { title: 'name', slug: 'slug.current' },
            resolve: (document) => ({
              locations: document?.slug
                ? [
                    documentLocation(document.title || 'Application detail', `/applications/${document.slug}`),
                    documentLocation('Applications listing', '/applications'),
                    documentLocation('Home page feature areas', '/'),
                  ]
                : [documentLocation('Applications listing', '/applications')],
            }),
          },
          newsroomItem: {
            select: { title: 'title', slug: 'slug.current' },
            resolve: (document) => ({
              locations: document?.slug
                ? [
                    documentLocation(document.title || 'Newsroom detail', `/newsroom/${document.slug}`),
                    documentLocation('Newsroom listing', '/newsroom'),
                    documentLocation('Home page preview', '/'),
                  ]
                : [documentLocation('Newsroom listing', '/newsroom')],
            }),
          },
        },
      },
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
