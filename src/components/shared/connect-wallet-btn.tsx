import { ConnectWallet } from '@thirdweb-dev/react';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/theme-provider';

export function ConnectWalletBtn() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <ConnectWallet
      theme={isLight ? 'light' : 'dark'}
      btnTitle="Connect Wallet"
      className="thirdweb-btn"
      detailsBtn={() => {
        return <Button>Profile</Button>;
      }}
    />
  );
}
