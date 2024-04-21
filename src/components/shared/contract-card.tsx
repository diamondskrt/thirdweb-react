import { useContract, useContractMetadata } from '@thirdweb-dev/react';
import type { Models } from 'appwrite';
import { Link } from 'react-router-dom';

import { ContractCardSkeleton } from '@/components/shared/contract-card-skeleton';
import { Card, CardContent, CardDescription } from '@/components/ui/card';

export interface ContractCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isDemoUser: boolean;
  contract: Models.Document;
}

export function ContractCard({
  isDemoUser,
  contract,
  className,
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
      ? `/demo-contracts/${contract.type}/${contract.address}`
      : `/contracts/${contract.type}/${contract.address}`;
  };

  const isLoading = isMetadataLoading || isContractLoading;
  const isError = isMetadataError || isContractError;

  return isLoading ? (
    <ContractCardSkeleton />
  ) : isError ? (
    <p>Something went wrong...</p>
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
