'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { SanityVisualEditing } from '../cms/SanityVisualEditing';
import {
  getSanityPresentationContext,
  SANITY_PREVIEW_PERSPECTIVE_PARAM,
  SANITY_PREVIEW_TOKEN_PARAM,
} from '../cms/presentationContext';

export function Layout({ children, preview = false }: { children: ReactNode; preview?: boolean }) {
  const pathname = usePathname();
  const isStudioRoute = pathname?.startsWith('/studio');
  const [embeddedPresentationPreview, setEmbeddedPresentationPreview] = useState(false);

  useEffect(() => {
    if (isStudioRoute) {
      setEmbeddedPresentationPreview(false);
      return;
    }

    setEmbeddedPresentationPreview(getSanityPresentationContext().enabled);
  }, [isStudioRoute, pathname]);

  useEffect(() => {
    if (isStudioRoute) {
      return;
    }

    const handlePreviewNavigation = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href]');
      if (!anchor) {
        return;
      }

      const context = getSanityPresentationContext();
      if (!context.enabled) {
        return;
      }

      const rawHref = anchor.getAttribute('href');
      if (!rawHref || rawHref.startsWith('#')) {
        return;
      }

      let nextUrl: URL;
      try {
        nextUrl = new URL(rawHref, window.location.href);
      } catch {
        return;
      }

      if (nextUrl.origin !== window.location.origin || nextUrl.searchParams.has(SANITY_PREVIEW_PERSPECTIVE_PARAM)) {
        return;
      }

      event.preventDefault();
      nextUrl.searchParams.set(SANITY_PREVIEW_PERSPECTIVE_PARAM, context.perspective || 'drafts');
      if (context.previewToken) {
        nextUrl.searchParams.set(SANITY_PREVIEW_TOKEN_PARAM, context.previewToken);
      }
      window.location.assign(nextUrl.toString());
    };

    document.addEventListener('click', handlePreviewNavigation, true);

    return () => {
      document.removeEventListener('click', handlePreviewNavigation, true);
    };
  }, [isStudioRoute]);

  useEffect(() => {
    if (isStudioRoute) {
      document.documentElement.classList.remove('premium-reveal-ready');
      return;
    }

    document.documentElement.classList.add('premium-reveal-ready');
    window.scrollTo(0, 0);

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('main .premium-reveal'));
    if (!revealElements.length) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || typeof window.IntersectionObserver === 'undefined') {
      revealElements.forEach((element) => {
        element.classList.add('premium-reveal-visible');
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('premium-reveal-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    revealElements.forEach((element) => {
      element.classList.remove('premium-reveal-visible');

      if (element.getBoundingClientRect().top <= window.innerHeight * 0.88) {
        element.classList.add('premium-reveal-visible');
        return;
      }

      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [isStudioRoute, pathname]);

  if (isStudioRoute) {
    return <>{children}</>;
  }

  return (
    <div className="premium-site min-h-screen flex flex-col bg-background" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-5%] h-[30rem] w-[30rem] rounded-full bg-[#c9a24d]/12 blur-3xl" />
        <div className="absolute right-[-14%] top-[18%] h-[36rem] w-[36rem] rounded-full bg-[#7d5a1c]/16 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[35%] h-[28rem] w-[28rem] rounded-full bg-[#c9a24d]/10 blur-3xl" />
      </div>
      <Navigation />
      <main className="relative z-10 flex-1">
        {children}
      </main>
      <Footer />
      {preview || embeddedPresentationPreview ? <SanityVisualEditing /> : null}
    </div>
  );
}
