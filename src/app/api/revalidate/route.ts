import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { configuredSiteId } from '../../cms/sanity';

type SanityWebhookDocument = {
  _id?: string;
  _type?: string;
  siteId?: string;
  slug?: string | { current?: string };
};

function readSlug(document: SanityWebhookDocument) {
  return typeof document.slug === 'string' ? document.slug : document.slug?.current;
}

function readSiteId(document: SanityWebhookDocument) {
  if (document.siteId) {
    return document.siteId;
  }

  if (document._id === 'homePage-black-opal-india') {
    return 'black-opal-india';
  }

  if (document._id === 'homePage-black-opal-middle-east') {
    return 'black-opal-middle-east';
  }

  return undefined;
}

function pathsForDocument(document: SanityWebhookDocument) {
  const slug = readSlug(document);

  if (document._type === 'homePage') {
    const siteId = readSiteId(document);
    return !siteId || siteId === configuredSiteId ? ['/'] : [];
  }

  if (document._type === 'product') {
    return ['/', '/products', ...(slug ? [`/products/${slug}`] : [])];
  }

  if (document._type === 'application') {
    return ['/', '/applications', ...(slug ? [`/applications/${slug}`] : [])];
  }

  if (document._type === 'newsroomItem') {
    return ['/', '/newsroom', ...(slug ? [`/newsroom/${slug}`] : [])];
  }

  return ['/', '/products', '/applications', '/newsroom'];
}

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;
  const receivedSecret =
    request.nextUrl.searchParams.get('secret') || request.headers.get('x-sanity-revalidate-secret');

  if (!expectedSecret || receivedSecret !== expectedSecret) {
    return NextResponse.json({ revalidated: false, error: 'Invalid revalidation secret.' }, { status: 401 });
  }

  const document = (await request.json().catch(() => ({}))) as SanityWebhookDocument;
  const paths = [...new Set(pathsForDocument(document))];

  revalidateTag('sanity-content', 'max');
  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({
    revalidated: true,
    siteId: configuredSiteId,
    paths,
  });
}
