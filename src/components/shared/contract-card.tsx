import { useContract, useContractMetadata } from '@thirdweb-dev/react';
import { Link } from 'react-router-dom';

import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Contract } from '@/models';

export interface ContractCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  contract: Contract;
}

export function ContractCard({ contract, className }: ContractCardProps) {
  const { contract: twContract } = useContract(contract.address);
  const { data: contractMetadata } = useContractMetadata(twContract);

  return contractMetadata ? (
    <Card className={className}>
      <Link
        to={{
          pathname: `/contracts/${contract.type}/${contract.address}`,
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
            <CardDescription className="mt-2">
              {contractMetadata.description}
            </CardDescription>
          </div>
        </CardContent>
      </Link>
    </Card>
  ) : (
    <Card>
      <div className="relative h-[300px]">
        <Skeleton
          isRounded={false}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <CardContent>
        <div className="pt-4">
          <Skeleton className="h-4 w-1/2 mt-2" />
          <Skeleton className="h-2 w-full mt-4" />
          <Skeleton className="h-2 w-4/5 mt-2" />
          <Skeleton className="h-2 w-1/2 mt-2" />
        </div>
      </CardContent>
    </Card>
  );
}
