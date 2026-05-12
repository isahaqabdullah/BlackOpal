# Sanity CMS Setup

This folder contains the schema shape and seed data expected by the website.

The website reads published Sanity content from these document types:

- `homePage`
- `product`
- `application`
- `newsroomItem`

Homepage documents are site-specific:

- `homePage-black-opal-india`
- `homePage-black-opal-middle-east`

Products, applications, and newsroom entries are shared across both websites.

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
SANITY_STUDIO_PREVIEW_ORIGIN=http://localhost:5174
SANITY_STUDIO_HOSTNAME=black-opal-india-cms
SANITY_API_READ_TOKEN=server_side_viewer_token
SANITY_API_WRITE_TOKEN=server_side_write_token_for_cms_push
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-04-15
VITE_SANITY_STUDIO_URL=http://localhost:3333
```

Leave `VITE_SANITY_PROJECT_ID` blank to use the checked-in static content fallback.

`SANITY_API_READ_TOKEN` is used by the draft preview API route. `SANITY_API_WRITE_TOKEN` is used by `cms:push` and `cms:migrate:homepages`. Keep both server-side and never expose them through a `VITE_*` variable.

## 3. Run the Studio

```bash
npm run cms:dev
```

Studio runs at `http://localhost:3333` by default.

## 4. Use the Visual Editor

Run the website on the same preview origin configured above:

```bash
npm run dev -- --host localhost --port 5174
```

Open Studio, choose `Visual Editor`, and edit homepage, product, application, and newsroom entries from the preview. Editors can change the content fields inside those sections while the site updates visually.

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

Deploy each Sanity-hosted Studio with its own preview target:

```bash
SANITY_STUDIO_SITE_ID=black-opal-india SANITY_STUDIO_PREVIEW_ORIGIN=https://black-opal-india.vercel.app SANITY_STUDIO_HOSTNAME=black-opal-india-cms npm run cms:deploy
SANITY_STUDIO_SITE_ID=black-opal-middle-east SANITY_STUDIO_PREVIEW_ORIGIN=https://black-opal-middle-east.vercel.app SANITY_STUDIO_HOSTNAME=black-opal-middle-east-cms npm run cms:deploy
```

## 6. Add CORS origins in Sanity

In the Sanity project settings, add allowed CORS origins for:

- `https://black-opal-india.vercel.app`
- `https://black-opal-middle-east.vercel.app`
- `http://localhost:5173`
- `http://localhost:5174`
- `http://127.0.0.1:5173`
- `http://127.0.0.1:5174`
- the active Vite fallback port, if both local ports are already in use
- each deployed domain

Published content is queried from the browser. Draft preview content is queried through the server-side preview API route using `SANITY_API_READ_TOKEN`.
