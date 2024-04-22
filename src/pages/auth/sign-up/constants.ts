import { z } from 'zod';

export const signUpFormSchema = z.object({
  userName: z
    .string()
    .trim()
    .min(4, {
      message: 'Username must be 4 or more characters long',
    })
    .max(15, {
      message: 'Username must be 15 or fewer characters long',
    }),
  email: z.string().trim().email({
    message: 'Invalid email address',
  }),
  password: z.string().trim().min(4, {
    message: 'Password must be 4 or more characters long',
  }),
});
