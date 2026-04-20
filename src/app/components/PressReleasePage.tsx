import { Link, useParams } from 'react-router';
import { newsroomMap } from '../content/siteContent';
import { NotFoundPage } from './NotFoundPage';
import { PageIntro } from './PageIntro';

export function PressReleasePage() {
  const { storySlug } = useParams();
  const story = storySlug ? newsroomMap[storySlug] : undefined;

  if (!story || story.type !== 'press-release') {
    return <NotFoundPage />;
  }

  return (
    <div>
      <PageIntro
        label="Press Release"
        title={story.title}
        description={story.summary}
        breadcrumbs={[
          { label: 'Newsroom', to: '/newsroom' },
          { label: story.title },
        ]}
      />

      <section className="pb-16 md:pb-20">
        <div className="premium-shell">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
            <article className="premium-panel p-7 md:p-9">
              <div className="space-y-5">
                {story.detail?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="premium-copy text-[14px] leading-[1.9]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>

            <aside className="premium-panel-soft p-6 md:p-7 self-start">
              <span
                className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block mb-3"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                Key points
              </span>
              <div className="space-y-3 mb-6">
                {story.bullets?.map((bullet) => (
                  <div
                    key={bullet}
                    className="flex items-start gap-3 text-[13px] text-[#d7c7a2]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
                  >
                    <span className="w-1.5 h-1.5 bg-[#d4ae5b] rounded-full mt-2 shrink-0 shadow-[0_0_12px_rgba(212,174,91,0.65)]" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="premium-primary-btn inline-block text-[13px] px-6 py-2.5 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
              >
                Contact Black Opal
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
