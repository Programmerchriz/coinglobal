'use client';

import { useRouter } from 'next/navigation';

interface Props {
  title: string;
  page: string;
  reset: () => void;
}

export default function ErrorClient({ title, page, reset }: Props) {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-start lg:items-center justify-center px-2 py-16">
      <div className="absolute -top-50 w-100 h-100 bg-(--color-primary)/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 w-100 h-100 bg-(--color-accent)/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-md w-full text-center p-8 rounded-2xl border border-(--color-5) bg-(--bg-surface) shadow-2xl space-y-4">
        <h2 className="text-xl font-semibold">Failed to load {title}</h2>

        <p className="text-sm text-(--color-50)">
          Something went wrong while loading the {page} page. Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="w-full bg-(--color-primary) text-white hover:bg-(--color-primary-hover) transition-colors py-2 rounded-xl text-sm font-medium hover:cursor-pointer"
        >
          Try Again
        </button>

        <button
          onClick={() => router.push('/')}
          className="w-full border border-(--color-10) py-2 rounded-xl text-sm hover:bg-(--color-5) transition hover:cursor-pointer"
        >
          Go Home
        </button>
      </div>
    </section>
  );
}
