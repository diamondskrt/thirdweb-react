import { useMutation } from '@tanstack/react-query';
import { createUserAccount, signInAccount, signOutAccount } from './auth';
import { User } from '@/models';

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
