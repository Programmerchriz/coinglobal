
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CoinNotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 bg-(--bg-app) text-(--text-primary) overflow-hidden">

      <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-(--color-primary)/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-(--color-accent)/20 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-(--bg-surface) border border-(--border-standard) rounded-2xl shadow-xl p-8 text-center space-y-6">

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">
              Coin not found
            </h1>

            <p className="text-sm text-(--color-50)">
              The cryptocurrency you’re looking for does not exist or may have been removed.
            </p>
          </div>

          <Button
            asChild
            className="w-full bg-(--color-primary) hover:bg-(--color-primary-hover) text-white rounded-xl py-3 text-sm font-medium transition"
          >
            <Link href="/coins">
              Browse coins
            </Link>
          </Button>

        </div>
      </div>

    </main>
  );
};
