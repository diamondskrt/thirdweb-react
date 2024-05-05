import type { SmartContract } from '@thirdweb-dev/react';
import { useContract, useNFT } from '@thirdweb-dev/react';
import type { BaseContract } from 'ethers';

import { useGetContractAddresses } from '@/api/queries';
import { NFTCard } from '@/components/shared/nft-card';
import { NFTCardSkeleton } from '@/components/shared/nft-card-skeleton';
import { toast } from '@/components/ui/use-toast';
import { ContractTypes } from '@/models';

type StakedNFTCardProps = {
  tokenId: number;
};

export function StakedNFTCard({ tokenId }: StakedNFTCardProps) {
  const [
    {
      data: ERC721ContractAddress,
      isLoading: isERC721Loading,
      isError: isERC721Error,
    },
    {
      data: ERC721AContractAddress,
      isLoading: isERC721ALoading,
      isError: isERC721AError,
    },
  ] = useGetContractAddresses([ContractTypes.ERC721, ContractTypes.ERC721A]);

  const { contract: ERC721AContract } = useContract(ERC721AContractAddress);

  const {
    data: nft,
    isLoading: isNFTLoading,
    error: isNFTError,
  } = useNFT(ERC721AContract, tokenId);

  const isError = isERC721Error || isERC721AError || isNFTError;

  const isLoading =
    (isERC721Loading || isERC721ALoading || isNFTLoading) && !isError;

  const unStakeNft = async (contract: SmartContract<BaseContract>) => {
    try {
      await contract?.call('withdraw', [[tokenId]]);
    } catch (error) {
      toast({
        title: 'Unstake failed. Please try again.',
        description: (error as Error).message,
      });
    }
  };

  return isLoading ? (
    <NFTCardSkeleton />
  ) : isError || !nft ? (
    <p>Something went wrong...</p>
  ) : (
    <NFTCard
      nft={nft}
      contractAddress={ERC721ContractAddress}
      btnText="Unstake"
      onAction={unStakeNft}
    />
  );
}
