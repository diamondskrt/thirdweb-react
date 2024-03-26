import type { NFT } from '@thirdweb-dev/react';
import { useAddress, useContract } from '@thirdweb-dev/react';

import { NFTCard } from '@/components/shared/nft-card';
import { getContractAddress } from '@/lib/helpers';

type StakeNFTCardProps = {
  nft: NFT;
  hideStakeBtn?: boolean;
};

export function StakeNFTCard({ nft, hideStakeBtn }: StakeNFTCardProps) {
  const ERC721AContractAddress = getContractAddress('ERC721A');
  const ERC721ContractAddress = getContractAddress('ERC721');

  const address = useAddress();

  const { contract: ERC721AContract } = useContract(
    ERC721AContractAddress,
    'signature-drop'
  );
  const { contract: ERC721Contract } = useContract(ERC721ContractAddress);

  const stakeNFT = async () => {
    if (!(address && ERC721ContractAddress)) return;

    const isApproved = await ERC721AContract?.isApproved(
      address,
      ERC721ContractAddress
    );

    if (!isApproved) {
      await ERC721AContract?.setApprovalForAll(ERC721ContractAddress, true);
    }

    const nftIds = [[parseInt(nft.metadata.id)]];

    await ERC721Contract?.call('stake', nftIds);
  };

  return (
    <NFTCard
      nft={nft}
      contractAddress={ERC721AContractAddress!}
      btnText="Stake"
      hideBtn={hideStakeBtn}
      onAction={stakeNFT}
    />
  );
}
