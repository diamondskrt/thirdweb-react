import { useEffect } from 'react';

import { useConnectionStatus } from '@thirdweb-dev/react';
import { Outlet, useNavigate } from 'react-router-dom';

export function ContractLayout() {
  const navigate = useNavigate();
  const connectionStatus = useConnectionStatus();
  const isWalletNotConnected = connectionStatus === 'disconnected';

  useEffect(() => {
    if (isWalletNotConnected) {
      navigate('/');
    }
  }, [isWalletNotConnected, navigate]);

  return (
    <>
      <Outlet />
    </>
  );
}
