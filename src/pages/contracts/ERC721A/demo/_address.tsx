import { Loader2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { useGetContractById } from '@/api/queries';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { NFTDemoCard } from '@/components/shared/nft-demo-card';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import type { DemoNFT } from '@/models';
import { ContractTypes } from '@/models';

export function ContractERC721ADemoPage() {
  const { id: contractId } = useParams();

  const {
    data: contractMetadata,
    isLoading: isContractLoading,
    isError: isContractError,
  } = useGetContractById(contractId);

  const breadcrumbs = [
    {
      title: 'Contracts',
      link: '/',
    },
    {
      title: ContractTypes.ERC721A,
    },
  ];

  return (
    <>
      {isContractError ? (
        <div className="flex flex-center h-dvh">
          <h5>Load contract failed.</h5>
          <Link to="/" className="text-primary">
            Go home
          </Link>
        </div>
      ) : isContractLoading ? (
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
                    src="/assets/images/erc721A.jpg"
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
                    <h5>Claim ERC721A</h5>
                    <p>Claim an ERC721A NFT for FREE!</p>
                  </CardHeader>
                  <CardFooter>
                    <Button disabled>Claim NFT</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <h5>Contract Stats</h5>
                    <p>Total Supply: 1</p>
                    <p>Total Claimed: 1</p>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <h5>Your NFT</h5>
                    <p>
                      Total Owned: {contractMetadata?.nfts.length || 'No data'}
                    </p>
                  </CardHeader>
                </Card>
              </div>
            </div>

            <div className="contract-page__nfts">
              <h2 className="text-gradient">My NFT's:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {contractMetadata?.nfts?.length ? (
                  contractMetadata?.nfts.map((nft: DemoNFT) => (
                    <NFTDemoCard key={nft.$id} nft={nft} />
                  ))
                ) : (
                  <p>No data</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
