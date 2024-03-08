import {
  ThirdwebProvider,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react';
import { ThemeProvider } from '@/providers/theme-provider';
import { Router } from '@/router';

const activeChain = 'mumbai';
const clientId = import.meta.env.VITE_THIRDWEB_CLIENT_ID;

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="thirdweb-ui-theme">
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
      </ThirdwebProvider>
    </ThemeProvider>
  );
}

export default App;
