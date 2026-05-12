import type { Metadata } from 'next';
import { ContactPage } from '../components/Contact';
import { generateRouteMetadata, RouteStructuredData } from '../seoMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateRouteMetadata('/contact');
}

export default function Page() {
  return (
    <>
      <RouteStructuredData path="/contact" />
      <ContactPage />
    </>
  );
}
