import type { Metadata } from 'next';
import { ProductsPage } from '../components/ProductsPage';
import { generateRouteMetadata, RouteStructuredData } from '../seoMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateRouteMetadata('/products');
}

export default function Page() {
  return (
    <>
      <RouteStructuredData path="/products" />
      <ProductsPage />
    </>
  );
}
