'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useSiteContent } from '../content/SiteContentProvider';

export function Navigation() {
  const { siteSettings } = useSiteContent();
  const links = siteSettings.navigation.links;
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (to: string) =>
    to === '/'
      ? pathname === '/'
      : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#c9a24d]/15 bg-[#050505]/85 backdrop-blur-xl">
      <div className="premium-shell h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img
            src={siteSettings.navigation.logoImage}
            alt={siteSettings.navigation.logoAlt}
            className="h-11 w-auto object-contain shrink-0 drop-shadow-[0_8px_24px_rgba(201,162,77,0.16)]"
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-5 xl:gap-6">
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
          <Link
            href={siteSettings.navigation.ctaPath}
            className="premium-primary-btn text-[13px] px-5 py-2.5 rounded-full"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            {siteSettings.navigation.ctaLabel}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-[#f2d78b]" onClick={() => setOpen(!open)} aria-label={siteSettings.navigation.mobileMenuLabel}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#c9a24d]/15 bg-[#080808]/95 px-6 py-5 space-y-3">
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
            href={siteSettings.navigation.ctaPath}
            onClick={() => setOpen(false)}
            className="premium-primary-btn block text-[13px] text-center px-5 py-2.5 rounded-full mt-4"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
          >
            {siteSettings.navigation.ctaLabel}
          </Link>
        </div>
      )}
    </nav>
  );
}
