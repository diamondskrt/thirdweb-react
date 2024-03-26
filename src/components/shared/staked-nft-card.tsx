import type { SmartContract } from '@thirdweb-dev/react';
import { useContract, useNFT } from '@thirdweb-dev/react';
import type { BaseContract } from 'ethers';

import { NFTCard } from '@/components/shared/nft-card';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getContractAddress } from '@/lib/helpers';

type StakedNFTCardProps = {
  tokenId: number;
};

export function StakedNFTCard({ tokenId }: StakedNFTCardProps) {
  const ERC721AContractAddress = getContractAddress('ERC721A');

  const { contract: ERC721AContract } = useContract(ERC721AContractAddress);

  const {
    data: nft,
    isLoading: isNFTLoading,
    error: isNFTError,
  } = useNFT(ERC721AContract, tokenId);

  const unStakeNft = (contract: SmartContract<BaseContract>) => {
    contract.call('withdraw', [[tokenId]]);
  };

  return isNFTLoading ? (
    <Card>
      <div className="relative h-[300px]">
        <Skeleton
          isRounded={false}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton
            className="rounded-3xl h-10 w-full sm:w-[66px]"
            isRounded={false}
          />
        </div>
      </CardContent>
    </Card>
  ) : isNFTError || !(nft && ERC721AContractAddress) ? (
    <div>Error</div>
  ) : (
    <>
      <NFTCard
        nft={nft}
        contractAddress={ERC721AContractAddress}
        btnText="Unstake"
        onAction={unStakeNft}
      />
    </>
  );
}
