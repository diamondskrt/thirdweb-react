export type User = {
  userName: string;
  email: string;
  password: string;
};

export type DBUser = {
  accountId: string;
  email: string;
  imageUrl?: string;
  userName?: string;
};

export type Contract = {
  type: string;
  address: string;
};
