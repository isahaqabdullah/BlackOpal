'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, X } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentProvider';
import { getSiteNavigation } from './navigation/siteNavigation';
import { resourceDetailPages } from '../content/resourcePages';
import { supplierLandingPages } from '../content/supplierLandingPages';

type SearchEntry = {
  title: string;
  href: string;
  category: string;
  summary: string;
  keywords: string;
};

function normalizeSearchValue(value: string) {
  return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();
}

function scoreSearchEntry(entry: SearchEntry, query: string) {
  const title = normalizeSearchValue(entry.title);
  const category = normalizeSearchValue(entry.category);
  const summary = normalizeSearchValue(entry.summary);
  const keywords = normalizeSearchValue(entry.keywords);
  const queryWords = query.split(' ').filter(Boolean);

  if (!queryWords.length) {
    return 0;
  }

  let score = 0;
  if (title === query) score += 160;
  if (title.startsWith(query)) score += 120;
  if (title.includes(query)) score += 90;
  if (category.includes(query)) score += 55;
  if (summary.includes(query)) score += 35;
  if (keywords.includes(query)) score += 25;

  for (const word of queryWords) {
    if (title.split(' ').some((titleWord) => titleWord.startsWith(word))) score += 16;
    if (summary.includes(word)) score += 6;
    if (keywords.includes(word)) score += 5;
  }

  return score;
}

function uniqueSearchEntries(entries: SearchEntry[]) {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.href)) {
      return false;
    }

    seen.add(entry.href);
    return true;
  });
}

