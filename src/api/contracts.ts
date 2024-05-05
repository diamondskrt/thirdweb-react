import type { Models } from 'appwrite';
import { ID, Query } from 'appwrite';

import type { Contract, ContractPayload } from '@/models';

import { appwriteConfig, databases } from './config';

export async function getUserContracts(userId?: string) {
  if (!userId) return;

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

export async function getNFTs() {
  try {
    const NFTs = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.NFTsCollectionId
    );

    return NFTs.documents;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getContractById(id?: string) {
  if (!id) return;

  try {
    const contract = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.contractsCollectionId,
      id
    );

    return contract;
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

export async function addContract(
  contract: ContractPayload
): Promise<Models.Document> {
  try {
    const contractMetadata = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.contractsCollectionId,
      ID.unique(),
      {
        creator: contract.userId,
        address: contract.address,
        type: contract.type,
      }
    );

    return contractMetadata;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function updateContract(
  contract: Contract
): Promise<Models.Document> {
  try {
    const contractMetadata = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.contractsCollectionId,
      contract.$id,
      {
        address: contract.address,
        type: contract.type,
      }
    );

    return contractMetadata;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function deleteContract(contractId: string) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.contractsCollectionId,
      contractId
    );
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
