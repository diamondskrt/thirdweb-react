import { useContract, useContractMetadata } from '@thirdweb-dev/react';
import { ERC721Staking } from '@/constants/contracts';

export function Home() {
  const { contract } = useContract(ERC721Staking, 'token');
  const { data, isLoading, error } = useContractMetadata(contract);

  return (
    <div className="py-5 md:py-10 px-4">
      <h1 className="text-gradient">My Contracts</h1>
    </div>
  );
}
