import type { ReactNode } from 'react';
import type { Viewport } from 'next';
import '../styles/index.css';
import { Layout } from './components/Layout';
import { getSiteContent } from './cms/siteContent';
import { SiteContentProvider } from './content/SiteContentProvider';

export const revalidate = 3600;

export const viewport: Viewport = {
  themeColor: '#050505',
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { content, preview } = await getSiteContent();

  return (
    <html lang="en-US">
      <body>
        <SiteContentProvider initialContent={content} initialSource={preview ? 'sanity-preview' : 'sanity'}>
          <Layout preview={preview}>{children}</Layout>
        </SiteContentProvider>
      </body>
    </html>
  );
}
