import { Suspense } from 'react';
import { TrendingUp } from 'lucide-react';

import { getCoinsByIds } from '@/lib/api/coins-id';
import { getTrendingCoins } from '@/lib/api/trendingCoins';
import { getWatchlistCoreStats } from '@/lib/watchlist-stats';
import { formatCompactCurrency, formatPercentage } from '@/lib/utils';

import StatCard from './StatCard';
import ExchangeCountStatCard from './ExchangeCountStatCard';
import ExchangeCountStatCardFallback from './fallback/ExchangeCountStatCardFallback';

interface WatchlistStatsSectionProps {
  watchlistCoinIds: string[];
}

export default async function WatchlistStatsSection({
  watchlistCoinIds,
}: WatchlistStatsSectionProps) {
  const [watchlistCoins, trendingResponse] = await Promise.all([
    getCoinsByIds(watchlistCoinIds),
    getTrendingCoins(),
  ]);

  const stats = getWatchlistCoreStats(watchlistCoins, trendingResponse.coins);
  const isMarketCapUp = stats.totalMarketCapChange24h >= 0;

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-6">
      <StatCard
        label="Total Watchlist Market Cap"
        value={formatCompactCurrency(stats.totalMarketCap)}
        valueClassName={`text-2xl font-bold ${isMarketCapUp ? 'text-(--color-success)' : 'text-(--color-error)'}`}
        footer={
          <div className="flex gap-1.5 text-(--color-60)">
            {isMarketCapUp ? (
              <TrendingUp width={16} height={16} className="text-(--color-success)" />
            ) : (
              <TrendingUp width={16} height={16} className="text-(--color-error) rotate-180" />
            )}
            <p className={isMarketCapUp ? "text-(--color-success)" : "text-(--color-error)"}>
              {formatPercentage(stats.totalMarketCapChange24hPercentage)}
            </p>
          </div>
        }
      />

      <StatCard
        label="Total 24h Volume"
        value={formatCompactCurrency(stats.total24hVolume)}
        valueClassName="text-(--color-primary)"
        footer={<p className="text-(--color-60)">All watchlist assets</p>}
      />

      <Suspense fallback={<ExchangeCountStatCardFallback />}>
        <ExchangeCountStatCard watchlistCoinIds={watchlistCoinIds} />
      </Suspense>

      <StatCard
        label="AI Insights"
        value={12}
        valueClassName="text-(--color-accent)"
        footer={<p className="text-(--color-60)">Trending signals</p>}
      />

      <StatCard
        label="Trending Assets"
        value={stats.trendingAssetsCount}
        valueClassName="text-(--color-success)"
        footer={<p className="text-(--color-60)">Top movers</p>}
      />
    </div>
  );
};
