import { Route, Routes } from 'react-router-dom';
import { DefaultLayout } from '@/layouts/default-layout';
import { AuthLayout } from '@/layouts/auth-layout/auth-layout';
import { Home } from '@/pages/home';
import { SignIn, SignUp } from '@/pages/auth';

export function Router() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
}
