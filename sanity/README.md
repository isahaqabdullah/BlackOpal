# Sanity CMS Setup

This folder contains the schema shape and seed data expected by the website.

The website reads published Sanity content from these document types:

- `homePage`
- `siteSettings`
- `pageCopy`
- `aboutPage`
- `productionPage`
- `product`
- `application`
- `newsroomItem`

Homepage documents are site-specific:

- `homePage-black-opal-india`
- `homePage-black-opal-middle-east`

Site settings and About documents are site-specific, using IDs like:

- `siteSettings-black-opal-india`
- `siteSettings-black-opal-middle-east`
- `aboutPage-black-opal-india`
- `aboutPage-black-opal-middle-east`

Page framing copy, production, products, applications, and newsroom entries are shared across both websites. Contact and footer content are owned by code/environment config, not Sanity.

## 1. Log in and create a Sanity project

```bash
npm run cms:login
```

Then create a project in Sanity and copy its project ID. The repo already includes `sanity.config.ts`, `sanity.cli.ts`, and these schema types.

## 2. Configure local env vars

Add these to `.env.local` for local development and to the production deployment:

```env
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_SITE_ID=black-opal-india
SANITY_STUDIO_PREVIEW_ORIGIN=http://localhost:3000
SANITY_STUDIO_HOSTNAME=black-opal-india-cms
SANITY_API_READ_TOKEN=server_side_viewer_token
SANITY_API_WRITE_TOKEN=server_side_write_token_for_cms_push
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-04-15
NEXT_PUBLIC_SANITY_STUDIO_URL=http://localhost:3333
SANITY_REVALIDATE_SECRET=shared_webhook_secret
```

Leave `NEXT_PUBLIC_SANITY_PROJECT_ID` blank to use the checked-in static content fallback.

`SANITY_API_READ_TOKEN` is used by the draft preview API route. `SANITY_API_WRITE_TOKEN` is used by `cms:push` and `cms:migrate:homepages`. Keep both server-side and never expose them through a `NEXT_PUBLIC_*` variable.

## 3. Run the Studio

```bash
npm run cms:dev
```

Studio runs at `http://localhost:3333` by default.

## 4. Use the Visual Editor

Run the website on the same preview origin configured above:

```bash
npm run dev
```

Open Studio, choose `Visual Editor`, and edit homepage metrics and section copy, page framing copy, about, production, product, application, and newsroom entries from the preview. Nav, footer, contact, and button labels/links are owned by code rather than CMS.

## 5. Import current site content

Generate the import file:

```bash
npm run cms:seed
```

Import it into the production dataset:

```bash
npm run cms:import
```

The generated import file is `sanity/seed.ndjson`.

`cms:import` uses `--replace`, so it can overwrite manual edits in Sanity. Prefer these scripts for ongoing Git snapshots:

```bash
npm run cms:pull
npm run cms:push
npm run cms:push -- --apply
```

`cms:pull` writes `sanity/snapshots/production.ndjson` with `_rev` values. `cms:push` dry-runs by default and only applies updates when the remote `_rev` still matches the pulled snapshot. It aborts on conflicts and does not delete documents.

Run this once to create site-specific homepage documents from the legacy `homePage` document without overwriting existing site documents:

```bash
npm run cms:migrate:homepages
```

Run this after adding the expanded copy schema to create the shared page-copy document, create the site-specific settings/About documents, and fill only missing fields on existing homepage and production documents:

```bash
npm run cms:migrate:copy
```

The recommended production Studio entrypoints are embedded on the Vercel sites so Studio and preview share the same origin:

- India Studio: `https://black-opal-india.vercel.app/studio`
- Middle East Studio: `https://black-opal-middle-east.vercel.app/studio`

This avoids browser third-party cookie restrictions in visual editing. You can still deploy each Sanity-hosted Studio as a fallback with its own preview target:

```bash
SANITY_STUDIO_SITE_ID=black-opal-india SANITY_STUDIO_PREVIEW_ORIGIN=https://black-opal-india.vercel.app SANITY_STUDIO_HOSTNAME=black-opal-india-cms npm run cms:deploy
SANITY_STUDIO_SITE_ID=black-opal-middle-east SANITY_STUDIO_PREVIEW_ORIGIN=https://black-opal-middle-east.vercel.app SANITY_STUDIO_HOSTNAME=black-opal-middle-east-cms npm run cms:deploy
```

## 6. Add CORS origins in Sanity

In the Sanity project settings, add allowed CORS origins for:

- `https://black-opal-india.vercel.app`
- `https://black-opal-middle-east.vercel.app`
- `http://localhost:3000`
- `http://127.0.0.1:3000`
- each deployed domain

Published content is fetched server-side by Next.js. Draft preview content is fetched server-side through draft mode using `SANITY_API_READ_TOKEN`, and Visual Editing runs only while draft mode is enabled.
