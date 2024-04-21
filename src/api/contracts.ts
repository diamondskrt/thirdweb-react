import { ID, Query } from 'appwrite';

import type { ContractPayload } from '@/models';

import { appwriteConfig, databases } from './config';

export async function getContracts(userId: string) {
  try {
    const contracts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.contractsCollectionId,
      [Query.equal('creator', [userId])]
    );

    return contracts.documents;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getContractByAddress(address?: string) {
  if (!address) return;

  try {
    const contracts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.contractsCollectionId,
      [Query.equal('address', [address])]
    );

    return contracts.documents[0];
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getContractAddress(contractType: string) {
  try {
    const contracts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.contractsCollectionId,
      [Query.equal('type', [contractType])]
    );

    return contracts.documents[0].address;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function addContract(contract: ContractPayload) {
  try {
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.contractsCollectionId,
      ID.unique(),
      {
        creator: contract.userId,
        address: contract.address,
        type: contract.type,
      }
    );
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
