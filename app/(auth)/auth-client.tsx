
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type AuthResponse = {
  error: { message?: string } | null;
};

export function useAuthHandler(redirectParam: string) {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const handleAuth = async (
    action: () => Promise<AuthResponse>
  ) => {
    if (isLocked) return;

    setIsLocked(true);
    setError(null);

    try {
      const res = await action();

      if (res?.error) {
        setError(res.error.message || 'Authentication failed');
        setIsLocked(false);
        return;
      }

      setTimeout(() => setIsLocked(false), 4500);
      router.replace(redirectParam);
      router.refresh();

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
