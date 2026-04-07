
import { Suspense } from 'react';

import { getWatchlistIds } from '@/lib/actions/watchlist-actions';
import { getCoinsByIds } from '@/lib/api/coins-id';
import { getWatchlistCoreStats } from '@/lib/watchlist-stats';
import { getTrendingCoins } from '@/lib/api/trendingCoins';

import WatchlistClient from './WatchlistClient';
import ExchangeCountStatCard from '@/components/watchlist/ExchangeCountStatCard';
import ExchangeCountStatCardFallback from '@/components/watchlist/ExchangeCountStatCardFallback';

export default async function WatchlistPage() {
  const currentPage = 0;
  const perPage: number = 0;
  
  const watchlistCoinIds = await getWatchlistIds();

  const [watchlistCoins, trendingResponse] = await Promise.all([
    getCoinsByIds(watchlistCoinIds),
    getTrendingCoins(),
  ]);

  const coreStats = getWatchlistCoreStats(watchlistCoins, trendingResponse.coins);

  return (
    <div
      className="w-full min-h-screen bg-(--bg-app) pb-8 px-0 sm:px-4 md:px-8 overflow-x-hidden"
    >
      <div className="absolute -top-50 w-100 h-100 bg-(--color-primary)/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 w-100 h-100 bg-(--color-accent)/20 rounded-full blur-3xl" />

      <div className="max-w-full relative z-10 mx-auto">
        <WatchlistClient
          allCoins={watchlistCoins}
          watchlistCoinIds={watchlistCoinIds}
          stats={coreStats}
          exchangeCountCard={
            <Suspense fallback={<ExchangeCountStatCardFallback />}>
              <ExchangeCountStatCard watchlistCoinIds={watchlistCoinIds} />
            </Suspense>
          }
        />
      </div>
    </div>
  );
}
