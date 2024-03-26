import { useConnectionStatus } from '@thirdweb-dev/react';
import { Terminal } from 'lucide-react';

import { ContractCard } from '@/components/shared/contract-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { contracts } from '@/constants';
import { cn } from '@/lib/utils';

export function HomePage() {
  const connectionStatus = useConnectionStatus();
  const isWalletNotConnected = connectionStatus === 'disconnected';

  return (
    <div className="home-page page-paddings">
      <div className="contracts">
        <div className="container">
          <h1 className="text-gradient mb-4">My Contracts</h1>
          {isWalletNotConnected && (
            <Alert className="mb-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                Connect your wallet to be able to view smart contracts.
              </AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {contracts.map((contract) => (
              <ContractCard
                key={contract.address}
                contract={contract}
                className={cn({ disabled: isWalletNotConnected })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
