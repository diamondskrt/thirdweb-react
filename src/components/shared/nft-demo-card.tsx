import type { Models } from 'appwrite';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { DemoNFT } from '@/models';

interface NFTDemoCardProps {
  nft: DemoNFT | Models.Document;
  showStakeBtn?: boolean;
}

export function NFTDemoCard({ nft, showStakeBtn }: NFTDemoCardProps) {
  const nftImagesMap: Record<string, string> = {
    '6613d00fd1bd058e126b': '/assets/images/nft-01.jpg',
    '6613cfba7316333db778': '/assets/images/pass-01.jpg',
    '6613cff2ae28a2064635': '/assets/images/pass-02.jpg',
  };

  const getNftImage = (nftId: string) => {
    return nftImagesMap[nftId];
  };

  return (
    <Card>
      <img
        src={getNftImage(nft.$id)}
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
