'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Heart, TrendingUp } from 'lucide-react';
import BackButton from '@/components/ui/BackButton';
import Watchlist from '@/components/watchlist/Watchlist';
import { formatCompactCurrency, formatPercentage } from '@/lib/utils';
import StatCard from '@/components/watchlist/StatCard';

interface WatchlistClientProps {
  allCoins: CoinMarketData[];
  watchlistCoinIds: string[];
  stats: Omit<WatchlistStats, 'uniqueExchangeCount'>;
  exchangeCountCard: ReactNode;
}

interface WatchlistClientProps {
  allCoins: CoinMarketData[];
  watchlistCoinIds: string[];
  stats: Omit<WatchlistStats, 'uniqueExchangeCount'>;
  exchangeCountCard: ReactNode;
};

export default function WatchlistClient({
  allCoins,
  watchlistCoinIds,
  stats,
  exchangeCountCard
}: WatchlistClientProps) {
  const isMarketCapUp = stats.totalMarketCapChange24h >= 0;

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-(--text-primary) mb-1">My Watchlist</h1>
          <p className="text-(--color-60) text-sm">Track your favorite cryptocurrencies</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-(--bg-elevated)">
          <Heart size={18} className="text-(--color-primary)" fill="currentColor" />
          <span className="text-sm font-medium">{watchlistCoinIds.length} assets</span>
        </div>
      </div>

        <>
          {/* Watchlist Stats */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-6">
            <StatCard
              label="Total Watchlist Market Cap"
              value={formatCompactCurrency(stats.totalMarketCap)}
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

            {exchangeCountCard}

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


          {/* Watchlist Table */}
          <div className="rounded-2xl border overflow-hidden custom-scrollbar bg-(--bg-surface) border-(--border-standard)">
            <Watchlist allCoins={allCoins} watchlistCoinIds={watchlistCoinIds} />
          </div>

          {/* Footer Info */}
          <div className="mt-6 p-4 rounded-lg border text-(--color-60) text-sm bg-(--bg-elevated) border-(--border-standard)">
            <p>
              💡{' '}
              <span className="text-(--color-50) ml-2">
                Prices update every 60 seconds. Click the heart icon to manage your watchlist.
              </span>
            </p>
          </div>
        </>
    </motion.div>
  );
};
