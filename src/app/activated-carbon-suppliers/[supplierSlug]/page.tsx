import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ActivatedCarbonSupplierLandingPage } from '../../components/ActivatedCarbonSupplierLandingPage';
import {
  supplierLandingPageMap,
  supplierLandingPagePath,
  supplierLandingPages,
} from '../../content/supplierLandingPages';
import { generateRouteMetadata, RouteStructuredData } from '../../seoMetadata';

type PageProps = {
  params: Promise<{ supplierSlug: string }>;
};

export function generateStaticParams() {
  return supplierLandingPages.map((page) => ({ supplierSlug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { supplierSlug } = await params;
  return generateRouteMetadata(supplierLandingPagePath(supplierSlug));
}

export default async function Page({ params }: PageProps) {
  const { supplierSlug } = await params;
  const page = supplierLandingPageMap[supplierSlug];

  if (!page) {
    notFound();
  }

  const path = supplierLandingPagePath(supplierSlug);

  return (
    <>
      <RouteStructuredData path={path} />
      <ActivatedCarbonSupplierLandingPage page={page} />
    </>
  );
}
