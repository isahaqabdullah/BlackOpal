import { draftMode } from 'next/headers';
import { fetchSanitySiteContent, sanityStudioUrl } from './sanity';
import {
  fallbackContentInput,
  mergeSanityContent,
  toSeoContent,
  type ContentInput,
  type SeoContentInput,
} from '../content/siteContentResolver';

export async function getDraftModeEnabled() {
  const draft = await draftMode();
  return draft.isEnabled;
}

export async function getSiteContent(): Promise<{ content: ContentInput; preview: boolean }> {
  const preview = await getDraftModeEnabled();

  try {
    const sanityContent = await fetchSanitySiteContent({ preview, studioUrl: sanityStudioUrl });

    return {
      content: mergeSanityContent(sanityContent),
      preview,
    };
  } catch (error) {
    if (preview) {
      throw error;
    }

    return {
      content: fallbackContentInput,
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
