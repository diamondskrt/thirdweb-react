import { useEffect } from 'react';

import { useConnectionStatus } from '@thirdweb-dev/react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import { isDemoUser } from '@/lib/helpers';
import type { DBUser } from '@/models';

export function ContractLayout() {
  const [user] = useLocalStorage<DBUser | null>('user', null);
  const navigate = useNavigate();
  const connectionStatus = useConnectionStatus();
  const isWalletLoading =
    connectionStatus === 'unknown' || connectionStatus === 'connecting';
  const isWalletConnected = connectionStatus === 'connected';

  useEffect(() => {
    if (isWalletLoading || isWalletConnected || isDemoUser(user)) return;

    navigate('/');
  }, [isWalletLoading, isWalletConnected, user, navigate]);

  return isWalletConnected || isDemoUser(user) ? <Outlet /> : null;
}
