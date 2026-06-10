import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ResourceDetailPage } from '../../components/ResourceDetailPage';
import {
  resourceDetailPageMap,
  resourceDetailPages,
  resourcePagePath,
} from '../../content/resourcePages';
import { generateRouteMetadata, RouteStructuredData } from '../../seoMetadata';

type PageProps = {
  params: Promise<{ resourceSlug: string }>;
};

export function generateStaticParams() {
  return resourceDetailPages.map((page) => ({ resourceSlug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { resourceSlug } = await params;
  return generateRouteMetadata(resourcePagePath(resourceSlug));
}

export default async function Page({ params }: PageProps) {
  const { resourceSlug } = await params;
  const page = resourceDetailPageMap[resourceSlug];

  if (!page) {
    notFound();
  }

  const path = resourcePagePath(resourceSlug);

  return (
    <>
      <RouteStructuredData path={path} />
      <ResourceDetailPage page={page} />
    </>
  );
}
