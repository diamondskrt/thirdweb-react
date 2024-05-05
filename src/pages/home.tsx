import { useState } from 'react';

import { useConnectionStatus } from '@thirdweb-dev/react';
import { Loader2, Plus, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import { useDeleteContract, useGetUserContracts } from '@/api/queries';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';
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

  const [deleteContractId, setDeleteContractId] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const { mutateAsync: deleteContract, isLoading: isDeleteContractLoading } =
    useDeleteContract();

  const { data: contracts, isLoading: isContractsLoading } =
    useGetUserContracts(user?.accountId);

  const isLoading = isContractsLoading;

  const onConfirmDialogOpen = (contractId: string) => {
    setDeleteContractId(contractId);
    setConfirmDialogOpen(true);
  };

  const onDeleteContract = async () => {
    if (!deleteContractId) return;

    try {
      await deleteContract(deleteContractId);
      setConfirmDialogOpen(false);
    } catch (error) {
      toast({
        title: 'Delete contract failed. Please try again.',
        description: (error as Error).message,
      });
    }
  };

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
              <>
                {contracts.map((contract) => (
                  <ContractCard
                    key={contract.address}
                    isDemoUser={isDemoUser(user)}
                    contract={contract}
                    className={cn({
                      disabled: isWalletNotConnected && !isDemoUser(user),
                    })}
                    onDeleteContract={onConfirmDialogOpen}
                  />
                ))}
                <ConfirmDialog
                  open={confirmDialogOpen}
                  setOpen={setConfirmDialogOpen}
                  title="Confirm the action"
                  description="Are you sure you want to delete this contract?"
                  loading={isDeleteContractLoading}
                  onCancel={() => setConfirmDialogOpen(false)}
                  onOk={onDeleteContract}
                />
              </>
            ) : (
              <div className="grid gap-4">
                <div>You don't have smart contracts yet</div>
                <Link to="/add-contract">
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
