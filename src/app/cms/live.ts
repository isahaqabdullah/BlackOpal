import { createClient } from 'next-sanity';
import { defineLive } from 'next-sanity/live';
import type { DefinedSanityFetchType, DefinedSanityLiveProps } from 'next-sanity/live';
import type { ComponentType } from 'react';
import {
  isSanityConfigured,
  readSanityBrowserToken,
  readSanityServerToken,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityStudioUrl,
} from './sanityConfig';

const DisabledSanityLive: ComponentType<DefinedSanityLiveProps> = () => null;
const disabledSanityFetch: DefinedSanityFetchType = async () => ({ data: null as never, sourceMap: null, tags: [] });

const live = isSanityConfigured
  ? defineLive({
      client: createClient({
        projectId: sanityProjectId,
        dataset: sanityDataset,
        apiVersion: sanityApiVersion,
        useCdn: true,
        perspective: 'published',
        stega: {
          enabled: true,
          studioUrl: sanityStudioUrl,
        },
      }),
      serverToken: readSanityServerToken() || false,
      browserToken: readSanityBrowserToken(),
    })
  : {
      SanityLive: DisabledSanityLive,
      sanityFetch: disabledSanityFetch,
    };

export const { SanityLive, sanityFetch } = live;
