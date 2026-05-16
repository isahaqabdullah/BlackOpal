import type { ReactNode } from 'react';
import type { Viewport } from 'next';
import '../styles/index.css';
import { Layout } from './components/Layout';
import { SanityLive } from './cms/live';
import { getSiteContent } from './cms/siteContent';
import { SiteContentProvider } from './content/SiteContentProvider';
import { refreshAction } from './cms/refreshAction';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const viewport: Viewport = {
  themeColor: '#050505',
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
