import type { MetadataRoute } from 'next';
import { getPublishedSeoContent } from './cms/siteContent';
import { resourceDetailPagePaths } from './content/resourcePages';
import { supplierLandingPagePaths } from './content/supplierLandingPages';
import { absoluteUrl } from './seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getPublishedSeoContent();
  const routes = [
    '/',
    '/activated-carbon-suppliers',
    ...supplierLandingPagePaths,
    '/products',
    ...content.products.map((product) => `/products/${product.slug}`),
    '/applications',
    ...content.applications.map((application) => `/applications/${application.slug}`),
    '/production',
    '/resources',
    ...resourceDetailPagePaths,
    '/about',
    '/newsroom',
    ...content.newsroomItems.filter((item) => item.type === 'press-release').map((item) => `/newsroom/${item.slug}`),
    '/contact',
  ];

  return [...new Set(routes)].map((route) => ({
    url: absoluteUrl(route),
    lastModified: new Date(),
  }));
}
