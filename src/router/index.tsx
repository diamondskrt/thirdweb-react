import { Route, Routes } from 'react-router-dom';
import { DefaultLayout } from '@/layouts/default-layout';
import { Home } from '@/pages/home';

export function Router() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