function NavigationSearch({
  entries,
  onNavigate,
  className = '',
}: {
  entries: SearchEntry[];
  onNavigate?: () => void;
  className?: string;
}) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const searchId = useId();
  const resultsId = `${searchId}-results`;
  const rootRef = useRef<HTMLDivElement>(null);
  const normalizedQuery = normalizeSearchValue(query);
  const showResults = focused && normalizedQuery.length >= 3;
  const results = useMemo(() => {
    if (normalizedQuery.length < 3) {
      return [];
    }

    return entries
      .map((entry, index) => ({ entry, index, score: scoreSearchEntry(entry, normalizedQuery) }))
      .filter((result) => result.score > 0)
      .sort((left, right) => right.score - left.score || left.index - right.index)
      .slice(0, 8)
      .map((result) => result.entry);
  }, [entries, normalizedQuery]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setFocused(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  const handleNavigate = () => {
    setQuery('');
    setFocused(false);
    onNavigate?.();
  };

  return (
    <div ref={rootRef} role="search" className={`relative ${className}`}>
      <label htmlFor={searchId} className="sr-only">
        Search site
      </label>
      <div className="flex h-9 items-center gap-2 rounded-full border border-[#c9a24d]/18 bg-[#050505]/60 px-3 text-[#8f835f] transition-colors focus-within:border-[#f2d78b]/45 focus-within:text-[#f2d78b]">
        <Search size={14} aria-hidden="true" />
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search"
          autoComplete="off"
          aria-controls={resultsId}
          aria-expanded={showResults}
          className="w-full min-w-0 bg-transparent text-[13px] text-[#f7efdb] outline-none placeholder:text-[#8f835f]"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
        />
      </div>
      {showResults ? (
        <div
          id={resultsId}
          data-site-search-dropdown="true"
          className="absolute left-0 right-0 top-[calc(100%+0.55rem)] z-[70] overflow-hidden rounded-[8px] border border-[#c9a24d]/18 bg-[#070707]/98 shadow-[0_18px_55px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        >
          {results.length ? (
            <div className="max-h-[22rem] overflow-y-auto py-1">
              {results.map((result) => (
                <Link
                  key={result.href}
                  href={result.href}
                  onClick={handleNavigate}
                  data-site-search-result="true"
                  className="block border-b border-[#c9a24d]/8 px-3.5 py-3 last:border-b-0 hover:bg-[#c9a24d]/10 focus:bg-[#c9a24d]/10 focus:outline-none"
                >
                  <span
                    className="block text-[10px] uppercase tracking-[0.18em] text-[#8f835f]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    {result.category}
                  </span>
                  <span
                    className="mt-1 block text-[13px] leading-snug text-[#f7efdb]"
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
                  >
                    {result.title}
                  </span>
                  {result.summary ? (
                    <span
                      className="mt-1 line-clamp-2 block text-[12px] leading-relaxed text-[#b8ad91]"
                      style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                    >
                      {result.summary}
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>
          ) : (
            <div
              className="px-3.5 py-3 text-[12px] text-[#8f835f]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              No matches found
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function Navigation() {
  const {
    aboutPage,
    applications,
    homePage,
    newsroomItems,
    pageCopy,
    products,
    productionPage,
    siteSettings,
  } = useSiteContent();
  const navigation = getSiteNavigation(siteSettings);
  const links = navigation.links.some((link) => link.to === '/resources')
    ? navigation.links
    : [
        ...navigation.links.filter((link) => link.to !== '/contact'),
        { label: 'Resources', to: '/resources' },
        ...navigation.links.filter((link) => link.to === '/contact'),
      ];
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (to: string) =>
    to === '/'
      ? pathname === '/'
      : pathname === to || pathname.startsWith(`${to}/`);
  const searchEntries = useMemo(
    () =>
      uniqueSearchEntries([
        {
          title: 'Home',
          href: '/',
          category: 'Page',
          summary: homePage.heroTitle,
          keywords: `${homePage.heroDescription} ${homePage.companyTitle}`,
        },
        {
          title: pageCopy.productsPage.intro.title,
          href: '/products',
          category: 'Page',
          summary: pageCopy.productsPage.intro.description ?? '',
          keywords: 'products product families granular powder impregnated catalytic activated carbon',
        },
        {
          title: pageCopy.applicationsPage.intro.title,
          href: '/applications',
          category: 'Page',
          summary: pageCopy.applicationsPage.intro.description ?? '',
          keywords: 'applications water treatment gold recovery air gas oil industrial',
        },
        {
          title: productionPage.intro.title,
          href: '/production',
          category: 'Page',
          summary: productionPage.intro.description ?? productionPage.overviewBody,
          keywords: `${productionPage.overviewTitle} ${productionPage.overviewBody}`,
        },
        {
          title: aboutPage.intro.title,
          href: '/about',
          category: 'Page',
          summary: aboutPage.storyTitle,
          keywords: aboutPage.storyParagraphs.join(' '),
        },
        {
          title: 'Resources',
          href: '/resources',
          category: 'Page',
          summary: pageCopy.newsroomPreview.description,
          keywords: 'technical resources documents tds coa grade matching',
        },
        {
          title: pageCopy.newsroomPage.intro.title,
          href: '/newsroom',
          category: 'Page',
          summary: pageCopy.newsroomPreview.description,
          keywords: 'newsroom press release resources updates',
        },
        {
          title: 'Contact',
          href: '/contact',
          category: 'Page',
          summary: 'Product enquiry and technical guidance.',
          keywords: 'contact quote enquiry sales technical support',
        },
        {
          title: 'Activated Carbon Manufacturers',
          href: '/activated-carbon-suppliers',
          category: 'Page',
          summary: 'Manufacturer pages for activated carbon products and applications.',
          keywords: 'manufacturer activated carbon bulk global coconut shell',
        },
        ...products.map((product) => ({
          title: product.name,
          href: `/products/${product.slug}`,
          category: 'Product',
          summary: product.summary,
          keywords: `${product.shortName} ${product.intro} ${product.highlights.join(' ')} ${product.commonUses.join(' ')} ${(product.grades ?? []).join(' ')}`,
        })),
        ...applications.map((application) => ({
          title: application.name,
          href: `/applications/${application.slug}`,
          category: 'Application',
          summary: application.summary,
          keywords: `${application.intro} ${application.keyPoints.join(' ')} ${application.sections.map((section) => `${section.title} ${section.body}`).join(' ')}`,
        })),
        ...newsroomItems.map((item) => ({
          title: item.title,
          href: `/newsroom/${item.slug}`,
          category: item.type === 'press-release' ? 'Press Release' : 'Resource',
          summary: item.summary,
          keywords: `${item.type} ${(item.bullets ?? []).join(' ')} ${(item.detail ?? []).join(' ')}`,
        })),
        ...resourceDetailPages.map((page) => ({
          title: page.title,
          href: `/resources/${page.slug}`,
          category: 'Resource',
          summary: page.description,
          keywords: `${page.label} ${page.body.join(' ')}`,
        })),
        ...supplierLandingPages.map((page) => ({
          title: page.title,
          href: `/activated-carbon-suppliers/${page.slug}`,
          category: 'Manufacturer',
          summary: page.description,
          keywords: `${page.label} ${page.serviceType} ${page.intro} ${page.highlights.join(' ')}`,
        })),
      ]),
    [aboutPage, applications, homePage, newsroomItems, pageCopy, products, productionPage],
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-[#c9a24d]/15 bg-[#050505]/85 backdrop-blur-xl">
      <div className="premium-shell h-20 flex items-center justify-between">
        <Link href="/" className="premium-nav-brand" aria-label={navigation.logoAlt}>
          <img
            src={navigation.logoImage}
            alt=""
            className="premium-nav-logo object-contain shrink-0"
          />
          {navigation.logoSubtitle ? (
            <span className="premium-nav-logo-subtitle">{navigation.logoSubtitle}</span>
          ) : null}
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4 xl:gap-5">
          {links.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              data-active={isActive(l.to)}
              className={`premium-nav-link text-[13px] transition-colors ${
                isActive(l.to) ? 'text-[#f2d78b]' : 'text-[#c0b08a] hover:text-[#f7efdb]'
              }`}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              {l.label}
            </Link>
          ))}
          <NavigationSearch entries={searchEntries} className="w-[10.5rem] xl:w-[13rem]" />
          <Link
            href={navigation.ctaPath}
            className="premium-primary-btn text-[13px] px-5 py-2.5 rounded-full"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            {navigation.ctaLabel}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-[#f2d78b]" onClick={() => setOpen(!open)} aria-label={navigation.mobileMenuLabel}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#c9a24d]/15 bg-[#080808]/95 px-6 py-5 space-y-3">
          <NavigationSearch entries={searchEntries} onNavigate={() => setOpen(false)} className="mb-4" />
          {links.map((l) => (
            <Link
              key={l.to}
              href={l.to}
              onClick={() => setOpen(false)}
              data-active={isActive(l.to)}
              className={`premium-nav-link block text-[14px] py-1.5 ${
                isActive(l.to) ? 'text-[#f2d78b]' : 'text-[#c0b08a] hover:text-[#f7efdb]'
              }`}
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={navigation.ctaPath}
            onClick={() => setOpen(false)}
            className="premium-primary-btn block text-[13px] text-center px-5 py-2.5 rounded-full mt-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            {navigation.ctaLabel}
          </Link>
        </div>
      )}
    </nav>
  );
}
