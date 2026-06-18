'use client';

import Link from 'next/link';
import { useSiteContent } from '../content/SiteContentProvider';
import { formatPhoneNumbers } from '../utils/phone';

export function Footer() {
  const { applications, products, siteSettings } = useSiteContent();
  const footerContact = siteSettings.websiteContact;
  const footerPhones = formatPhoneNumbers(footerContact.phone);
  const currentYear = String(new Date().getFullYear());
  const companyLinks = siteSettings.footer.companyLinks.some((link) => link.to === '/activated-carbon-suppliers')
    ? siteSettings.footer.companyLinks
    : [
        ...siteSettings.footer.companyLinks,
        { label: 'Activated carbon manufacturers', to: '/activated-carbon-suppliers' },
      ];
  const companyLinksWithResources = companyLinks.some((link) => link.to === '/resources')
    ? companyLinks
    : [
        ...companyLinks.filter((link) => link.to !== '/contact'),
        { label: 'Resources', to: '/resources' },
        ...companyLinks.filter((link) => link.to === '/contact'),
      ];
  const columns = [
    {
      title: siteSettings.footer.companyColumnTitle,
      links: companyLinksWithResources,
    },
    {
      title: siteSettings.footer.productColumnTitle,
      links: products.map((product) => ({ label: product.name, to: `/products/${product.slug}` })),
    },
    {
      title: siteSettings.footer.applicationColumnTitle,
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
                  src={siteSettings.footer.logoImage}
                  alt={siteSettings.footer.logoAlt}
                  className="h-12 w-auto object-contain shrink-0 drop-shadow-[0_10px_28px_rgba(201,162,77,0.14)]"
                />
              </Link>
              <div className="space-y-2.5 text-[14px] text-[#b8ab8b]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                <span
                  className="text-[#8f835f] text-[10px] tracking-[0.22em] uppercase block"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500 }}
                >
                  {footerContact.label}
                </span>
                <p>
                  <span className="premium-office-name">{footerContact.name}</span>
                  <br />
                  {footerContact.address.map((line) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
                {footerPhones.length ? (
                  <div>
                    <span>{siteSettings.footer.phoneLabel}:</span>
                    <div className="mt-1 flex flex-col gap-1">
                      {footerPhones.map((phone) => (
                        <a
                          key={phone.href}
                          href={phone.href}
                          className="w-fit text-[#f7efdb] transition-colors hover:text-[#f2d78b]"
                        >
                          {phone.display}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
                {footerContact.email ? (
                  <p>
                    {siteSettings.footer.emailLabel}:{' '}
                    <a
                      href={`mailto:${footerContact.email}`}
                      className="text-[#f7efdb] transition-colors hover:text-[#f2d78b]"
                    >
                      {footerContact.email}
                    </a>
                  </p>
                ) : null}
                <Link href={siteSettings.footer.contactLinkPath} className="inline-flex text-[#f2d78b] hover:text-[#fff2bf] transition-colors">
                  {siteSettings.footer.contactLinkLabel}
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
                        className="text-[14px] text-[#b8ab8b] hover:text-[#f2d78b] transition-colors"
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
            <span className="text-[#8f835f] text-[13px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              {siteSettings.footer.copyrightText.replace('{year}', currentYear)}
            </span>
            <div className="flex gap-6 text-[13px] text-[#8f835f]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              {siteSettings.footer.bottomLinks.map((link) => (
                <Link key={link.to} href={link.to} className="hover:text-[#f2d78b] transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
