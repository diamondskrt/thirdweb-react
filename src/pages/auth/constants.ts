import { z } from 'zod';

export const signInFormSchema = z.object({
  userName: z
    .string()
    .min(4, {
      message: 'Username must be 4 or more characters long',
    })
    .max(15, {
      message: 'Username must be 15 or fewer characters long',
    }),
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(4, {
    message: 'Password must be 4 or more characters long',
  }),
});

export const signUpFormSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(4, {
    message: 'Password must be 4 or more characters long',
  }),
});
