import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Outlet } from 'react-router-dom';

export function DefaultLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}