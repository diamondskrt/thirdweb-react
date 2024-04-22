import { z } from 'zod';

export const formSchema = z.object({
  address: z.string().trim().min(1, {
    message: 'Address is required',
  }),
  type: z.string().trim().min(1, {
    message: 'Type is required',
  }),
});
