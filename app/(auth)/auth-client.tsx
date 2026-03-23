
'use client';

import { useState } from 'react';

type AuthResponse = {
  error: { message?: string } | null;
};

export function useAuthHandler() {
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
