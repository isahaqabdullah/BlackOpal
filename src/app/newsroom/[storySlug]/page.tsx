import type { Metadata } from 'next';
import { PressReleasePage } from '../../components/PressReleasePage';
import { getPublishedSeoContent } from '../../cms/siteContent';
import { generateRouteMetadata, RouteStructuredData } from '../../seoMetadata';

type PageProps = {
  params: Promise<{ storySlug: string }>;
};

export async function generateStaticParams() {
  const content = await getPublishedSeoContent();
  return content.newsroomItems
    .filter((item) => item.type === 'press-release')
    .map((item) => ({ storySlug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { storySlug } = await params;
  return generateRouteMetadata(`/newsroom/${storySlug}`);
}

export default async function Page({ params }: PageProps) {
  const { storySlug } = await params;

  return (
    <>
      <RouteStructuredData path={`/newsroom/${storySlug}`} />
      <PressReleasePage />
    </>
  );
}
