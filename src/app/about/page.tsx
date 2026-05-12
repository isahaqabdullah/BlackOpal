import type { Metadata } from 'next';
import { AboutPage } from '../components/About';
import { generateRouteMetadata, RouteStructuredData } from '../seoMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateRouteMetadata('/about');
}

export default function Page() {
  return (
    <>
      <RouteStructuredData path="/about" />
      <AboutPage />
    </>
  );
}
