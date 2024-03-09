import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { DBUser } from '@/models';
import { AuthContext } from './constants';
import { useToast } from '@/components/ui/use-toast';
import { getCurrentUser } from '@/api/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
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
    } finally {
      setIsPending(false);
    }
  }, [toast]);

  useEffect(() => {
    const cookieFallback = localStorage.getItem('cookieFallback');

    if (!cookieFallback || cookieFallback === '[]') {
      navigate('/sign-in');

      return;
    }

    checkAuthUser();
  }, [checkAuthUser, navigate]);

  const value = {
    user,
    setUser,
    isPending,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
