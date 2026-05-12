'use client';

import Link from 'next/link';
const brandLogo = '/images/BlackOpallogo.avif';
import { companyDetails } from '../content/siteContent';
import { useSiteContent } from '../content/SiteContentProvider';
import { siteConfig } from '../config/siteConfig';

const companyColumn = {
  title: 'Company',
  links: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Production', to: '/production' },
    { label: 'Newsroom', to: '/newsroom' },
    { label: 'Contact', to: '/contact' },
  ],
};

export function Footer() {
  const { applications, products } = useSiteContent();
  const footerContact = companyDetails.websiteContact;
  const columns = [
    companyColumn,
    {
      title: 'Products',
      links: products.map((product) => ({ label: product.name, to: `/products/${product.slug}` })),
    },
    {
      title: 'Applications',
      links: applications.map((application) => ({
        label: application.name,
        to: `/applications/${application.slug}`,
      })),
    },
  ];

  return (
    <footer className="relative z-10 border-t border-[#c9a24d]/12 bg-[#050505] pt-16 pb-8">
      <div className="premium-shell">
        <div className="px-1 py-4 md:px-0 md:py-6">
          <div className="grid gap-10 mb-14 xl:grid-cols-[minmax(18rem,1.6fr)_repeat(3,minmax(10rem,1fr))] md:grid-cols-2">
          {/* Brand + regional contact */}
            <div className="max-w-[28rem]">
              <Link href="/" className="flex items-center mb-5 w-fit">
                <img
                  src={brandLogo}
                  alt="Black Opal Carbons logo"
                  className="h-12 w-auto object-contain shrink-0 drop-shadow-[0_10px_28px_rgba(201,162,77,0.14)]"
                />
              </Link>
              <div className="space-y-2.5 text-[13px] text-[#b8ab8b]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                <span
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {footerContact.label}
                </span>
                <p>
                  <span className="text-[#f7efdb]">{footerContact.name}</span>
                  <br />
                  {footerContact.address.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
                {footerContact.phone ? <p>Phone: {footerContact.phone}</p> : null}
                {footerContact.email ? <p>Email: {footerContact.email}</p> : null}
                <Link href="/contact" className="inline-flex text-[#f2d78b] hover:text-[#fff2bf] transition-colors">
                  Contact Black Opal
                </Link>
              </div>
            </div>

            {/* Link columns */}
            {columns.map((col) => (
              <div key={col.title}>
                <span
                  className="text-[#8f835f] text-[10px] tracking-[0.24em] uppercase block mb-4"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {col.title}
                </span>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.to}
                        className="text-[13px] text-[#b8ab8b] hover:text-[#f2d78b] transition-colors"
                        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="premium-divider mb-6" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <span className="text-[#8f835f] text-[12px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              &copy; {new Date().getFullYear()} {siteConfig.siteName}. All rights reserved.
            </span>
            <div className="flex gap-6 text-[12px] text-[#8f835f]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              <Link href="/" className="hover:text-[#f2d78b] transition-colors">Home</Link>
              <Link href="/contact" className="hover:text-[#f2d78b] transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
