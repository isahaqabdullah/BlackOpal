import type { Metadata } from 'next';
import { ApplicationsPage } from '../components/ApplicationsPage';
import { generateRouteMetadata, RouteStructuredData } from '../seoMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateRouteMetadata('/applications');
}

export default function Page() {
  return (
    <>
      <RouteStructuredData path="/applications" />
      <ApplicationsPage />
    </>
  );
}
