'use client';

import { ArrowRight, ClipboardList, Droplets, Factory, FileText, Waves } from 'lucide-react';
import Link from 'next/link';
import { resourceHub, resourceHubCards } from '../content/resourcePages';
import { PageIntro } from './PageIntro';

const cardIcons = [Droplets, Factory, Waves, ClipboardList, FileText];

export function ResourcesPage() {
  return (
    <div>
      <PageIntro
        label={resourceHub.label}
        title={resourceHub.title}
        description={resourceHub.description}
        breadcrumbs={[{ label: resourceHub.label }]}
        enableBreadcrumbEditing={false}
      />

      <section className="pb-12 md:pb-14">
        <div className="premium-shell">
          <div className="premium-auto-grid">
            {resourceHubCards.map((card, index) => {
              const Icon = cardIcons[index] ?? FileText;

              return (
                <Link
                  key={card.title}
                  href={card.href}
                  className="premium-panel-soft premium-card-animated premium-reveal p-6 md:p-7"
                  style={{ animationDelay: `${120 + index * 80}ms` }}
                >
                  <div className="premium-icon-wrap mb-5 flex h-11 w-11 items-center justify-center rounded-[8px] text-[#e6cb87]">
                    <Icon size={20} />
                  </div>
                  <h2
                    className="premium-card-heading text-[18px] mb-3"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    {card.title}
                  </h2>
                  <p
                    className="premium-copy text-[14px] leading-[1.65] mb-5"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                  >
                    {card.description}
                  </p>
                  <span
                    className="inline-flex items-center gap-2 text-[#f2d78b] text-[13px]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                  >
                    {card.ctaLabel}
                    <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
