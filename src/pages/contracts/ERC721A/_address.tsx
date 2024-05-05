import {
  Web3Button,
  useAddress,
  useClaimedNFTSupply,
  useContract,
  useContractMetadata,
  useOwnedNFTs,
  useTotalCount,
} from '@thirdweb-dev/react';
import { Loader2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { StakeNFTCard } from '@/components/shared/stake-nft-card';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { ContractTypes } from '@/models';

export function ContractERC721APage() {
  const { address: contractAddress } = useParams();
  const { contract } = useContract(contractAddress, 'signature-drop');
  const address = useAddress();

  const {
    data: contractMetadata,
    isLoading: isContractLoading,
    error: isContractError,
  } = useContractMetadata(contract);

  const {
    data: totalSupply,
    isLoading: isSupplyLoading,
    error: isSupplyError,
  } = useTotalCount(contract);

  const {
    data: totalClaimedSupply,
    isLoading: isSupplyClaimedLoading,
    error: isSupplyClaimedError,
  } = useClaimedNFTSupply(contract);

  const {
    data: ownedNFTs,
    isLoading: isNFTLoading,
    error: isNFTError,
  } = useOwnedNFTs(contract, address);

  const isError =
    isContractError || isSupplyError || isSupplyClaimedError || isNFTError;

  const isLoading =
    (isContractLoading ||
      isSupplyLoading ||
      isSupplyClaimedLoading ||
      isNFTLoading) &&
    !isError;

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
                    src={
                      contractMetadata?.image || '/assets/images/metaverse.jpg'
                    }
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
                  {contractAddress && (
                    <CardFooter>
                      <Web3Button
                        contractAddress={contractAddress}
                        action={(contract) => contract.erc721.claim(1)}
                        className="thirdweb-btn xs-w-full"
                      >
                        Claim NFT
                      </Web3Button>
                    </CardFooter>
                  )}
                </Card>
                <Card>
                  <CardHeader>
                    <h5>Contract Stats</h5>
                    <p>Total Supply: {totalSupply?.toNumber() || 'No data'}</p>
                    <p>
                      Total Claimed:{' '}
                      {totalClaimedSupply?.toNumber() || 'No data'}
                    </p>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <h5>Your NFT</h5>
                    <p>Total Owned: {ownedNFTs?.length || 'No data'}</p>
                  </CardHeader>
                </Card>
              </div>
            </div>

            <div className="contract-page__nfts">
              <h2 className="text-gradient">My NFT's:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {ownedNFTs?.length ? (
                  ownedNFTs.map((nft) => (
                    <StakeNFTCard
                      key={nft.metadata.id}
                      nft={nft}
                      hideStakeBtn
                    />
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
