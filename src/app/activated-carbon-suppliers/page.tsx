import type { Metadata } from 'next';
import { ActivatedCarbonSuppliersPage } from '../components/ActivatedCarbonSuppliersPage';
import { generateRouteMetadata, RouteStructuredData } from '../seoMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateRouteMetadata('/activated-carbon-suppliers');
}

export default function Page() {
  return (
    <>
      <RouteStructuredData path="/activated-carbon-suppliers" />
      <ActivatedCarbonSuppliersPage />
    </>
  );
}
