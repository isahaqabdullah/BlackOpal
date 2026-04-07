import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="premium-site min-h-screen flex flex-col bg-background" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-5%] h-[30rem] w-[30rem] rounded-full bg-[#c9a24d]/12 blur-3xl" />
        <div className="absolute right-[-14%] top-[18%] h-[36rem] w-[36rem] rounded-full bg-[#7d5a1c]/16 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[35%] h-[28rem] w-[28rem] rounded-full bg-[#c9a24d]/10 blur-3xl" />
      </div>
      <Navigation />
      <main className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
