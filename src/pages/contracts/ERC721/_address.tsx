import { useCallback, useEffect, useState } from 'react';

import {
  Web3Button,
  useAddress,
  useContract,
  useContractMetadata,
  useContractRead,
  useOwnedNFTs,
  useTokenBalance,
} from '@thirdweb-dev/react';
import type { BigNumber } from 'ethers';
import { ethers } from 'ethers';
import { Loader2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { StakeNFTCard } from '@/components/shared/stake-nft-card';
import { StakedNFTCard } from '@/components/shared/staked-nft-card';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { getContractAddress } from '@/lib/helpers';

export function ContractERC721Page() {
  const [isClaimableRewards, setIsClaimableRewards] = useState<BigNumber>();
  const { address: contractAddress } = useParams();

  const ERC20ContractAddress = getContractAddress('ERC20');
  const ERC721АContractAddress = getContractAddress('ERC721A');

  const { contract } = useContract(contractAddress);
  const { contract: ERC20Contract } = useContract(ERC20ContractAddress);
  const { contract: ERC721АContract } = useContract(
    ERC721АContractAddress,
    'signature-drop'
  );

  const address = useAddress();

  const getClaimableRewards = useCallback(async () => {
    try {
      const isClaimableRewards = await contract?.call('getStakeInfo', [
        address,
      ]);

      if (!isClaimableRewards) return;

      setIsClaimableRewards(isClaimableRewards[1]);
    } catch (error) {
      toast({
        title: 'Get Stake Info failed. Please try again.',
        description: (error as Error).message,
      });
    }
  }, [address, contract]);

  useEffect(() => {
    getClaimableRewards();
  }, [getClaimableRewards]);

  const {
    data: contractMetadata,
    isLoading: isContractLoading,
    error: isContractError,
  } = useContractMetadata(contract);

  const {
    data: tokenBalance,
    isLoading: isBalanceLoading,
    error: isBalanceError,
  } = useTokenBalance(ERC20Contract, address);

  const {
    data: ownedNFTs,
    isLoading: isNFTLoading,
    error: isNFTError,
  } = useOwnedNFTs(ERC721АContract, address);

  const {
    data: stakedERC721ATokens,
    isLoading: isTokensLoading,
    error: isTokensError,
  } = useContractRead(contract, 'getStakeInfo', [address]);

  const isLoading =
    isContractLoading || isBalanceLoading || isNFTLoading || isTokensLoading;

  const isError =
    isContractError || isBalanceError || isNFTError || isTokensError;

  const breadcrumbs = [
    {
      title: 'Contracts',
      link: '/',
    },
    {
      title: 'ERC721',
    },
  ];

  const onClaimRewardsSuccess = () => {
    toast({
      title: 'Claim reward request was successful!',
    });
    setIsClaimableRewards(ethers.constants.Zero);
  };

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
                    src={contractMetadata?.image || '/assets/metaverse.jpg'}
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
                    <p>
                      Balance: {tokenBalance?.displayValue}{' '}
                      {tokenBalance?.symbol}
                    </p>
                    {isClaimableRewards && (
                      <p>
                        Reward Balance:{' '}
                        {ethers.utils.formatEther(isClaimableRewards)}
                      </p>
                    )}
                  </CardHeader>
                  {contractAddress && (
                    <CardFooter>
                      <Web3Button
                        contractAddress={contractAddress}
                        action={(contract) => contract.call('claimRewards')}
                        onSuccess={() => onClaimRewardsSuccess()}
                        isDisabled={
                          !isClaimableRewards || isClaimableRewards.isZero()
                        }
                        className="thirdweb-btn xs-w-full"
                      >
                        Claim Rewards
                      </Web3Button>
                    </CardFooter>
                  )}
                </Card>
              </div>
            </div>

            <div className="contract-page__nfts">
              <h2 className="text-gradient">Unstaked NFT's:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {ownedNFTs?.length ? (
                  ownedNFTs.map((nft) => (
                    <StakeNFTCard key={nft.metadata.id} nft={nft} />
                  ))
                ) : (
                  <p>No data</p>
                )}
              </div>
            </div>

            <div className="contract-page__nfts">
              <h2 className="text-gradient">Staked NFT's:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {stakedERC721ATokens.length ? (
                  stakedERC721ATokens[0].map((token: BigNumber) => {
                    const tokenId = token.toNumber();
                    return <StakedNFTCard key={tokenId} tokenId={tokenId} />;
                  })
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
