import { useEffect, useState } from 'react';

import { useConnectionStatus } from '@thirdweb-dev/react';
import type { Models } from 'appwrite';
import { Loader2, Plus, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import { getUserContracts } from '@/api/contracts';
import { ContractCard } from '@/components/shared/contract-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';
import { isDemoUser } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import type { DBUser } from '@/models';

export function HomePage() {
  const [user] = useLocalStorage<DBUser | null>('user', null);

  const connectionStatus = useConnectionStatus();
  const isWalletNotConnected = connectionStatus === 'disconnected';

  const [contracts, setContracts] = useState<Models.Document[]>([]);
  const [isContractsPending, setIsContractsPending] = useState(true);

  const onGetContracts = async (userId: string) => {
    try {
      const currentContracts = await getUserContracts(userId);
      setContracts(currentContracts);
    } catch (error) {
      toast({
        title: 'Get contracts failed. Please try again.',
        description: (error as Error).message,
      });
    } finally {
      setIsContractsPending(false);
    }
  };

  const isLoading = isContractsPending;

  useEffect(() => {
    if (!user?.accountId) return;

    onGetContracts(user.accountId);
  }, [user]);

  return (
    <div className="home-page page-paddings">
      <div className="contracts">
        <div className="container">
          <h1 className="text-gradient mb-4">My Contracts</h1>
          {isWalletNotConnected && !isDemoUser(user) && (
            <Alert className="mb-4">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                <p>
                  Connect your wallet to be able to work with smart contracts
                </p>
              </AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
              </div>
            ) : contracts?.length ? (
              contracts.map((contract) => (
                <ContractCard
                  key={contract.address}
                  isDemoUser={isDemoUser(user)}
                  contract={contract}
                  className={cn({
                    disabled: isWalletNotConnected && !isDemoUser(user),
                  })}
                />
              ))
            ) : (
              <div className="grid gap-4">
                <div>You don't have smart contracts yet</div>
                <Link to="add-contract">
                  <div className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" />
                    <span>Add Contract</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
