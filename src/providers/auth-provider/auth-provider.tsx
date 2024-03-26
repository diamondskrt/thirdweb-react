import { useCallback, useEffect, useState } from 'react';

import { getCurrentUser } from '@/api/auth';
import { useToast } from '@/components/ui/use-toast';
import type { DBUser } from '@/models';

import { AuthContext } from './constants';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  const [user, setUser] = useState<DBUser | null>(null);
  const [isPending, setIsPending] = useState(false);

  const checkAuthUser = useCallback(async () => {
    try {
      setIsPending(true);
      const currentUser = await getCurrentUser();

      setUser({
        accountId: currentUser.$id,
        userName: currentUser.userName,
        email: currentUser.email,
        imageUrl: currentUser.imageUrl,
      });
    } catch (error) {
      toast({
        title: 'Sign up failed. Please try again.',
        description: (error as Error).message,
      });

      localStorage.removeItem('cookieFallback');
    } finally {
      setIsPending(false);
    }
  }, [toast]);

  useEffect(() => {
    checkAuthUser();
  }, [checkAuthUser]);

  const value = {
    user,
    setUser,
    isPending,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
