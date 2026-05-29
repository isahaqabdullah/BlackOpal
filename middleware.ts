import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  SANITY_PREVIEW_PERSPECTIVE_HEADER,
  SANITY_PREVIEW_TOKEN_PARAM,
} from './src/app/cms/presentationContext';
import { verifyPreviewToken } from './src/app/cms/previewToken';

export async function middleware(request: NextRequest) {
  const previewToken = request.nextUrl.searchParams.get(SANITY_PREVIEW_TOKEN_PARAM);
  const payload = await verifyPreviewToken(previewToken);

  const responseInit =
    process.env.NODE_ENV === 'production'
      ? undefined
      : {
          headers: {
            'Cache-Control': 'no-store, max-age=0, must-revalidate',
          },
        };

  if (!payload) {
    return NextResponse.next(responseInit);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(SANITY_PREVIEW_PERSPECTIVE_HEADER, payload.perspective);

  return NextResponse.next({
    ...responseInit,
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)'],
};
