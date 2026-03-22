
'use client';

import { useState } from 'react';

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

  const handleAuth = async (
    action: () => Promise<AuthResponse>
  ) => {
    console.log("Redirect param:", redirect);
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

      console.log("Redirect param:", redirect);
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
