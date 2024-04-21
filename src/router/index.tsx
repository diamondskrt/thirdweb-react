import { createBrowserRouter } from 'react-router-dom';

import { AuthLayout } from '@/layouts/auth-layout';
import { ContractLayout } from '@/layouts/contract-layout';
import { DefaultLayout } from '@/layouts/default-layout';
import { ContractTypes } from '@/models';
import { AddContractPage } from '@/pages/add-contract';
import { SignIn } from '@/pages/auth/sign-in';
import { SignUp } from '@/pages/auth/sign-up';
import {
  ContractERC1155DemoPage,
  ContractERC1155Page,
  ContractERC20DemoPage,
  ContractERC20Page,
  ContractERC721ADemoPage,
  ContractERC721APage,
  ContractERC721DemoPage,
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
            path: `${ContractTypes.ERC721}/:address`,
            element: <ContractERC721Page />,
          },
          {
            path: `${ContractTypes.ERC721A}/:address`,
            element: <ContractERC721APage />,
          },
          {
            path: `${ContractTypes.ERC20}/:address`,
            element: <ContractERC20Page />,
          },
          {
            path: `${ContractTypes.ERC1155}/:address`,
            element: <ContractERC1155Page />,
          },
        ],
      },
      {
        path: 'add-contract',
        element: <AddContractPage />,
      },
      {
        path: 'demo-contracts',
        element: <ContractLayout />,
        children: [
          {
            path: `${ContractTypes.ERC721}/:address`,
            element: <ContractERC721DemoPage />,
          },
          {
            path: `${ContractTypes.ERC721A}/:address`,
            element: <ContractERC721ADemoPage />,
          },
          {
            path: `${ContractTypes.ERC20}/:address`,
            element: <ContractERC20DemoPage />,
          },
          {
            path: `${ContractTypes.ERC1155}/:address`,
            element: <ContractERC1155DemoPage />,
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
