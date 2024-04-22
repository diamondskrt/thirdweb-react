export type User = {
  userName: string;
  email: string;
  password: string;
};

export type DBUser = {
  accountId: string;
  email: string;
  imageUrl: string;
  userName: string;
};

export type Contract = {
  type: string;
  address: string;
};

export interface ContractPayload extends Contract {
  userId: string;
  address: string;
  type: string;
}

export enum ContractTypes {
  ERC721 = 'ERC721',
  ERC721A = 'ERC721A',
  ERC20 = 'ERC20',
  ERC1155 = 'ERC1155',
}

export type DemoNFT = {
  $id: string;
  image: string;
  title: string;
};
