import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { createSanityClient, sanityStudioUrl } from '../../../cms/sanity';

export async function GET(request: Request) {
  const client = createSanityClient({ preview: true, studioUrl: sanityStudioUrl });

  if (!client) {
    return new Response('Sanity is not configured.', { status: 500 });
  }

  return defineEnableDraftMode({ client }).GET(request);
}
