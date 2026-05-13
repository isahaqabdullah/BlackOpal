import type { Metadata, Viewport } from 'next';
import { StudioRoute } from './StudioRoute';

export const metadata: Metadata = {
  referrer: 'same-origin',
  robots: 'noindex',
  title: 'Black Opal CMS',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function StudioPage() {
  return <StudioRoute />;
}
