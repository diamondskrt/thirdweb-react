import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import type { z } from 'zod';

import { useSignInAccount } from '@/api/queries';
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
import { useToast } from '@/components/ui/use-toast';
import type { DBUser } from '@/models';

import { signInFormSchema } from './constants';

export function SignIn() {
  const [, setUser] = useLocalStorage<DBUser | null>('user', null);

  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutateAsync: signInAccount, isLoading } = useSignInAccount();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (user: z.infer<typeof signInFormSchema>) => {
    try {
      const currentUser = await signInAccount(user);

      setUser({
        accountId: currentUser.$id,
        userName: currentUser.userName,
        email: currentUser.email,
        imageUrl: currentUser.imageUrl,
      });

      form.reset();
      navigate('/');
    } catch (error) {
      toast({
        title: 'Sign up failed. Please try again.',
        description: (error as Error).message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col md:flex-row items-center gap-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign in
          </Button>
          <div className="flex gap-2">
            <p>No account?</p>
            <Link to="/auth/sign-up">
              <p className="text-primary">Sign Up</p>
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
