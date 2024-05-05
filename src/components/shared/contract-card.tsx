import { useContract, useContractMetadata } from '@thirdweb-dev/react';
import type { Models } from 'appwrite';
import { Link } from 'react-router-dom';

import { ContractCardSkeleton } from '@/components/shared/contract-card-skeleton';
import { ContractErrorCard } from '@/components/shared/contract-error-card';
import { Card, CardContent, CardDescription } from '@/components/ui/card';

export interface ContractCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isDemoUser: boolean;
  contract: Models.Document;
  onDeleteContract: (contractId: string) => void;
}

export function ContractCard({
  isDemoUser,
  contract,
  className,
  onDeleteContract,
}: ContractCardProps) {
  const {
    contract: twContract,
    isLoading: isContractLoading,
    isError: isContractError,
  } = useContract(contract.address);

  const {
    data: contractMetadata,
    isLoading: isMetadataLoading,
    isError: isMetadataError,
  } = useContractMetadata(twContract);

  const getPathName = () => {
    return isDemoUser
      ? `/demo-contracts/${contract.type}/${contract.$id}`
      : `/contracts/${contract.type}/${contract.address}`;
  };

  const isError = isMetadataError || isContractError;
  const isLoading = (isMetadataLoading || isContractLoading) && !isError;

  return isLoading ? (
    <ContractCardSkeleton />
  ) : isError || !contractMetadata ? (
    <ContractErrorCard
      contract={contract}
      onDeleteContract={onDeleteContract}
    />
  ) : (
    <Card className={className}>
      <Link
        to={{
          pathname: getPathName(),
        }}
      >
        <div className="relative h-[300px]">
          <img
            src={contractMetadata.image || '/assets/metaverse.jpg'}
            alt={contractMetadata.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent>
          <div className="pt-4">
            <h4>{contractMetadata.name}</h4>
            <CardDescription className="truncate mt-2">
              {contractMetadata.description}
            </CardDescription>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
