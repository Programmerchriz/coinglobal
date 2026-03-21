
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

type AuthAction = () => Promise<{ error?: { message?: string } }>;
type AuthResponse = {
  error: { message?: string } | null;
};

// toast.success("Account created 🎉", {
//   description: "Your account has been set up successfully.",
// });

export function useAuthHandler(redirect: string) {
  const [error, setError] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const router = useRouter();

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

      console.log(redirect);
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
