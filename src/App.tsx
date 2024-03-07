import { ThirdwebProvider, metamaskWallet, walletConnect } from '@thirdweb-dev/react';
import { ThemeProvider } from '@/providers/theme-provider';
import { Navbar } from '@/components/navbar';

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
        activeChain={activeChain} clientId={clientId}
      >
        <Navbar />
        <main className="flex items-center gap-2">
          Main
        </main>
      </ThirdwebProvider>
    </ThemeProvider>
  );
}

export default App;
