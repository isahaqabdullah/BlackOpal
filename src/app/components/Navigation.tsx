'use client';

import { useEffect, useId, useMemo, useRef, useState, type FocusEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, Menu, Search, X } from 'lucide-react';
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

type NavigationDropdownItem = {
  label: string;
  href: string;
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

function DesktopNavigationDropdown({
  label,
  href,
  items,
  active,
}: {
  label: string;
  href: string;
  items: NavigationDropdownItem[];
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const dropdownId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const closeIfFocusLeaves = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
    }
  };

  return (
    <div
      ref={rootRef}
      className="group relative isolate flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={closeIfFocusLeaves}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false);
          rootRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
        }
      }}
    >
      <Link
        href={href}
        data-active={active}
        className={`premium-nav-link text-[13px] transition-colors ${
          active ? 'text-[#f2d78b]' : 'text-[#c0b08a] hover:text-[#f7efdb]'
        }`}
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
      >
        {label}
      </Link>
      <button
        type="button"
        aria-label={`Toggle ${label} menu`}
        aria-expanded={open}
        aria-controls={dropdownId}
        onClick={() => setOpen((current) => !current)}
        className={`ml-0.5 inline-flex size-5 items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#f2d78b] ${
          active || open ? 'text-[#f2d78b]' : 'text-[#8f835f] hover:text-[#f7efdb]'
        }`}
      >
        <ChevronDown
          size={13}
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        id={dropdownId}
        aria-hidden={!open}
        className={`absolute left-0 top-full z-[70] w-[20rem] origin-top-left pt-[2.4rem] transition duration-200 ${
          open
            ? 'visible scale-100 opacity-100'
            : 'pointer-events-none invisible scale-[0.985] opacity-0'
        }`}
      >
        <div className="overflow-hidden rounded-[14px] border border-[#d6b866]/20 bg-[#0a0907]/98 p-2 shadow-[0_26px_70px_rgba(0,0,0,0.62),inset_0_1px_0_rgba(255,255,255,0.035)] backdrop-blur-2xl">
          <div className="px-3 pb-2 pt-2">
            <span
              className="text-[9px] uppercase tracking-[0.24em] text-[#8f835f]"
              style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
            >
              Explore {label}
            </span>
          </div>
          <div className="space-y-0.5">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={open ? 0 : -1}
                className="group/menu-item flex items-center gap-3 rounded-[9px] px-3 py-2.5 text-[#cfc3a3] transition-colors hover:bg-[#d6b866]/10 hover:text-[#fff5d8] focus:bg-[#d6b866]/10 focus:text-[#fff5d8] focus:outline-none"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
              >
                <span className="flex-1 text-[13px] leading-snug">{item.label}</span>
                <ArrowUpRight
                  size={13}
                  aria-hidden="true"
                  className="text-[#6f654d] transition duration-200 group-hover/menu-item:-translate-y-0.5 group-hover/menu-item:translate-x-0.5 group-hover/menu-item:text-[#d6b866]"
                />
              </Link>
            ))}
          </div>
          <div className="mx-3 mt-2 h-px bg-gradient-to-r from-transparent via-[#d6b866]/18 to-transparent" />
          <Link
            href={href}
            tabIndex={open ? 0 : -1}
            className="group/view-all mt-1.5 flex items-center justify-between rounded-[9px] px-3 py-2.5 text-[11px] uppercase tracking-[0.12em] text-[#9f906c] transition-colors hover:bg-[#d6b866]/8 hover:text-[#f2d78b] focus:bg-[#d6b866]/8 focus:text-[#f2d78b] focus:outline-none"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
          >
            View all {label}
            <ArrowUpRight
              size={13}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover/view-all:-translate-y-0.5 group-hover/view-all:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MobileNavigationDropdown({
  label,
  href,
  items,
  active,
  onNavigate,
}: {
  label: string;
  href: string;
  items: NavigationDropdownItem[];
  active: boolean;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const dropdownId = useId();

  return (
    <div>
      <div className="flex items-center justify-between">
        <Link
          href={href}
          onClick={onNavigate}
          data-active={active}
          className={`premium-nav-link block py-1.5 text-[14px] ${
            active ? 'text-[#f2d78b]' : 'text-[#c0b08a] hover:text-[#f7efdb]'
          }`}
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
        >
          {label}
        </Link>
        <button
          type="button"
          aria-label={`Toggle ${label} menu`}
          aria-expanded={open}
          aria-controls={dropdownId}
          onClick={() => setOpen((current) => !current)}
          className={`inline-flex size-8 items-center justify-center rounded-full border transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#f2d78b] ${
            active || open
              ? 'border-[#d6b866]/35 bg-[#d6b866]/6 text-[#f2d78b]'
              : 'border-transparent text-[#8f835f]'
          }`}
        >
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
      <div
        id={dropdownId}
        hidden={!open}
        className="mt-2 overflow-hidden rounded-[12px] border border-[#d6b866]/16 bg-[#0a0907]/88 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.025)]"
      >
        <div
          className="px-3 pb-1.5 pt-2 text-[9px] uppercase tracking-[0.22em] text-[#786e55]"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600 }}
        >
          Explore {label}
        </div>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className="group/mobile-item flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-[#b8aa86] transition-colors hover:bg-[#d6b866]/9 hover:text-[#f7efdb] focus:bg-[#d6b866]/9 focus:text-[#f7efdb] focus:outline-none"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            <span className="flex-1 text-[13px] leading-snug">{item.label}</span>
            <ArrowUpRight
              size={13}
              aria-hidden="true"
              className="text-[#655d49] transition-colors group-hover/mobile-item:text-[#d6b866]"
            />
          </Link>
        ))}
      </div>
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
  const mobileMenuId = useId();
  const pathname = usePathname();
  const isActive = (to: string) =>
    to === '/'
      ? pathname === '/'
      : pathname === to || pathname.startsWith(`${to}/`);
  const dropdownItems = useMemo(
    () => ({
      products: products.map((product) => ({
        label: product.name,
        href: `/products/${product.slug}`,
      })),
      applications: applications.map((application) => ({
        label: application.name,
        href: `/applications/${application.slug}`,
      })),
    }),
    [applications, products],
  );
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
        <Link href="/" className="premium-nav-brand shrink-0" aria-label={navigation.logoAlt}>
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
        <div className="hidden min-[1200px]:flex items-center gap-3 min-[1360px]:gap-4 min-[1500px]:gap-5">
          {links.map((l) => {
            const items =
              l.to === '/products'
                ? dropdownItems.products
                : l.to === '/applications'
                  ? dropdownItems.applications
                  : null;

            return items ? (
              <DesktopNavigationDropdown
                key={l.to}
                label={l.label}
                href={l.to}
                items={items}
                active={isActive(l.to)}
              />
            ) : (
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
            );
          })}
          <NavigationSearch
            entries={searchEntries}
            className="w-[9rem] min-[1360px]:w-[11rem] min-[1500px]:w-[13rem]"
          />
          <Link
            href={navigation.ctaPath}
            className="premium-primary-btn whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] min-[1440px]:px-5"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            {navigation.ctaLabel}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-full text-[#f2d78b] transition-colors hover:bg-[#d6b866]/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#f2d78b] min-[1200px]:hidden"
          onClick={() => setOpen(!open)}
          aria-label={navigation.mobileMenuLabel}
          aria-expanded={open}
          aria-controls={mobileMenuId}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id={mobileMenuId}
          className="min-[1200px]:hidden border-t border-[#c9a24d]/15 bg-[#080808]/95 px-6 py-5 space-y-3"
        >
          <NavigationSearch entries={searchEntries} onNavigate={() => setOpen(false)} className="mb-4" />
          {links.map((l) => {
            const items =
              l.to === '/products'
                ? dropdownItems.products
                : l.to === '/applications'
                  ? dropdownItems.applications
                  : null;

            return items ? (
              <MobileNavigationDropdown
                key={l.to}
                label={l.label}
                href={l.to}
                items={items}
                active={isActive(l.to)}
                onNavigate={() => setOpen(false)}
              />
            ) : (
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
            );
          })}
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
