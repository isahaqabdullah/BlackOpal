import type { Metadata } from 'next';
import { ProductDetailPage } from '../../components/ProductDetailPage';
import { getPublishedSeoContent } from '../../cms/siteContent';
import { generateRouteMetadata, RouteStructuredData } from '../../seoMetadata';

type PageProps = {
  params: Promise<{ productSlug: string }>;
};

export async function generateStaticParams() {
  const content = await getPublishedSeoContent();
  return content.products.map((product) => ({ productSlug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { productSlug } = await params;
  return generateRouteMetadata(`/products/${productSlug}`);
}

export default async function Page({ params }: PageProps) {
  const { productSlug } = await params;

  return (
    <>
      <RouteStructuredData path={`/products/${productSlug}`} />
      <ProductDetailPage />
    </>
  );
}
