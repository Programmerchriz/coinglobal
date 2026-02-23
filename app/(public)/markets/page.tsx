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
    <main className="min-h-screen bg-[#0B0F19] text-white px-4 md:px-8 py-8">
      
      {/* Top Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
        <Suspense fallback={<CoinOverviewFallback />}>
          <div className="bg-[#111827] border border-white/5 rounded-2xl shadow-xl p-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
            <CoinOverview />
          </div>
        </Suspense>

        <Suspense fallback={<TrendingCoinsFallback />}>
          <div className="bg-[#111827] border border-white/5 rounded-2xl shadow-xl p-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
            <TrendingCoins />
          </div>
        </Suspense>
      </section>

      {/* Categories Section */}
      <section className="w-full mt-10 space-y-6 animate-fade-in-up delay-150">
        <Suspense fallback={<CategoriesFallback />}>
          <div className="bg-[#111827] border border-white/5 rounded-2xl shadow-xl p-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
            <Categories />
          </div>

          <div className="flex justify-end items-start">
            <Link
              href="/categories"
              className={cn(
                'group px-6 py-3 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-medium rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-indigo-600/30 hover:-translate-y-1'
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
