import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import type { Models } from 'appwrite';

import type { Contract, ContractPayload, User } from '@/models';

import { createUserAccount, signInAccount, signOutAccount } from './auth';
import {
  addContract,
  deleteContract,
  getContractAddress,
  getContractById,
  getNFTs,
  getUserContracts,
  updateContract,
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

export const useGetContractById = (id?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CONTRACT_BY_ID, id],
    queryFn: () => getContractById(id),
    enabled: Boolean(id),
  });
};

export const useGetUserContracts = (userId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CONTRACTS, userId],
    queryFn: () => getUserContracts(userId),
    enabled: Boolean(userId),
  });
};

export const useGetNFTs = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CONTRACTS],
    queryFn: () => getNFTs(),
  });
};

export const useGetContractAddresses = (contractTypes: string[]) => {
  return useQueries({
    queries: contractTypes.map((type) => ({
      queryKey: [QUERY_KEYS.GET_CONTRACT_ADDRESS, type],
      queryFn: () => getContractAddress(type),
      enabled: Boolean(type),
    })),
  });
};

export const useAddContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contract: ContractPayload) => addContract(contract),
    onSuccess: (contract: Models.Document) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CONTRACT_BY_ID, contract.$id],
      });
    },
  });
};

export const useUpdateContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contract: Contract) => updateContract(contract),
    onSuccess: (contract: Models.Document) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CONTRACT_BY_ID, contract.$id],
      });
    },
  });
};

export const useDeleteContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contractId: string) => deleteContract(contractId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CONTRACTS],
      });
    },
  });
};
