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

const iconVersion = 'petal-20260604';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.siteName,
  icons: {
    icon: [
      { url: `/favicon-32x32.png?v=${iconVersion}`, type: 'image/png', sizes: '32x32' },
      { url: `/favicon-48x48.png?v=${iconVersion}`, type: 'image/png', sizes: '48x48' },
      { url: `/favicon.png?v=${iconVersion}`, type: 'image/png', sizes: '256x256' },
      { url: `/favicon.ico?v=${iconVersion}`, sizes: 'any' },
    ],
    shortcut: [
      { url: `/favicon-32x32.png?v=${iconVersion}`, type: 'image/png', sizes: '32x32' },
      { url: `/favicon.ico?v=${iconVersion}`, sizes: 'any' },
    ],
    apple: [{ url: `/apple-touch-icon.png?v=${iconVersion}`, type: 'image/png', sizes: '180x180' }],
    other: [
      { rel: 'mask-icon', url: `/safari-pinned-tab.svg?v=${iconVersion}`, color: '#d5b15f' },
    ],
  },
  manifest: `/site.webmanifest?v=${iconVersion}`,
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
