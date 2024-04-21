import { useMutation, useQueries, useQuery } from '@tanstack/react-query';

import type { ContractPayload, User } from '@/models';

import { createUserAccount, signInAccount, signOutAccount } from './auth';
import {
  addContract,
  getContractAddress,
  getContractByAddress,
  getContracts,
} from './contracts';
import { QUERY_KEYS } from './model';

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount,
  });
};

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: User) => createUserAccount(user),
  });
};

export const useGetContractByAddress = (address?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CONTRACT_BY_ADDRESS],
    queryFn: () => getContractByAddress(address),
  });
};

export const useGetContracts = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CONTRACTS],
    queryFn: () => getContracts(userId),
  });
};

export const useGetContractAddresses = (contractTypes: string[]) => {
  return useQueries({
    queries: contractTypes.map((type) => ({
      queryKey: [QUERY_KEYS.GET_CONTRACT_ADDRESS, type],
      queryFn: () => getContractAddress(type),
    })),
  });
};

export const useAddContract = () => {
  return useMutation({
    mutationFn: (contract: ContractPayload) => addContract(contract),
  });
};
