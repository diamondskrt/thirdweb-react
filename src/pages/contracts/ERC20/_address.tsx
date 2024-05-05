import {
  Web3Button,
  useAddress,
  useContract,
  useContractMetadata,
  useTokenBalance,
  useTokenSupply,
} from '@thirdweb-dev/react';
import { Loader2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import { useGetContractAddresses } from '@/api/queries';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { ContractTypes } from '@/models';

export function ContractERC20Page() {
  const { address: contractAddress } = useParams();
  const { contract } = useContract(contractAddress);
  const address = useAddress();

  const [
    {
      data: ERC721ContractAddress,
      isLoading: isERC721Loading,
      isError: isERC721Error,
    },
    {
      data: ERC721AContractAddress,
      isLoading: isERC721ALoading,
      isError: isERC721AError,
    },
  ] = useGetContractAddresses([ContractTypes.ERC721, ContractTypes.ERC721A]);

  const {
    data: contractMetadata,
    isLoading: isContractLoading,
    error: isContractError,
  } = useContractMetadata(contract);

  const {
    data: tokenSupply,
    isLoading: isSupplyLoading,
    error: isSupplyError,
  } = useTokenSupply(contract);

  const {
    data: tokenBalance,
    isLoading: isBalanceLoading,
    error: isBalanceError,
  } = useTokenBalance(contract, address);

  const isLoading =
    isERC721Loading ||
    isERC721ALoading ||
    isContractLoading ||
    isSupplyLoading ||
    isBalanceLoading;

  const isError =
    isERC721Error ||
    isERC721AError ||
    isContractError ||
    isSupplyError ||
    isBalanceError;

  const breadcrumbs = [
    {
      title: 'Contracts',
      link: '/',
    },
    {
      title: ContractTypes.ERC20,
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
                    <h5>Token Stats</h5>
                    <p>
                      Total supply: {tokenSupply?.displayValue}{' '}
                      {tokenSupply?.symbol}
                    </p>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <h5>Token Balance</h5>
                    <p>
                      Balance: {tokenBalance?.displayValue}{' '}
                      {tokenBalance?.symbol}
                    </p>
                  </CardHeader>
                  {contractAddress && (
                    <CardFooter>
                      <Web3Button
                        contractAddress={contractAddress}
                        action={(contract) => contract.erc20.burn(10)}
                        className="thirdweb-btn xs-w-full"
                      >
                        Burn 10 tokens
                      </Web3Button>
                    </CardFooter>
                  )}
                </Card>
                <Card>
                  <CardHeader>
                    <h5>Earn Tokens</h5>
                    <p>Earn more tokens by staking an ERC721 NFT.</p>
                  </CardHeader>
                  <CardFooter className="flex-col sm:flex-row items-start gap-4">
                    <Link
                      to={`/contracts/ERC721/${ERC721ContractAddress}`}
                      className="w-full"
                    >
                      <Button className="w-full sm:w-auto">Stake ERC721</Button>
                    </Link>
                    <Link
                      to={`/contracts/ERC721A/${ERC721AContractAddress}`}
                      className="w-full"
                    >
                      <Button className="w-full sm:w-auto">Claim ERC721</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
