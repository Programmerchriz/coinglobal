import { Suspense } from 'react';
import { redirect } from 'next/navigation';

import { getServerSession } from '@/lib/session';
// import AuthClientPage from "../auth-client";
import { SignInForm } from './SignInForm';
import Fallback from '@/components/auth/fallback';

export default async function SignInPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <SignInForm />
    </Suspense>
  );
}
