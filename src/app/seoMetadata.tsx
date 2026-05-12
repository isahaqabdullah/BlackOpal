import type { Metadata } from 'next';
import { absoluteUrl, buildJsonLd, resolveSeo } from './seo';
import { getSeoContent } from './cms/siteContent';
import { siteConfig } from './config/siteConfig';

function jsonForHtml(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
}

export async function generateRouteMetadata(path: string): Promise<Metadata> {
  const content = await getSeoContent();
  const metadata = resolveSeo(path, content);
  const canonical = absoluteUrl(metadata.path);
  const image = metadata.image ? absoluteUrl(metadata.image) : absoluteUrl(siteConfig.defaultImagePath);
  const shouldIndex = !metadata.noindex;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: {
      canonical,
    },
    robots: {
      index: shouldIndex,
      follow: shouldIndex,
    },
    openGraph: {
      siteName: siteConfig.siteName,
      type: metadata.type === 'article' ? 'article' : 'website',
      title: metadata.title,
      description: metadata.description,
      url: canonical,
      images: [
        {
          url: image,
          alt: metadata.imageAlt || siteConfig.siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [image],
    },
  };
}

export async function RouteStructuredData({ path }: { path: string }) {
  const content = await getSeoContent();
  const metadata = resolveSeo(path, content);
  const jsonLd = buildJsonLd(metadata, content);

  return (
    <script
      id="route-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonForHtml(jsonLd) }}
    />
  );
}
