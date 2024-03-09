import { ID } from 'appwrite';
import { account, appwriteConfig, avatars, databases } from './config';
import { DBUser, User } from '@/models';

export async function createUserAccount(user: User) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password
    );

    const avatarUrl = avatars.getInitials();

    await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      userName: user.userName,
      imageUrl: avatarUrl,
    });
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function saveUserToDB(user: DBUser) {
  try {
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function signInAccount(user: Omit<User, 'userName'>) {
  try {
    await account.createEmailPasswordSession(user.email, user.password);
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function signOutAccount() {
  try {
    await account.deleteSession('current');
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function getCurrentUser() {
  try {
    // const currentAccount = await getAccount();

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId
      // [Query.equal('accountId', currentAccount.$id)]
    );

    return currentUser.documents[0];
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
