import { Loader2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import { useGetContractById, useGetUserContracts } from '@/api/queries';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import type { DBUser } from '@/models';
import { ContractTypes } from '@/models';

export function ContractERC20DemoPage() {
  const [user] = useLocalStorage<DBUser | null>('user', null);
  const { id: contractId } = useParams();

  const {
    data: contractMetadata,
    isLoading: isContractLoading,
    isError: isContractError,
  } = useGetContractById(contractId);

  const {
    data: contracts,
    isLoading: isContractsLoading,
    isError: isContractsError,
  } = useGetUserContracts(user?.accountId);

  const isLoading = isContractLoading || isContractsLoading;
  const isError = isContractError || isContractsError;

  const getContractsId = (contractType: ContractTypes) => {
    const foundContract = contracts?.find(({ type }) => type === contractType);
    return foundContract?.$id;
  };

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
                    src="/assets/images/erc20.jpg"
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
                    <p>Total supply: 1000000.0 TWTOKEN</p>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <h5>Token Balance</h5>
                    <p>Balance: 900000.0 TWTOKEN</p>
                  </CardHeader>
                  <CardFooter>
                    <Button disabled>Burn 10 tokens</Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <h5>Earn Tokens</h5>
                    <p>Earn more tokens by staking an ERC721 NFT.</p>
                  </CardHeader>
                  <CardFooter className="flex-col sm:flex-row items-start gap-4">
                    {getContractsId(ContractTypes.ERC721) ? (
                      <Link
                        to={`/demo-contracts/ERC721/${getContractsId(ContractTypes.ERC721)}`}
                        className="w-full"
                      >
                        <Button className="w-full sm:w-auto">
                          Stake ERC721
                        </Button>
                      </Link>
                    ) : (
                      <Button disabled className="w-full sm:w-auto">
                        Stake ERC721
                      </Button>
                    )}
                    {getContractsId(ContractTypes.ERC721A) ? (
                      <Link
                        to={`/demo-contracts/ERC721A/${getContractsId(ContractTypes.ERC721A)}`}
                        className="w-full"
                      >
                        <Button className="w-full sm:w-auto">
                          Claim ERC721
                        </Button>
                      </Link>
                    ) : (
                      <Button disabled className="w-full sm:w-auto">
                        Claim ERC721
                      </Button>
                    )}
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
