import { useState } from 'react';

import { Link } from 'react-router-dom';
import { useDebounceCallback, useEventListener } from 'usehooks-ts';

import { ConnectWalletBtn } from '@/components/shared/connect-wallet-btn';
import { Icon } from '@/components/shared/icon';
import { Profile } from '@/components/shared/profile';
import { ThemeSwitcher } from '@/components/shared/theme-switcher';
import { cn } from '@/lib/utils';

let lastScrollTop = 0;

export function Navbar() {
  const [isScrolledDown, setIsScrolledDown] = useState(true);

  const onScroll = () => {
    const { scrollTop } = document.scrollingElement!;

    scrollTop > lastScrollTop
      ? setIsScrolledDown(false)
      : setIsScrolledDown(true);

    lastScrollTop = scrollTop;
  };

  useEventListener('scroll', useDebounceCallback(onScroll, 50));

  return (
    <header
      className={cn(
        isScrolledDown ? 'top-0' : '-top-full',
        'fixed left-0 w-dvw bg-background transition-all ease-in-out duration-500 z-20 py-4'
      )}
    >
      <div className="container flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-black dark:text-white"
        >
          <Icon name="logo" className="w-10 h-10" />
          <h4 className="uppercase font-bold">Metaverse</h4>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <ConnectWalletBtn />
          <Profile />
        </div>
      </div>
    </header>
  );
}
