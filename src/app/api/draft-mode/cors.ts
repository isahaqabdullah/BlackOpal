const LOCAL_PREVIEW_ORIGINS = new Set(['http://localhost:3000', 'http://127.0.0.1:3000']);

function originFrom(value: string | undefined) {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function isAllowedSanityOrigin(origin: string) {
  try {
    const { hostname, protocol } = new URL(origin);
    return protocol === 'https:' && (hostname === 'www.sanity.io' || hostname.endsWith('.sanity.studio'));
  } catch {
    return false;
  }
}

export function draftModeCorsHeaders(request: Request) {
  const requestOrigin = request.headers.get('origin');
  const configuredStudioOrigin = originFrom(process.env.NEXT_PUBLIC_SANITY_STUDIO_URL);
  const configuredPreviewOrigin = originFrom(process.env.SANITY_STUDIO_PREVIEW_ORIGIN || process.env.NEXT_PUBLIC_SITE_URL);
  const explicitOrigins = new Set(
    [
      configuredStudioOrigin,
      configuredPreviewOrigin,
      'https://black-opal-india-cms.sanity.studio',
      'https://black-opal-middle-east-cms.sanity.studio',
      ...LOCAL_PREVIEW_ORIGINS,
    ].filter((origin): origin is string => Boolean(origin)),
  );

  const allowOrigin =
    requestOrigin && (explicitOrigins.has(requestOrigin) || isAllowedSanityOrigin(requestOrigin))
      ? requestOrigin
      : null;

  const headers = new Headers({
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type, authorization, sanity-preview-secret, x-sanity-preview-secret',
    Vary: 'Origin',
  });

  if (allowOrigin) {
    headers.set('Access-Control-Allow-Origin', allowOrigin);
    headers.set('Access-Control-Allow-Credentials', 'true');
  }

  return headers;
}

export function draftModeOptionsResponse(request: Request) {
  return new Response(null, {
    status: 204,
    headers: draftModeCorsHeaders(request),
  });
}
