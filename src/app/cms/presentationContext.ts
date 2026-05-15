export const SANITY_PREVIEW_PERSPECTIVE_PARAM = 'sanity-preview-perspective';
export const DEFAULT_SANITY_PREVIEW_PERSPECTIVE = 'drafts';

export type SanityPresentationContext = {
  enabled: boolean;
  perspective?: string;
  studioUrl?: string;
};

export function getSanityPresentationContext(): SanityPresentationContext {
  if (typeof window === 'undefined') {
    return { enabled: false };
  }

  const searchParams = new URLSearchParams(window.location.search);
  const perspective = searchParams.get(SANITY_PREVIEW_PERSPECTIVE_PARAM) || undefined;
  const isEmbeddedPreview = window.self !== window.top || Boolean(window.opener);

  if (!perspective && !isEmbeddedPreview) {
    return { enabled: false };
  }

  return {
    enabled: true,
    perspective: perspective || DEFAULT_SANITY_PREVIEW_PERSPECTIVE,
    studioUrl: `${window.location.origin}/studio`,
  };
}

