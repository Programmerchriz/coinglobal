

import { Suspense } from 'react';

import {
  CategoriesFallback,
  CoinOverviewFallback,
  TrendingCoinsFallback,
} from '@/components/markets/fallback';
import Categories from '@/components/markets/Categories';

import CoinOverview from '@/components/markets/CoinOverview';
import TrendingCoins from '@/components/markets/TrendingCoins';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ChevronRightIcon } from 'lucide-react';

const Page = async () => {
  return (
    <main className="container-app min-h-screen px-2 md:px-8 py-8">
      
      {/* Top Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-8 animate-fade-in-up">
        <Suspense fallback={<CoinOverviewFallback />}>
          <div className="container-surface lg:col-span-3 border rounded-2xl shadow-xl px-0 py-2 lg:p-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
            <CoinOverview />
          </div>
        </Suspense>

        <Suspense fallback={<TrendingCoinsFallback />}>
          <div className="container-surface lg:col-span-2 border rounded-2xl shadow-xl p-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
            <TrendingCoins />
          </div>
        </Suspense>
      </section>

      {/* Categories Section */}
      <section className="w-full mt-10 space-y-6 animate-fade-in-up delay-150">
        <Suspense fallback={<CategoriesFallback />}>
          <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl shadow-xl p-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
            <Categories />
          </div>

          <div className="flex justify-end items-start">
            <Link
              href="/categories"
              className={cn(
                'group px-6 py-3 bg-(--color-primary) hover:bg-(--color-primary-hover) active:scale-95 text-(--text-primary) font-medium rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-indigo-600/30 hover:-translate-y-1'
              )}
            >
              <span>All Categories</span>
              <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Suspense>
      </section>
    </main>
  );
};

export default Page;
