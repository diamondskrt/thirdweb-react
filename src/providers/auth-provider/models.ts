import { DBUser } from '@/models';

export type IContextType = {
  user: DBUser | null;
  isPending: boolean;
  setUser: React.Dispatch<React.SetStateAction<DBUser | null>>;
};
