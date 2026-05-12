
  # Revamp Website UI

  This is a code bundle for Revamp Website UI. The original project is available at https://www.figma.com/design/U0tYMGcBMEPDXK3uKoK8bV/Revamp-Website-UI.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Multi-domain deployment

  Keep one repo and configure each deployment with different `NEXT_PUBLIC_*` values. Start from `.env.example`, then set the production values in the hosting provider for each domain.

  `npm run build` now uses Next.js App Router to render real HTML per route. Each domain gets native `robots.txt`, `sitemap.xml`, canonical metadata, Open Graph tags, JSON-LD, and crawlable HTML for product, application, newsroom, and core pages.

  Use `.env.india.example` and `.env.me.example` as starting points for the India and Middle East deployments. Until the final production domains are attached, use `https://black-opal-india.vercel.app` and `https://black-opal-middle-east.vercel.app` for `NEXT_PUBLIC_SITE_URL`.

  ## Sanity CMS

  The site can load homepage, product, application, and newsroom entries from Sanity. If Sanity env vars are not set, it keeps using the checked-in static content in `src/app/content/siteContent.ts`.

  This repo is set up for two Vercel projects sharing one Sanity project:

  - India site: `NEXT_PUBLIC_SITE_ID=black-opal-india`
  - Middle East site: `NEXT_PUBLIC_SITE_ID=black-opal-middle-east`

  Homepage content is site-specific in Sanity. Products, applications, and newsroom entries are shared for now.

  Set these environment variables to enable CMS content and visual preview:

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

  `SANITY_API_READ_TOKEN` is server-side only. Do not expose it as a `NEXT_PUBLIC_*` variable.

  Sanity scripts:

  ```bash
  npm run cms:login
  npm run cms:dev
  npm run cms:seed
  npm run cms:import
  npm run cms:migrate:homepages
  npm run cms:pull
  npm run cms:push
  npm run cms:push -- --apply
  ```

  `cms:import` uses `--replace`, so treat it as a reset tool. It can overwrite manual edits made in Sanity. For normal Git snapshots, use `cms:pull`, edit `sanity/snapshots/production.ndjson`, run `cms:push` to dry-run the changes, then run `cms:push -- --apply` only after the diff looks right. The push script checks `_rev` and aborts instead of overwriting newer Studio edits. It does not delete Sanity documents.

  To create the two site-specific homepage documents from the legacy `homePage` document, run:

  ```bash
  npm run cms:migrate:homepages
  ```

  To deploy the hosted Sanity Studios, run the same script with different env values:

  ```bash
  SANITY_STUDIO_SITE_ID=black-opal-india SANITY_STUDIO_PREVIEW_ORIGIN=https://black-opal-india.vercel.app SANITY_STUDIO_HOSTNAME=black-opal-india-cms npm run cms:deploy
  SANITY_STUDIO_SITE_ID=black-opal-middle-east SANITY_STUDIO_PREVIEW_ORIGIN=https://black-opal-middle-east.vercel.app SANITY_STUDIO_HOSTNAME=black-opal-middle-east-cms npm run cms:deploy
  ```

  `SANITY_STUDIO_HOSTNAME=black-opal-india-cms` deploys to `https://black-opal-india-cms.sanity.studio`. Set each Vercel project’s `NEXT_PUBLIC_SANITY_STUDIO_URL` to its matching Studio URL.

  For visual editing, run the website and Studio together:

  ```bash
  npm run dev
  npm run cms:dev
  ```

  Then open Sanity Studio at `http://localhost:3333`, choose `Visual Editor`, and edit the existing homepage, product, application, and newsroom fields while the site preview updates.

  To update live pages after Sanity publishes, create one Sanity webhook per Vercel project that sends document payloads to:

  ```text
  https://your-site-domain/api/revalidate?secret=SANITY_REVALIDATE_SECRET
  ```

  Starter schema types live in `sanity/schemaTypes.ts`; setup notes are in `sanity/README.md`.
  
