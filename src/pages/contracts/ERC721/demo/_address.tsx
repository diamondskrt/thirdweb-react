import { Loader2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { useGetContractById, useGetNFTs } from '@/api/queries';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { NFTDemoCard } from '@/components/shared/nft-demo-card';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { ContractTypes } from '@/models';

export function ContractERC721DemoPage() {
  const { id: contractId } = useParams();

  const {
    data: contractMetadata,
    isLoading: isContractLoading,
    isError: isContractError,
  } = useGetContractById(contractId);

  const {
    data: NFTs,
    isLoading: isNFTsLoading,
    isError: isNFTsError,
  } = useGetNFTs();

  const isLoading = isContractLoading || isNFTsLoading;
  const isError = isContractError || isNFTsError;

  const breadcrumbs = [
    {
      title: 'Contracts',
      link: '/',
    },
    {
      title: ContractTypes.ERC721,
    },
  ];

  return (
    <>
      {isError ? (
        <div className="flex flex-center h-dvh">
          <h5>Load contract failed.</h5>
          <Link to="/" className="text-primary">
            Go home
          </Link>
        </div>
      ) : isLoading ? (
        <div className="flex flex-center h-dvh">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
        </div>
      ) : (
        <div className="contract-page page-paddings">
          <div className="grid-container">
            <Breadcrumbs items={breadcrumbs} />

            <div className="contract-page__info">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 h-[450px]">
                  <img
                    src="/assets/images/erc721Staking.jpg"
                    alt={contractMetadata?.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="info flex-1">
                  <h2 className="text-gradient">{contractMetadata?.name}</h2>
                  <h6>{contractMetadata?.description}</h6>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <Card>
                  <CardHeader>
                    <h5>Rewards</h5>
                    <p>Balance: 900000.0 TWTOKEN</p>
                    <p>Reward Balance: 2.4</p>
                  </CardHeader>
                  <CardFooter>
                    <Button disabled>Claim Rewards</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>

            <div className="contract-page__nfts">
              <h2 className="text-gradient">Unstaked NFT's:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {NFTs?.length ? (
                  NFTs.map((nft) => <NFTDemoCard key={nft.$id} nft={nft} />)
                ) : (
                  <p>No data</p>
                )}
              </div>
            </div>

            <div className="contract-page__nfts">
              <h2 className="text-gradient">Staked NFT's:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <p>No data</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
