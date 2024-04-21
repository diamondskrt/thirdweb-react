import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface NFT {
  image: string;
  title: string;
}

interface NFTDemoCardProps {
  nft: NFT;
  showStakeBtn?: boolean;
}

export function NFTDemoCard({ nft, showStakeBtn }: NFTDemoCardProps) {
  return (
    <Card>
      <img
        src={nft.image}
        alt={nft.title}
        style={{ width: '100%', height: 300, objectFit: 'cover' }}
      />
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4">
        <h5>{nft.title}</h5>
        {showStakeBtn && <Button disabled>Stake</Button>}
      </div>
    </Card>
  );
}
