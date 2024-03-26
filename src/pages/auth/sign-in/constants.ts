import { z } from 'zod';

export const signInFormSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(4, {
    message: 'Password must be 4 or more characters long',
  }),
});
