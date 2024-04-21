import type { DBUser } from '@/models';

const isDemoUserId = import.meta.env.VITE_DEMO_USER_ID;

export const isDemoUser = (user: DBUser | null) => {
  return user?.accountId === isDemoUserId;
};
