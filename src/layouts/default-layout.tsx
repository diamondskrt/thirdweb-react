import { useEffect } from 'react';

import { Outlet, ScrollRestoration, useNavigate } from 'react-router-dom';

import { Footer } from '@/components/shared/footer';
import { Navbar } from '@/components/shared/navbar';

export function DefaultLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const cookieFallback = localStorage.getItem('cookieFallback');

    if (!cookieFallback || cookieFallback === '[]') {
      navigate('/auth/sign-in');
    }
  }, [navigate]);

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
