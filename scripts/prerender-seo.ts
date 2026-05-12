import { existsSync, readFileSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

type SluggedItem = {
  slug: string;
  name?: string;
  title?: string;
  summary?: string;
  intro?: string;
  image?: string;
  highlights?: string[];
  commonUses?: string[];
  keyPoints?: string[];
  sections?: Array<{ title?: string; body?: string; bullets?: string[] }>;
  detail?: string[];
  bullets?: string[];
  type?: string;
};

type SeoContent = {
  products: SluggedItem[];
  applications: SluggedItem[];
  productMap: Record<string, SluggedItem>;
  applicationMap: Record<string, SluggedItem>;
  newsroomMap: Record<string, SluggedItem>;
};

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(rootDir, 'dist');
const inheritedEnvKeys = new Set(Object.keys(process.env));

function loadEnvFile(filename: string) {
  const filePath = join(rootDir, filename);

  if (!existsSync(filePath)) {
    return;
  }

  readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .forEach((line) => {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith('#')) {
        return;
      }

      const separatorIndex = trimmed.indexOf('=');
      if (separatorIndex === -1) {
        return;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      let value = trimmed.slice(separatorIndex + 1).trim();

      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      if (!inheritedEnvKeys.has(key)) {
        process.env[key] = value;
      }
    });
}

function mapBySlug<T extends SluggedItem>(items: T[]) {
  return Object.fromEntries(items.map((item) => [item.slug, item])) as Record<string, T>;
}

function cleanText(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function cleanStringArray(value: unknown, fallback: string[] = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  const values = value.map((item) => cleanText(item)).filter(Boolean);
  return values.length ? values : fallback;
}

function mergeSluggedItems<T extends SluggedItem>(cmsItems: Partial<T>[] | undefined, fallbackItems: T[]) {
  if (!cmsItems?.length) {
    return fallbackItems;
  }

  const fallbackMap = mapBySlug(fallbackItems);
  const seen = new Set<string>();
  const merged = cmsItems
    .map((item) => {
      const slug = cleanText(item.slug);
      if (!slug) {
        return null;
      }

      const fallback = fallbackMap[slug] || ({} as T);

      return {
        ...fallback,
        ...item,
        slug,
        image: cleanText(item.image, fallback.image),
        summary: cleanText(item.summary, fallback.summary),
        intro: cleanText(item.intro, fallback.intro),
        highlights: cleanStringArray(item.highlights, fallback.highlights),
        commonUses: cleanStringArray(item.commonUses, fallback.commonUses),
        keyPoints: cleanStringArray(item.keyPoints, fallback.keyPoints),
        detail: cleanStringArray(item.detail, fallback.detail),
        bullets: cleanStringArray(item.bullets, fallback.bullets),
      } as T;
    })
    .filter((item): item is T => Boolean(item))
    .filter((item) => {
      if (seen.has(item.slug)) {
        return false;
      }

      seen.add(item.slug);
      return true;
    });

  return [...merged, ...fallbackItems.filter((item) => !seen.has(item.slug))];
}

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttribute(value: unknown) {
  return escapeHtml(value).replace(/`/g, '&#96;');
}

function escapeJsonForScript(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
}

function absoluteRouteUrl(siteUrl: string, route: string) {
  return route === '/' ? `${siteUrl}/` : `${siteUrl}${route}`;
}

function routeOutputPath(route: string) {
  if (route === '/') {
    return join(distDir, 'index.html');
  }

  return join(distDir, route.replace(/^\/+/, ''), 'index.html');
}

function removeExistingSeoTags(html: string) {
  return html
    .replace(/\s*<title>[\s\S]*?<\/title>/gi, '')
    .replace(/\s*<meta\s+(?:name|property)=["'](?:description|robots|twitter:[^"']+|og:[^"']+)["'][^>]*>/gi, '')
    .replace(/\s*<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '')
    .replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, '')
    .replace(/\s*<script\s+id=["']route-structured-data["'][\s\S]*?<\/script>/gi, '');
}

function metaTags(metadata: any, jsonLd: Record<string, unknown>, siteName: string) {
  const image = metadata.image;
  const robots = metadata.noindex ? 'noindex, nofollow' : 'index, follow';
  const canonical = metadata.canonicalUrl;

  return `
      <title>${escapeHtml(metadata.title)}</title>
      <meta name="description" content="${escapeAttribute(metadata.description)}" />
      <meta name="robots" content="${robots}" />
      <link rel="canonical" href="${escapeAttribute(canonical)}" />
      <meta property="og:site_name" content="${escapeAttribute(siteName)}" />
      <meta property="og:type" content="${metadata.type || 'website'}" />
      <meta property="og:title" content="${escapeAttribute(metadata.title)}" />
      <meta property="og:description" content="${escapeAttribute(metadata.description)}" />
      <meta property="og:url" content="${escapeAttribute(canonical)}" />
      <meta property="og:image" content="${escapeAttribute(image)}" />
      ${metadata.imageAlt ? `<meta property="og:image:alt" content="${escapeAttribute(metadata.imageAlt)}" />` : ''}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${escapeAttribute(metadata.title)}" />
      <meta name="twitter:description" content="${escapeAttribute(metadata.description)}" />
      <meta name="twitter:image" content="${escapeAttribute(image)}" />
      <script id="route-structured-data" type="application/ld+json">${escapeJsonForScript(jsonLd)}</script>`;
}

function listMarkup(items: SluggedItem[], basePath: string) {
  if (!items.length) {
    return '';
  }

  return `<ul>${items
    .map(
      (item) =>
        `<li><a href="${escapeAttribute(`${basePath}/${item.slug}`)}">${escapeHtml(item.name || item.title)}</a>${
          item.summary ? ` - ${escapeHtml(item.summary)}` : ''
        }</li>`,
    )
    .join('')}</ul>`;
}

function sectionMarkup(item: SluggedItem) {
  return [
    item.intro ? `<p>${escapeHtml(item.intro)}</p>` : '',
    item.highlights?.length ? `<ul>${item.highlights.map((value) => `<li>${escapeHtml(value)}</li>`).join('')}</ul>` : '',
    item.keyPoints?.length ? `<ul>${item.keyPoints.map((value) => `<li>${escapeHtml(value)}</li>`).join('')}</ul>` : '',
    item.commonUses?.length ? `<p>Common uses: ${escapeHtml(item.commonUses.join(', '))}</p>` : '',
    item.sections?.length
      ? item.sections
          .map(
            (section) =>
              `<section><h2>${escapeHtml(section.title)}</h2>${section.body ? `<p>${escapeHtml(section.body)}</p>` : ''}${
                section.bullets?.length
                  ? `<ul>${section.bullets.map((value) => `<li>${escapeHtml(value)}</li>`).join('')}</ul>`
                  : ''
              }</section>`,
          )
          .join('')
      : '',
    item.detail?.length ? item.detail.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('') : '',
    item.bullets?.length ? `<ul>${item.bullets.map((value) => `<li>${escapeHtml(value)}</li>`).join('')}</ul>` : '',
  ].join('');
}

function prerenderBody(route: string, metadata: any, content: SeoContent) {
  const entity = metadata.entity?.item as SluggedItem | undefined;
  const entityMarkup = entity ? sectionMarkup(entity) : '';
  const listingMarkup =
    route === '/products'
      ? listMarkup(content.products, '/products')
      : route === '/applications'
        ? listMarkup(content.applications, '/applications')
        : '';

  return `<main id="seo-prerender" data-seo-prerender="true">
        <h1>${escapeHtml(metadata.breadcrumbs?.at(-1)?.name || metadata.title)}</h1>
        <p>${escapeHtml(metadata.description)}</p>
        ${entityMarkup}
        ${listingMarkup}
      </main>`;
}

function htmlForRoute(template: string, route: string, metadata: any, jsonLd: Record<string, unknown>, content: SeoContent, siteName: string) {
  const headTags = metaTags(metadata, jsonLd, siteName);
  const withoutSeo = removeExistingSeoTags(template);
  const withHead = withoutSeo.replace('</head>', `${headTags}\n    </head>`);
  const body = prerenderBody(route, metadata, content);

  return withHead
    .replace(/<div id=["']root["']><\/div>/, `<div id="root">${body}</div>`)
    .replace(/[ \t]+$/gm, '')
    .replace(/\n+$/, '\n');
}

function sitemapXml(routes: string[], siteUrl: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => `  <url>\n    <loc>${escapeHtml(absoluteRouteUrl(siteUrl, route))}</loc>\n  </url>`)
  .join('\n')}
</urlset>
`;
}

function robotsTxt(siteUrl: string) {
  return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
}

loadEnvFile('.env');
loadEnvFile('.env.local');

const [
  { products: fallbackProducts, applications: fallbackApplications, newsroomItems: fallbackNewsroomItems },
  { fetchSanitySiteContent, isSanityConfigured },
  { absoluteUrl, buildJsonLd, resolveSeo },
  { siteConfig, siteUrl },
] = await Promise.all([
  import('../src/app/content/siteContent'),
  import('../src/app/cms/sanity'),
  import('../src/app/seo'),
  import('../src/app/config/siteConfig'),
]);

let products = fallbackProducts as SluggedItem[];
let applications = fallbackApplications as SluggedItem[];
let newsroomItems = fallbackNewsroomItems as SluggedItem[];

if (isSanityConfigured) {
  try {
    const result = await fetchSanitySiteContent({ preview: false });

    if (result?.content) {
      products = mergeSluggedItems(result.content.products, products);
      applications = mergeSluggedItems(result.content.applications, applications);
      newsroomItems = mergeSluggedItems(result.content.newsroomItems, newsroomItems);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`SEO prerender used fallback content because Sanity content could not be loaded: ${message}`);
  }
}

const content: SeoContent = {
  products,
  applications,
  productMap: mapBySlug(products),
  applicationMap: mapBySlug(applications),
  newsroomMap: mapBySlug(newsroomItems),
};

const routes = [
  '/',
  '/products',
  ...products.map((product) => `/products/${product.slug}`),
  '/applications',
  ...applications.map((application) => `/applications/${application.slug}`),
  '/production',
  '/about',
  '/newsroom',
  ...newsroomItems.filter((item) => item.type === 'press-release').map((item) => `/newsroom/${item.slug}`),
  '/contact',
];

const uniqueRoutes = [...new Set(routes)];
const template = readFileSync(join(distDir, 'index.html'), 'utf8');

await Promise.all(
  uniqueRoutes.map(async (route) => {
    const metadata = resolveSeo(route, content);
    const canonicalUrl = absoluteUrl(metadata.path);
    const image = metadata.image || absoluteUrl('/og-image.svg');
    const html = htmlForRoute(
      template,
      route,
      { ...metadata, canonicalUrl, image },
      buildJsonLd(metadata, content),
      content,
      siteConfig.siteName,
    );
    const outputPath = routeOutputPath(route);

    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, html);
  }),
);

await writeFile(join(distDir, 'sitemap.xml'), sitemapXml(uniqueRoutes, siteUrl));
await writeFile(join(distDir, 'robots.txt'), robotsTxt(siteUrl));

console.log(`Prerendered SEO HTML for ${uniqueRoutes.length} routes.`);
