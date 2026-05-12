import { createClient } from '@sanity/client';
import { validatePreviewUrl } from '@sanity/preview-url-secret';
import { perspectiveCookieName } from '@sanity/preview-url-secret/constants';
import {
  VISUAL_PREVIEW_COOKIE_NAME,
  clearCookie,
  cookieSameSite,
  getRequestUrl,
  readCookies,
  redirect,
  sendJson,
  sendText,
  setCookie,
} from './http.js';

const siteContentQuery = `{
  "homePage": *[
    _type == "homePage" &&
    (siteId == $siteId || (!defined(siteId) && _id == "homePage"))
  ] | order(select(siteId == $siteId => 0, 1))[0] {
    _id,
    _type,
    siteId,
    heroKicker,
    heroTitle,
    heroDescription,
    trustCertificationLabel,
    trustCertificationValue,
    trustEstablishedLabel,
    trustEstablishedValue,
    trustProductionLabel,
    trustProductionValue,
    trustLogisticsLabel,
    trustLogisticsValue,
    trustCapacityLabel,
    trustCapacityValue,
    productSectionKicker,
    productSectionTitle,
    applicationSectionKicker,
    applicationSectionTitle,
    companyEyebrow,
    companyTitle,
    companyBodyPrimary,
    companyBodySecondary,
    ctaTitle,
    ctaDescription,
    ctaPrimaryLabel,
    ctaSecondaryLabel
  },
  "products": *[_type == "product"] | order(coalesce(sortOrder, 999) asc, name asc) {
    _id,
    _type,
    "slug": coalesce(slug.current, slug),
    name,
    shortName,
    summary,
    intro,
    highlights,
    commonUses,
    grades,
    sections[] {
      _key,
      title,
      body,
      bullets
    },
    "image": coalesce(imageUrl, image.asset->url)
  },
  "applications": *[_type == "application"] | order(coalesce(sortOrder, 999) asc, name asc) {
    _id,
    _type,
    "slug": coalesce(slug.current, slug),
    name,
    summary,
    intro,
    keyPoints,
    recommendedProducts,
    grades,
    sections[] {
      _key,
      title,
      body,
      bullets
    },
    "image": coalesce(imageUrl, image.asset->url)
  },
  "newsroomItems": *[_type == "newsroomItem"] | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    _type,
    "slug": coalesce(slug.current, slug),
    title,
    type,
    summary,
    detail,
    bullets
  }
}`;

function readToken() {
  return process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN;
}

function readSanityConfig() {
  const apiVersion = process.env.VITE_SANITY_API_VERSION || process.env.SANITY_API_VERSION || '2026-04-15';
  const dataset = process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || 'production';
  const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID;
  const siteId = process.env.VITE_SITE_ID || process.env.SANITY_STUDIO_SITE_ID || 'black-opal-us';

  if (!projectId || !dataset) {
    throw new Error('Missing Sanity project ID or dataset configuration.');
  }

  return { apiVersion, dataset, projectId, siteId };
}

function createSanityClient({ preview = false, studioUrl } = {}) {
  const config = readSanityConfig();
  const { siteId, ...clientConfig } = config;

  const token = preview ? readToken() : undefined;

  if (preview && !token) {
    throw new Error('Missing SANITY_API_READ_TOKEN for draft preview.');
  }

  return createClient({
    ...clientConfig,
    useCdn: !preview,
    token,
    perspective: preview ? 'previewDrafts' : 'published',
    stega: preview
      ? {
          enabled: true,
          studioUrl,
        }
      : false,
  });
}

function getStudioUrl(requestUrl) {
  return process.env.VITE_SANITY_STUDIO_URL || process.env.SANITY_STUDIO_URL || `${requestUrl.protocol}//localhost:3333`;
}

function previewCookieOptions(requestUrl) {
  return {
    path: '/',
    maxAge: 60 * 60,
    sameSite: cookieSameSite(requestUrl),
    secure: requestUrl.protocol === 'https:',
  };
}

function getPreviewPerspective(request) {
  const cookies = readCookies(request);
  const perspective = cookies[perspectiveCookieName];

  if (!perspective || perspective === 'published') {
    return null;
  }

  return perspective;
}

export async function handleEnableDraftMode(request, response) {
  const requestUrl = getRequestUrl(request);

  try {
    const client = createSanityClient({ preview: true, studioUrl: getStudioUrl(requestUrl) });
    const { isValid, redirectTo = '/', studioPreviewPerspective = 'previewDrafts' } = await validatePreviewUrl(
      client,
      requestUrl.toString(),
    );

    if (!isValid) {
      sendText(response, 401, 'Invalid Sanity preview secret.');
      return;
    }

    const options = previewCookieOptions(requestUrl);
    setCookie(response, perspectiveCookieName, studioPreviewPerspective, { ...options, httpOnly: true });
    setCookie(response, VISUAL_PREVIEW_COOKIE_NAME, '1', options);
    redirect(response, redirectTo || '/');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to enable Sanity preview.';
    sendText(response, 500, message);
  }
}

export function handleDisableDraftMode(request, response) {
  const requestUrl = getRequestUrl(request);

  clearCookie(response, perspectiveCookieName, requestUrl, { httpOnly: true });
  clearCookie(response, VISUAL_PREVIEW_COOKIE_NAME, requestUrl);
  redirect(response, '/');
}

export async function handleSanitySiteContent(request, response) {
  const requestUrl = getRequestUrl(request);
  const perspective = getPreviewPerspective(request);
  const preview = Boolean(perspective);

  try {
    const client = createSanityClient({ preview, studioUrl: getStudioUrl(requestUrl) });
    const { siteId } = readSanityConfig();
    const data = await client.fetch(siteContentQuery, { siteId }, {
      filterResponse: false,
      resultSourceMap: preview ? 'withKeyArraySelector' : false,
    });

    sendJson(response, 200, {
      content: data.result || data,
      preview,
      perspective: perspective || 'published',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load Sanity content.';
    sendJson(response, 500, { error: message });
  }
}
