import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useLocalStorage } from 'usehooks-ts';
import type { z } from 'zod';

import { useAddContract } from '@/api/queries';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import type { DBUser } from '@/models';

import { formSchema } from './constants';

export function AddContractPage() {
  const [user] = useLocalStorage<DBUser | null>('user', null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      type: '',
    },
  });

  const { mutateAsync: addContract, isLoading } = useAddContract();

  const onSubmit = async (contract: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        title: 'Something went wrong...',
      });

      return;
    }

    try {
      await addContract({ userId: user?.accountId, ...contract });
      toast({
        title: 'The contract was added successfully',
      });
    } catch (error) {
      toast({
        title: 'Add contract failed. Please try again.',
        description: (error as Error).message,
      });
    }
  };

  return (
    <div className="add-contracts-page page-paddings">
      <div className="container">
        <h1 className="text-gradient mb-4">Add Contract</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full md:w-1/2 lg:w-4/12 space-y-4"
          >
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Input placeholder="type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Contract
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
