import type { NFT, SmartContract } from '@thirdweb-dev/react';
import { useAddress, useContract } from '@thirdweb-dev/react';
import type { BaseContract } from 'ethers';

import { useGetContractAddresses } from '@/api/queries';
import { NFTCard } from '@/components/shared/nft-card';
import { NFTCardSkeleton } from '@/components/shared/nft-card-skeleton';
import { ContractTypes } from '@/models';

type StakeNFTCardProps = {
  nft: NFT;
  hideStakeBtn?: boolean;
};

export function StakeNFTCard({ nft, hideStakeBtn }: StakeNFTCardProps) {
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

  const isLoading = isERC721Loading || isERC721ALoading;
  const isError = isERC721Error || isERC721AError;

  const address = useAddress();

  const { contract: ERC721AContract } = useContract(
    ERC721AContractAddress,
    'signature-drop'
  );

  const stakeNFT = async (contract: SmartContract<BaseContract>) => {
    if (!(address && ERC721ContractAddress)) return;

    const isApproved = await ERC721AContract?.isApproved(
      address,
      ERC721ContractAddress!
    );

    if (!isApproved) {
      await ERC721AContract?.setApprovalForAll(ERC721ContractAddress, true);
    }

    const nftIds = [[parseInt(nft.metadata.id)]];

    await contract?.call('stake', nftIds);
  };

  return isLoading ? (
    <NFTCardSkeleton />
  ) : isError ? (
    <p>Something went wrong...</p>
  ) : (
    <NFTCard
      nft={nft}
      contractAddress={ERC721ContractAddress}
      btnText="Stake"
      hideBtn={hideStakeBtn}
      onAction={stakeNFT}
    />
  );
}
