import { draftMode } from 'next/headers';
import { headers } from 'next/headers';
import { fetchSanitySiteContent, sanityStudioUrl } from './sanity';
import { SANITY_PREVIEW_PERSPECTIVE_HEADER } from './presentationContext';
import {
  fallbackContentInput,
  mergeSanityContent,
  toSeoContent,
  type ContentInput,
  type SeoContentInput,
} from '../content/siteContentResolver';

async function getPreviewState() {
  const draft = await draftMode();
  const requestHeaders = await headers();
  const signedPreviewPerspective = requestHeaders.get(SANITY_PREVIEW_PERSPECTIVE_HEADER);

  return {
    draftMode: draft.isEnabled,
    preview: draft.isEnabled || Boolean(signedPreviewPerspective),
  };
}

export async function getDraftModeEnabled() {
  return (await getPreviewState()).preview;
}

export async function getSiteContent(): Promise<{ content: ContentInput; draftMode: boolean; preview: boolean }> {
  const { draftMode: draftModeEnabled, preview } = await getPreviewState();

  try {
    const sanityContent = await fetchSanitySiteContent({ preview, studioUrl: sanityStudioUrl });

    return {
      content: mergeSanityContent(sanityContent),
      draftMode: draftModeEnabled,
      preview,
    };
  } catch (error) {
    if (preview) {
      throw error;
    }

    return {
      content: fallbackContentInput,
      draftMode: false,
      preview: false,
    };
  }
}

export async function getSeoContent(): Promise<SeoContentInput> {
  const { content } = await getSiteContent();
  return toSeoContent(content);
}

export async function getPublishedSiteContent(): Promise<ContentInput> {
  try {
    const sanityContent = await fetchSanitySiteContent({ preview: false });
    return mergeSanityContent(sanityContent);
  } catch {
    return fallbackContentInput;
  }
}

export async function getPublishedSeoContent(): Promise<SeoContentInput> {
  return toSeoContent(await getPublishedSiteContent());
}
