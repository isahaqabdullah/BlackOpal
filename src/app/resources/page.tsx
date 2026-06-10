import type { Metadata } from 'next';
import { ResourcesPage } from '../components/ResourcesPage';
import { generateRouteMetadata, RouteStructuredData } from '../seoMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateRouteMetadata('/resources');
}

export default function Page() {
  return (
    <>
      <RouteStructuredData path="/resources" />
      <ResourcesPage />
    </>
  );
}
