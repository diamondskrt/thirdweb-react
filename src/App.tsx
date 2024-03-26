import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
} from '@thirdweb-dev/react';
import { RouterProvider } from 'react-router-dom';

import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/providers/auth-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { router } from '@/router';

const activeChain = 'mumbai';
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="thirdweb-ui-theme">
      <AuthProvider>
        <ThirdwebProvider
          supportedWallets={[
            metamaskWallet({
              recommended: true,
            }),
            coinbaseWallet(),
            walletConnect(),
          ]}
          activeChain={activeChain}
          clientId={clientId}
        >
          <RouterProvider router={router} />
          <Toaster />
        </ThirdwebProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
