import { NFT } from '@thirdweb-dev/sdk';

type NFTCardProps = {
  nft: NFT;
};

export function NFTCard({ nft }: NFTCardProps) {
  return (
    <div>
      <div>Card</div>
    </div>
  );
}
