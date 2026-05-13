'use client';

import { NextStudio } from 'next-sanity/studio/client-component';
import config from '../../../../sanity.config';

export function StudioRoute() {
  return <NextStudio config={config} basePath="/studio" />;
}
