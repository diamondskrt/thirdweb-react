import { z } from 'zod';

export const formSchema = z.object({
  address: z.string().min(1, {
    message: 'Address is required',
  }),
  type: z.string().min(1, {
    message: 'Type is required',
  }),
});
