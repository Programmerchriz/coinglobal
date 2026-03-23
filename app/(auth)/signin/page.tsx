import { Suspense } from 'react';

import { SignInForm } from './SignInForm';
import Fallback from '@/components/auth/fallback';

export default async function SignInPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <SignInForm />
    </Suspense>
  );
}
