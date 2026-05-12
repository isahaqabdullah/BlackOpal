import type { Metadata } from 'next';
import { ApplicationDetailPage } from '../../components/ApplicationDetailPage';
import { getPublishedSeoContent } from '../../cms/siteContent';
import { generateRouteMetadata, RouteStructuredData } from '../../seoMetadata';

type PageProps = {
  params: Promise<{ applicationSlug: string }>;
};

export async function generateStaticParams() {
  const content = await getPublishedSeoContent();
  return content.applications.map((application) => ({ applicationSlug: application.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { applicationSlug } = await params;
  return generateRouteMetadata(`/applications/${applicationSlug}`);
}

export default async function Page({ params }: PageProps) {
  const { applicationSlug } = await params;

  return (
    <>
      <RouteStructuredData path={`/applications/${applicationSlug}`} />
      <ApplicationDetailPage />
    </>
  );
}
