# Black Opal CMS Handoff

## Editor URLs

Use the embedded Studio on the matching live site. This keeps Studio, preview, cookies, and site-specific env on the same origin.

- India: https://black-opal-india.vercel.app/studio
- Middle East: https://black-opal-middle-east.vercel.app/studio

Open the matching URL, choose **Visual Editor**, click editable page text/images, publish, then refresh the public page.

## Editable In Sanity

- Home page hero, trust metrics, product/application section labels, company section, why section, featured capabilities, and closing CTA.
- About page intro, story, office-network label, metrics, cards, and brand update label.
- Production page intro, glance metrics, overview, image, quality copy, activation steps, and production contact sentence copy.
- Product documents.
- Application documents.
- Newsroom documents.
- Shared page framing copy for products, applications, newsroom, press release pages, and not-found page.

## Intentionally Code/Env-Owned

- Navigation.
- Footer.
- Contact form fields and form behavior.
- Buttons and links.
- Primary site identity per domain.
- Primary regional contact details per domain.

## Site-Specific Vs Shared

- Site-specific: home page, about page, shared breadcrumb labels, primary regional site identity/contact env.
- Shared: products, applications, newsroom, production page, and most page framing copy.

## Operational Notes

- Do not use `cms:import` during normal editing; it can overwrite live Studio edits.
- Use `npm run cms:pull` before taking a CMS snapshot into Git.
- Use `npm run cms:push` first as a dry run, then `npm run cms:push -- --apply` only when the dry run is expected.
- If editing does not show click targets, confirm the editor is using the matching embedded Studio URL above, not the separate `*.sanity.studio` fallback.
