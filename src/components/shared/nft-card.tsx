import type { NFT, SmartContract } from '@thirdweb-dev/react';
import { ThirdwebNftMedia, Web3Button } from '@thirdweb-dev/react';
import type { BaseContract } from 'ethers';

import { Card } from '@/components/ui/card';

type NFTCardProps = {
  nft: NFT;
  contractAddress: string;
  hideBtn?: boolean;
  btnText?: string;
  onAction?: (contract: SmartContract<BaseContract>) => void;
};

export function NFTCard({
  nft,
  contractAddress,
  hideBtn,
  btnText,
  onAction,
}: NFTCardProps) {
  const isBtnVisible = !hideBtn && contractAddress && btnText && onAction;

  return (
    <Card key={nft.metadata.id}>
      <ThirdwebNftMedia
        metadata={nft.metadata}
        style={{ width: '100%', objectFit: 'cover' }}
      />
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4">
        <h5>{nft.metadata.name}</h5>
        {isBtnVisible && (
          <Web3Button
            contractAddress={contractAddress}
            action={(contract) => onAction(contract)}
            className="thirdweb-btn xs-w-full"
          >
            {btnText}
          </Web3Button>
        )}
      </div>
    </Card>
  );
}
