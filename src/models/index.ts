export type User = {
  userName: string;
  email: string;
  password: string;
};

export type DBUser = {
  accountId: string;
  email: string;
  imageUrl?: URL;
  userName?: string;
};
