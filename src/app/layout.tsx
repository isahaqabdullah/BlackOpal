import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/index.css';
import { Layout } from './components/Layout';
import { SanityLive } from './cms/live';
import { getSiteContent } from './cms/siteContent';
import { SiteContentProvider } from './content/SiteContentProvider';
import { refreshAction } from './cms/refreshAction';
import { siteConfig } from './config/siteConfig';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const viewport: Viewport = {
  themeColor: '#050505',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.siteName,
  icons: {
    icon: [
      { url: '/favicon-petal-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-petal-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-petal-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-petal-256x256.png', type: 'image/png', sizes: '256x256' },
      { url: '/favicon-petal.ico', sizes: 'any' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: [
      { url: '/favicon-petal-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-petal.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon-petal.png', type: 'image/png', sizes: '180x180' }],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#d5b15f' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { content, draftMode, preview } = await getSiteContent();

  return (
    <html lang="en-US">
      <body>
        <SiteContentProvider initialContent={content} initialSource={preview ? 'sanity-preview' : 'sanity'}>
          <Layout preview={preview}>{children}</Layout>
        </SiteContentProvider>
        {draftMode ? <SanityLive revalidateSyncTags={refreshAction} /> : null}
      </body>
    </html>
  );
}
