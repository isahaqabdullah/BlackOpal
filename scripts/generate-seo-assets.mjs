import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function loadEnvFile(filename) {
  const filePath = join(rootDir, filename);

  try {
    const contents = readFileSync(filePath, 'utf8');

    contents.split(/\r?\n/).forEach((line) => {
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

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!(key in process.env)) {
        process.env[key] = value;
      }
    });
  } catch {
    // Optional env files are allowed to be missing.
  }
}

loadEnvFile('.env');
loadEnvFile('.env.local');

const siteUrl = (process.env.VITE_SITE_URL || 'https://www.blackopalcarbons.com').replace(/\/+$/, '');
const publicDir = join(rootDir, 'public');

const routes = [
  '/',
  '/products',
  '/products/granular',
  '/products/powder',
  '/products/impregnated',
  '/products/catalytic',
  '/applications',
  '/applications/water-treatment',
  '/applications/gold-recovery',
  '/applications/air-gas',
  '/applications/oil-gas',
  '/applications/catalytic-carbon',
  '/applications/other-applications',
  '/production',
  '/about',
  '/newsroom',
  '/newsroom/name-change-press-release',
  '/contact',
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const url = route === '/' ? `${siteUrl}/` : `${siteUrl}${route}`;
    return `  <url>\n    <loc>${url}</loc>\n  </url>`;
  })
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, 'sitemap.xml'), sitemap);
writeFileSync(join(publicDir, 'robots.txt'), robots);
