import type { Metadata } from 'next';
import { NewsroomPage } from '../components/NewsroomPage';
import { generateRouteMetadata, RouteStructuredData } from '../seoMetadata';

export async function generateMetadata(): Promise<Metadata> {
  return generateRouteMetadata('/newsroom');
}

export default function Page() {
  return (
    <>
      <RouteStructuredData path="/newsroom" />
      <NewsroomPage />
    </>
  );
}
