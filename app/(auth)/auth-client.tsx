
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

type AuthAction = () => Promise<{ error?: { message?: string } }>;
type AuthResponse = {
  error: { message?: string } | null;
};

export function useAuthHandler(successMessage: string, redirect: string) {
  const [error, setError] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const router = useRouter();

  const handleAuth = async (
    action: () => Promise<AuthResponse>
  ) => {
    if (isLocked) return;


  const res = await action();

  if (res?.error) {
    // handle error
  }

    setError(null);
    setIsLocked(true);

    try {
      const { error } = await action();

      if (error) {
        setError(error.message || 'Authentication failed');
        setIsLocked(false);
        return;
      }

      toast.success(successMessage);
      router.replace(redirect);
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
      setIsLocked(false);
    }
  };

  return {
    error,
    isLocked,
    handleAuth,
    setError,
  };
};
