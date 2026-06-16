'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { usePageCopyDataAttribute, useSanityDataAttribute } from '../cms/visualEditingAttributes';
import { useSiteContent } from '../content/SiteContentProvider';
import { EmailLinkText } from './EmailLinkText';
import { NotFoundPage } from './NotFoundPage';
import { PageIntro } from './PageIntro';

export function PressReleasePage() {
  const { storySlug } = useParams<{ storySlug: string }>();
  const { newsroomMap, pageCopy, status } = useSiteContent();
  const story = storySlug ? newsroomMap[storySlug] : undefined;
  const copy = pageCopy.pressReleasePage;
  const pageCopyDataAttribute = usePageCopyDataAttribute();
  const sanityDataAttribute = useSanityDataAttribute();

  if (!story && status === 'loading') {
    return null;
  }

  if (!story || story.type !== 'press-release') {
    return <NotFoundPage />;
  }

  return (
    <div>
      <PageIntro
        label={copy.introLabel}
        title={story.title}
        description={story.summary}
        breadcrumbs={[
          {
            label: copy.newsroomBreadcrumbLabel,
            to: copy.newsroomPath,
            dataSanity: pageCopyDataAttribute('pressReleasePage.newsroomBreadcrumbLabel'),
          },
          { label: story.title, dataSanity: sanityDataAttribute('newsroomItem', story._id, 'title') },
        ]}
        dataSanity={{
          label: pageCopyDataAttribute('pressReleasePage.introLabel'),
          title: sanityDataAttribute('newsroomItem', story._id, 'title'),
          description: sanityDataAttribute('newsroomItem', story._id, 'summary'),
        }}
      />

      <section className="pb-12 md:pb-14">
        <div className="premium-shell">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
            <article data-sanity-edit-target className="premium-panel p-7 md:p-9">
              <div className="space-y-5">
                {story.detail?.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraph}
                    data-sanity={sanityDataAttribute('newsroomItem', story._id, `detail[${paragraphIndex}]`)}
                    className="premium-copy text-[14px] leading-[1.7]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                  >
                    <EmailLinkText text={paragraph} />
                  </p>
                ))}
              </div>
            </article>

            <aside data-sanity-edit-target className="premium-panel-soft p-6 md:p-7 self-start">
              <span
                data-sanity={pageCopyDataAttribute('pressReleasePage.keyPointsLabel')}
                className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {copy.keyPointsLabel}
              </span>
              <div className="space-y-3 mb-6">
                {story.bullets?.map((bullet, bulletIndex) => (
                  <div
                    key={bullet}
                    data-sanity={sanityDataAttribute('newsroomItem', story._id, `bullets[${bulletIndex}]`)}
                    className="flex items-start gap-3 text-[15px] text-[#d7c7a2]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                  >
                    <span className="w-1.5 h-1.5 bg-[#d4ae5b] rounded-full mt-2 shrink-0 shadow-[0_0_12px_rgba(212,174,91,0.65)]" />
                    <span>
                      <EmailLinkText text={bullet} />
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href={copy.salesCoordinationCtaPath}
                className="premium-primary-btn inline-block text-[14px] px-6 py-2.5 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                {copy.salesCoordinationCtaLabel}
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
