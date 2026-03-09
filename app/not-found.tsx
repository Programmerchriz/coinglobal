
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 bg-(--bg-app) text-(--text-primary) overflow-hidden">

      {/* background glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-(--color-primary)/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-(--color-accent)/20 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-(--bg-surface) border border-(--border-standard) rounded-2xl shadow-xl p-8 text-center space-y-6">

          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">404</h1>

            <p className="text-sm text-(--color-50)">
              The page you’re looking for doesn’t exist.
            </p>
          </div>

          <Button
            asChild
            className="w-full bg-(--color-primary) hover:bg-(--color-primary-hover text-white rounded-xl py-3 text-sm font-medium transition hover:cursor-pointer"
          >
            <Link
              href="/"
            >
              Go back home
            </Link>
          </Button>

        </div>
      </div>

    </main>
  );
};
