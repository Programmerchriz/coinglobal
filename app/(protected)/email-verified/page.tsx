import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

import { getServerSession } from '@/lib/session';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Email Verified',
};

export default async function EmailVerifiedPage() {
  const session = await getServerSession();

  if (!session?.user.emailVerified) redirect('/verify-email');
  if (true) redirect('/dashboard'); // Unaccesssible

  return (
    <main className="relative min-h-screen flex items-center justify-center px-2 bg-(--bg-app) text-(--color-100) overflow-hidden">
      <div className="absolute -top-50 w-100 h-100 bg-(--color-primary)/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 w-100 h-100 bg-(--color-accent)/20 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl shadow-xl p-8 text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Email verified</h1>

            <p className="text-sm text-(--color-50)">Your email has been verified successfully.</p>
          </div>

          <Button
            asChild
            className="w-full bg-(--color-primary) hover:bg-(--color-primary-hover) text-white rounded-xl py-3 text-sm font-medium transition"
          >
            <Link href="/dashboard">Go to dashboard</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
