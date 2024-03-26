import { contracts } from '@/constants';

export const getContractAddress = (contractType: string) => {
  const foundedContract = contracts.find(({ type }) => type === contractType);

  return foundedContract?.address;
};
