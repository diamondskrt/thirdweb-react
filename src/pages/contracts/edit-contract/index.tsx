import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import type { z } from 'zod';

import { useGetContractById, useUpdateContract } from '@/api/queries';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import type { Contract, DBUser } from '@/models';
import { formSchema } from '@/pages/contracts/constants';

export function EditContractPage() {
  const [user] = useLocalStorage<DBUser | null>('user', null);
  const { id: contractId } = useParams();
  const navigate = useNavigate();

  const {
    data: contractMetadata,
    isLoading: isContractLoading,
    isError: isContractError,
  } = useGetContractById(contractId);

  const { mutateAsync: updateContract, isLoading: isUpdateContractLoading } =
    useUpdateContract();

  const isLoading = isContractLoading || isUpdateContractLoading;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      type: '',
    },
  });

  useEffect(() => {
    if (!contractMetadata) return;
    form.setValue('address', contractMetadata.address);
    form.setValue('type', contractMetadata.type);
  }, [contractMetadata, form]);

  const onSubmit = async (contract: z.infer<typeof formSchema>) => {
    if (!(user && contractId)) return;

    try {
      await updateContract({ $id: contractId, ...contract } as Contract);
      toast({
        title: 'The contract was saved successfully',
      });
      form.reset();
      navigate('/');
    } catch (error) {
      toast({
        title: 'Save contract failed. Please try again.',
        description: (error as Error).message,
      });
    }
  };

  return (
    <div className="edit-contracts-page page-paddings">
      <div className="container">
        <h1 className="text-gradient mb-4">Edit Contract</h1>

        {isContractError ? (
          <p>Something went wrong...</p>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full md:w-1/2 lg:w-4/12 space-y-4"
            >
              <Controller
                control={form.control}
                defaultValue=""
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="address"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                defaultValue=""
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="type"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Contract
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
