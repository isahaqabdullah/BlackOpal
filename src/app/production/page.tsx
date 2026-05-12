import type { Metadata } from 'next';
import { ProductionPage } from '../components/ProductionPage';
import { generateRouteMetadata, RouteStructuredData } from '../seoMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateRouteMetadata('/production');
}

export default function Page() {
  return (
    <>
      <RouteStructuredData path="/production" />
      <ProductionPage />
    </>
  );
}
