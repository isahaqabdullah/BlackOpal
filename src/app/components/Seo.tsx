import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { siteConfig } from '../config/siteConfig';
import { absoluteUrl, buildJsonLd, resolveSeo } from '../seo';

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function upsertCanonical(href: string) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }

  element.href = href;
}

function upsertJsonLd(jsonLd: Record<string, unknown>) {
  const id = 'route-structured-data';
  let element = document.getElementById(id) as HTMLScriptElement | null;

  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(jsonLd);
}

export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = resolveSeo(pathname);
    const canonicalUrl = absoluteUrl(metadata.path);
    const image = metadata.image || absoluteUrl('/og-image.svg');
    const robots = metadata.noindex ? 'noindex, nofollow' : 'index, follow';

    document.documentElement.lang = 'en-US';
    document.title = metadata.title;

    upsertMeta('name', 'description', metadata.description);
    upsertMeta('name', 'robots', robots);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', metadata.title);
    upsertMeta('name', 'twitter:description', metadata.description);
    upsertMeta('name', 'twitter:image', image);

    upsertMeta('property', 'og:site_name', siteConfig.siteName);
    upsertMeta('property', 'og:type', metadata.type || 'website');
    upsertMeta('property', 'og:title', metadata.title);
    upsertMeta('property', 'og:description', metadata.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', image);

    if (metadata.imageAlt) {
      upsertMeta('property', 'og:image:alt', metadata.imageAlt);
    }

    upsertCanonical(canonicalUrl);
    upsertJsonLd(buildJsonLd(metadata));
  }, [pathname]);

  return null;
}
