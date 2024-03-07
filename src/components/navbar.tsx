import { ConnectWalletBtn } from './connect-wallet-btn';
import { Icon } from './icon';
import { ThemeSwitcher } from './theme-switcher';

export function Navbar() {
  return (
    <header className="flex items-center justify-between shadow-md p-4">
      <Icon name="logo" className="w-8 h-8 black dark:white" />
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <ConnectWalletBtn />
      </div>
    </header>
  );
}