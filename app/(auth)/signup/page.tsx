import { Suspense } from 'react';

import { SignUpForm } from './SignUpForm';
import Fallback from '@/components/auth/fallback';

export default async function SignUpPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <SignUpForm />
    </Suspense>
  );
}
