import {
  ThirdwebProvider,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react';
import { Router } from '@/router';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/providers/theme-provider';
import { QueryProvider } from '@/providers/query-provider';
import { AuthProvider } from './providers/auth-provider';

const activeChain = 'mumbai';
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="thirdweb-ui-theme">
      <QueryProvider>
        <AuthProvider>
          <ThirdwebProvider
            supportedWallets={[
              metamaskWallet({
                recommended: true,
              }),
              walletConnect(),
            ]}
            activeChain={activeChain}
            clientId={clientId}
          >
            <Router />
            <Toaster />
          </ThirdwebProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
