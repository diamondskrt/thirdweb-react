import { z } from 'zod';

export const signInFormSchema = z.object({
  email: z.string().trim().email({
    message: 'Invalid email address',
  }),
  password: z.string().trim().min(4, {
    message: 'Password must be 4 or more characters long',
  }),
});
