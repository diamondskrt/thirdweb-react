import { PolygonAmoyTestnet } from '@thirdweb-dev/chains';
import {
  ThirdwebProvider,
  coinbaseWallet,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react';
import { RouterProvider } from 'react-router-dom';

import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/providers/theme-provider';
import { router } from '@/router';

const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="thirdweb-ui-theme">
      <ThirdwebProvider
        supportedWallets={[
          metamaskWallet({
            recommended: true,
          }),
          coinbaseWallet(),
          walletConnect(),
        ]}
        activeChain={PolygonAmoyTestnet}
        clientId={clientId}
      >
        <RouterProvider router={router} />
        <Toaster />
      </ThirdwebProvider>
    </ThemeProvider>
  );
}
