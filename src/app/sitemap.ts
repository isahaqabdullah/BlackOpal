import type { MetadataRoute } from 'next';
import { getPublishedSeoContent } from './cms/siteContent';
import { absoluteUrl } from './seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getPublishedSeoContent();
  const routes = [
    '/',
    '/products',
    ...content.products.map((product) => `/products/${product.slug}`),
    '/applications',
    ...content.applications.map((application) => `/applications/${application.slug}`),
    '/production',
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
