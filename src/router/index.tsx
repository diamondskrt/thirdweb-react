import { createBrowserRouter } from 'react-router-dom';

import { AuthLayout } from '@/layouts/auth-layout';
import { ContractLayout } from '@/layouts/contract-layout';
import { DefaultLayout } from '@/layouts/default-layout';
import { SignIn } from '@/pages/auth/sign-in';
import { SignUp } from '@/pages/auth/sign-up';
import {
  ContractERC1155APage,
  ContractERC20Page,
  ContractERC721APage,
  ContractERC721Page,
} from '@/pages/contracts';
import { HomePage } from '@/pages/home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'contracts',
        element: <ContractLayout />,
        children: [
          {
            path: 'ERC721/:address',
            element: <ContractERC721Page />,
          },
          {
            path: 'ERC721A/:address',
            element: <ContractERC721APage />,
          },
          {
            path: 'ERC20/:address',
            element: <ContractERC20Page />,
          },
          {
            path: 'ERC1155/:address',
            element: <ContractERC1155APage />,
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
    ],
  },
]);
