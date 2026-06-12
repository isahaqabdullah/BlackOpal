# India Website Implementation Plan

## Goal

The India website and Middle East website should stay in one Next.js repo, but India needs enough repo-owned differences that environment variables should not carry the work.

Use one environment variable to select the active site:

```env
NEXT_PUBLIC_SITE_ID=black-opal-india
```

Everything else should come from either:

- checked-in site profiles for repo-owned assets and structural behavior
- Sanity for editable page content

## Core Principle

Do not scatter checks like this across components:

```ts
process.env.NEXT_PUBLIC_SITE_ID === 'black-opal-india'
```

Instead, resolve the active site once and read from a typed site profile.

## Proposed File Structure

```text
src/app/sites/
  profiles.ts
  currentSite.ts

public/sites/
  black-opal-india/
    favicon.ico
    hero-logo.png
    nav-logo.png
    og-image.png
  black-opal-middle-east/
    favicon.ico
    hero-logo.png
    nav-logo.png
    og-image.png

src/app/components/home/
  HomePage.tsx
  IndiaHomePage.tsx
  MiddleEastHomePage.tsx

src/app/components/about/
  AboutPage.tsx
  IndiaAboutPage.tsx
  MiddleEastAboutPage.tsx
```

## Site Profile

Create a profile for repo-owned differences such as logos, favicons, Open Graph images, brand names, and structural flags.

Example:

```ts
export const siteProfiles = {
  'black-opal-india': {
    id: 'black-opal-india',
    name: 'Black Opal Private Limited',
    navLogo: '/sites/black-opal-india/nav-logo.png',
    heroLogo: '/sites/black-opal-india/hero-logo.png',
    ogImage: '/sites/black-opal-india/og-image.png',
    favicon: '/sites/black-opal-india/favicon.ico',
  },
  'black-opal-middle-east': {
    id: 'black-opal-middle-east',
    name: 'Black Opal Carbons Middle East',
    navLogo: '/sites/black-opal-middle-east/nav-logo.png',
    heroLogo: '/sites/black-opal-middle-east/hero-logo.png',
    ogImage: '/sites/black-opal-middle-east/og-image.png',
    favicon: '/sites/black-opal-middle-east/favicon.ico',
  },
} as const;
```

Then expose one resolved profile:

```ts
const siteId = process.env.NEXT_PUBLIC_SITE_ID || 'black-opal-india';

export const currentSite =
  siteProfiles[siteId as keyof typeof siteProfiles] ?? siteProfiles['black-opal-india'];
```

## What Belongs In The Site Profile

Put these in repo-controlled site profiles:

- logo paths
- favicon paths
- default Open Graph image paths
- brand/company name defaults
- hard route availability
- navigation structure if it differs by site
- page component variant selection
- default office/contact fallback values if they are not CMS-managed

## What Belongs In Sanity

Keep these in Sanity:

- homepage copy
- about page copy
- production page copy
- SEO titles and descriptions
- CTA labels
- editable page sections
- office descriptions if non-developers should edit them
- product/application/newsroom content

## Page Variant Strategy

If India only changes text, images, or section content, keep the same component and feed it different content.

If India changes page structure, create a site-specific page component.

Recommended pattern:

```tsx
import { currentSite } from '@/app/sites/currentSite';
import { IndiaHomePage } from './IndiaHomePage';
import { MiddleEastHomePage } from './MiddleEastHomePage';

export function HomePage(props) {
  if (currentSite.id === 'black-opal-india') {
    return <IndiaHomePage {...props} />;
  }

  return <MiddleEastHomePage {...props} />;
}
```

Use the same pattern for About:

```tsx
export function AboutPage(props) {
  if (currentSite.id === 'black-opal-india') {
    return <IndiaAboutPage {...props} />;
  }

  return <MiddleEastAboutPage {...props} />;
}
```

The site check should happen once at the page boundary.

## Recommended Implementation Order

1. Add `src/app/sites/profiles.ts` and `src/app/sites/currentSite.ts`.
2. Move repo-owned assets into `public/sites/black-opal-india/` and `public/sites/black-opal-middle-east/`.
3. Update logo, favicon, metadata, and default OG image usage to read from `currentSite`.
4. Split homepage into `IndiaHomePage` and `MiddleEastHomePage` only if the layouts differ.
5. Split about page into `IndiaAboutPage` and `MiddleEastAboutPage` only if the layouts differ.
6. Keep reusable sections shared, especially cards, buttons, layout wrappers, product grids, application grids, footer, and CTA bands.
7. Run a production build for India.
8. Run a production build for Middle East.
9. Commit code, assets, and any matching Sanity snapshot changes before deployment.

## Migration Notes

The current project already supports site-specific Sanity documents for some content:

- `homePage-black-opal-india`
- `homePage-black-opal-middle-east`
- `siteSettings-black-opal-india`
- `siteSettings-black-opal-middle-east`

Keep that model. The missing piece is a clean repo-owned site profile for assets and structural differences.

## Decision Rule

Use this rule when deciding where a change belongs:

| Change Type | Put It In |
| --- | --- |
| Logo, favicon, OG image, fixed brand asset | Site profile and `public/sites/...` |
| Editable copy | Sanity |
| Different homepage section order | Sanity if editor-controlled, component variant if hardcoded |
| Different homepage layout | Site-specific page component |
| Different about page layout | Site-specific page component |
| Different navigation items | Site profile or Sanity navigation document |
| Different products/applications shown | Sanity visibility field or site-specific query |
| Secrets, deployed domain, project IDs | Environment variables |

## What To Avoid

- Adding many new `NEXT_PUBLIC_*` variables for logos and page behavior
- Putting India/Middle East conditionals inside low-level UI components
- Duplicating the whole app unless the sites become completely different products
- Letting Sanity own assets that should be versioned with the codebase
- Making homepage/about changes directly inside shared components if the layouts are diverging

