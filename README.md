
  # Revamp Website UI

  This is a code bundle for Revamp Website UI. The original project is available at https://www.figma.com/design/U0tYMGcBMEPDXK3uKoK8bV/Revamp-Website-UI.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Multi-domain deployment

  Keep one repo and configure each deployment with different `VITE_*` values. Start from `.env.example`, then set the production values in the hosting provider for each domain.

  `npm run build` generates `robots.txt` and `sitemap.xml` from `VITE_SITE_URL`, so each domain gets the correct crawl files and canonical metadata.

  Use `.env.india.example` and `.env.me.example` as starting points for the India and Middle East deployments. Set the final production domain in `VITE_SITE_URL` for each hosting project.
  
