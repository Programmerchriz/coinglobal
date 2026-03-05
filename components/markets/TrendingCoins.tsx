import Link from 'next/link';

import { ChevronRightIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { getTrendingCoins } from '@/lib/api/trendingCoins';

import TrendingCoinsTable from '@/components/trending-coins/TrendingCoinsTable';

const TrendingCoins = async () => {
  const trendingCoins = await getTrendingCoins();
  const coins = trendingCoins?.coins ?? [];

  return (
    <div id="trending-coins" className="animate-fade-in-up">
      <h4 className="text-xl md:text-2xl font-semibold mb-4">
        Trending Coins
      </h4>

      <div className='custom-scrollbar overflow-x-auto'>
        <TrendingCoinsTable trendingCoins={coins.slice(0, 5)} />
      </div>

      <div className="flex justify-center items-center mt-4">
        <Link
          href="/trending-coins"
          className={cn(
            'group px-5 py-2 bg-(--bg-sidebar) hover:border border-(--color-10) text-primary rounded-xl transition-all duration-300 hover:bg-(--color-10) hover:-translate-y-1 hover:shadow-lg active:scale-95 flex items-center gap-2'
          )}
        >
          <span>More</span>
          <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default TrendingCoins;
