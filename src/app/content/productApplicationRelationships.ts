import type { ApplicationEntry } from './siteContent';

export function applicationsForProduct(
  productSlug: string,
  applications: ApplicationEntry[],
): ApplicationEntry[] {
  return applications.filter((application) =>
    application.recommendedProducts.includes(productSlug),
  );
}
