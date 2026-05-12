'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function NotFoundPage() {
  return (
    <section className="py-20 md:py-28">
      <div className="premium-shell">
        <div className="premium-panel text-center px-6 py-10 md:px-10 md:py-12">
          <span
            className="premium-kicker text-[11px] tracking-[0.24em] uppercase mb-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            Page not found
          </span>
          <h1
            className="premium-heading premium-heading-elevated text-[clamp(2rem,4vw,3.4rem)] leading-[1.04] tracking-[-0.02em] mb-4"
            style={{ fontFamily: "'DM Serif Display', serif" }}
          >
            That page could not be found
          </h1>
          <p
            className="premium-copy text-[15px] leading-[1.8] max-w-2xl mx-auto mb-8"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
          >
            Core product, application, production, newsroom, and contact routes remain available through the main
            navigation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="premium-primary-btn inline-flex items-center gap-2 text-[13px] px-6 py-3 rounded-full"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              <ArrowLeft size={14} />
              Home
            </Link>
            <Link
              href="/products"
              className="premium-secondary-btn inline-flex items-center gap-2 text-[13px] px-6 py-3 rounded-full"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
            >
              Product families
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
