import { Link } from 'react-router';
import brandLogo from '../../public/images/BlackOpallogo.png';

const columns = [
  {
    title: 'Products',
    links: [
      { label: 'Granular Activated Carbon', to: '/products#granular' },
      { label: 'Powder Activated Carbon', to: '/products#powder' },
      { label: 'Impregnated Activated Carbon', to: '/products#impregnated' },
      { label: 'Catalytic Activated Carbon', to: '/products#catalytic' },
    ],
  },
  {
    title: 'Applications',
    links: [
      { label: 'Water Treatment', to: '/applications#water-treatment' },
      { label: 'Gold Recovery', to: '/applications#gold-recovery' },
      { label: 'Air & Gas', to: '/applications#air-gas' },
      { label: 'Oil & Gas', to: '/applications#oil-gas' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Newsroom', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#c9a24d]/12 bg-[#050505] pt-16 pb-8">
      <div className="premium-shell">
        <div className="px-1 py-4 md:px-0 md:py-6">
          <div className="grid gap-10 mb-14 xl:grid-cols-[minmax(18rem,1.6fr)_repeat(3,minmax(10rem,1fr))] md:grid-cols-2">
          {/* Brand + contact */}
            <div className="max-w-[28rem]">
              <div className="flex items-center mb-5">
                <img
                  src={brandLogo}
                  alt="Black Opal Carbon logo"
                  className="h-12 w-auto object-contain shrink-0 drop-shadow-[0_10px_28px_rgba(201,162,77,0.14)]"
                />
              </div>
              <div className="space-y-2.5 text-[13px] text-[#b8ab8b]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                <p>Pittsburgh, PA — U.S. Headquarters</p>
                <p>Phone: +1 (412) 555-0180</p>
                <p>Email: info@blackopalcarbon.com</p>
              </div>
              <div className="mt-4 text-[12px] text-[#8f835f]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
                <p>Warehouses: Pittsburgh, PA · Houston, TX · Los Angeles, CA · Atlanta, GA</p>
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
                        to={link.to}
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
              &copy; {new Date().getFullYear()} Black Opal Carbon. All rights reserved.
            </span>
            <div className="flex gap-6 text-[12px] text-[#8f835f]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300 }}>
              <a href="#" className="hover:text-[#f2d78b] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#f2d78b] transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
