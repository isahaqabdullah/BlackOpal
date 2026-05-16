import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';
import { cookies, draftMode } from 'next/headers';
import { NextResponse } from 'next/server';
import { createSanityClient, sanityStudioUrl } from '../../../cms/sanity';
import {
  DEFAULT_SANITY_PREVIEW_PERSPECTIVE,
  SANITY_PREVIEW_PERSPECTIVE_PARAM,
  SANITY_PREVIEW_TOKEN_PARAM,
} from '../../../cms/presentationContext';
import { createPreviewToken } from '../../../cms/previewToken';
import { draftModeCorsHeaders, draftModeOptionsResponse } from '../cors';

export const OPTIONS = draftModeOptionsResponse;

export async function GET(request: Request) {
  const headers = draftModeCorsHeaders(request);
  const client = createSanityClient({ preview: true, studioUrl: sanityStudioUrl });

  if (!client) {
    return new Response('Sanity is not configured.', { status: 500, headers });
  }

  const { isValid, redirectTo = '/', studioPreviewPerspective } = await validatePreviewUrl(client, request.url);

  if (!isValid) {
    return new Response('Invalid secret', { status: 401, headers });
  }

  const draft = await draftMode();
  if (!draft.isEnabled) {
    draft.enable();
  }

  const isSecure = process.env.NODE_ENV === 'production';
  const cookieStore = await cookies();
  const prerenderBypassCookie = cookieStore.get('__prerender_bypass');
  if (prerenderBypassCookie?.value) {
    cookieStore.set({
      name: '__prerender_bypass',
      value: prerenderBypassCookie.value,
      httpOnly: true,
      path: '/',
      secure: isSecure,
      sameSite: isSecure ? 'none' : 'lax',
    });
  }

  const perspective = studioPreviewPerspective || DEFAULT_SANITY_PREVIEW_PERSPECTIVE;
  cookieStore.set({
    name: perspectiveCookieName,
    value: perspective,
    httpOnly: true,
    path: '/',
    secure: isSecure,
    sameSite: isSecure ? 'none' : 'lax',
  });

  const redirectUrl = new URL(redirectTo, request.url);
  redirectUrl.searchParams.set(SANITY_PREVIEW_PERSPECTIVE_PARAM, perspective);

  const previewToken = await createPreviewToken(perspective);
  if (previewToken) {
    redirectUrl.searchParams.set(SANITY_PREVIEW_TOKEN_PARAM, previewToken);
  }

  return NextResponse.redirect(redirectUrl, { headers });
}
