import { draftMode } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { createSanityClient, sanityStudioUrl } from '../../../cms/sanity';

export async function GET(request: NextRequest) {
  const client = createSanityClient({ preview: true, studioUrl: sanityStudioUrl });

  if (!client) {
    return new NextResponse('Sanity is not configured.', { status: 500 });
  }

  const { isValid, redirectTo = '/' } = await validatePreviewUrl(client, request.url);

  if (!isValid) {
    return new NextResponse('Invalid Sanity preview secret.', { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  return NextResponse.redirect(new URL(redirectTo || '/', request.url));
}
