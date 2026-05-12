import type { Metadata } from 'next';
import { HomePage } from './components/HomePage';
import { generateRouteMetadata, RouteStructuredData } from './seoMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateRouteMetadata('/');
}

export default function Page() {
  return (
    <>
      <RouteStructuredData path="/" />
      <HomePage />
    </>
  );
}
