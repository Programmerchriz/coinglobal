
import { Suspense } from 'react';

import BackButton from '@/components/ui/BackButton';
import CoinsTableSection from '@/components/coins/CoinsTableSection';
import CoinsTableFallback from '@/components/coins/fallback/CoinsTableFallback';

const Coins = async ({ searchParams }: NextPageProps) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const perPage: number = 10;

  return (
    <div className="relative min-h-screen bg-(--bg-base) text-(--color-100) px-2 py-8">
      <div className="absolute -top-50 -left-50 w-100 h-100 bg-(--bg-glass-indigo) rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        <div>
          <BackButton />
        </div>

        <div className="px-4">
          <h1 className="text-2xl md:text-3xl font-semibold">
            All Coins
          </h1>

          <p className="text-(--color-50) text-sm mt-1">
            Explore different cryptocurrencies and their performance.
          </p>
        </div>

        <Suspense key={currentPage} fallback={<CoinsTableFallback />}>
          <CoinsTableSection currentPage={currentPage} perPage={perPage} />
        </Suspense>
      </div>
    </div>
  )
};

export default Coins;
