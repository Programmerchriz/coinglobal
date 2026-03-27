'use client';

import { motion } from 'framer-motion';
import { Heart, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import DataTable from '@/components/all/DataTable';
import { columns } from '@/components/watchlist/columns';
import BackButton from '@/components/ui/BackButton';

export interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
  priceChange24h: number;
  priceChangePercent24h: number;
  marketCap: number;
  volume24h: number;
  dominance: number;
}

interface WatchlistClientProps {
  initialItems?: WatchlistItem[];
}

export default function WatchlistClient({ initialItems = [] }: WatchlistClientProps) {
  const mockData: WatchlistItem[] = [
    {
      id: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      currentPrice: 43874.5,
      priceChange24h: 1250.75,
      priceChangePercent24h: 0.84,
      marketCap: 860.45,
      volume24h: 15.24,
      dominance: 55.9,
    },
    {
      id: '2',
      symbol: 'ETH',
      name: 'Ethereum',
      currentPrice: 2305.18,
      priceChange24h: 45.5,
      priceChangePercent24h: 1.52,
      marketCap: 277.5,
      volume24h: 5.45,
      dominance: 18.5,
    },
    {
      id: '3',
      symbol: 'USDT',
      name: 'Tether',
      currentPrice: 1.0,
      priceChange24h: 0.01,
      priceChangePercent24h: 0.01,
      marketCap: 113.8,
      volume24h: 30.24,
      dominance: 4.52,
    },
    {
      id: '4',
      symbol: 'USDC',
      name: 'USDC Coin',
      currentPrice: 1.0,
      priceChange24h: 0.02,
      priceChangePercent24h: 0.02,
      marketCap: 34.2,
      volume24h: 3.72,
      dominance: 1.42,
    },
    {
      id: '5',
      symbol: 'BNB',
      name: 'BNB',
      currentPrice: 330.51,
      priceChange24h: 2.15,
      priceChangePercent24h: 0.67,
      marketCap: 50.46,
      volume24h: 1.26,
      dominance: 2.73,
    },
    {
      id: '6',
      symbol: 'XRP',
      name: 'XRP',
      currentPrice: 0.3711,
      priceChange24h: -0.0125,
      priceChangePercent24h: -1.73,
      marketCap: 17.26,
      volume24h: 0.47,
      dominance: 1.01,
    },
  ];

  const watchlistItems = initialItems.length > 0 ? initialItems : mockData;
  const hasItems = watchlistItems.length > 0;

  const total24hVolume = watchlistItems.reduce((acc, item) => acc + item.volume24h, 0);
  const totalWatchlistValue = watchlistItems.reduce((acc, item) => acc + item.currentPrice, 0);
  const exchangesCount = 78;
  const insightsCount = 52;
  const trendingAssetsCount = watchlistItems.filter(
    (item) => item.priceChangePercent24h > 1.0
  ).length;

  const isPositive = (value: number) => value >= 0;

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
          <span className="text-sm font-medium">{mockData.length} assets</span>
        </div>
      </div>

      {/* Empty State */}
      {!hasItems ? (
        <div className="w-full h-96 rounded-2xl border flex flex-col items-center justify-center bg-(--bg-surface) border-(--border-standard)">
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-linear-to-br from-purple-500/20 to-pink-500/20">
              <Heart size={40} className="text-(--color-primary)" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-(--text-primary) mb-2">
                Your watchlist is empty
              </h3>
              <p className="text-(--color-60) text-sm mb-6">
                {`Start building your crypto watchlist by adding coins you're interested in.`}
              </p>
            </div>
            <Link
              href="/markets"
              className="px-6 py-2 rounded-lg text-sm font-medium text-white transition-all bg-(--color-primary) hover:bg-(--color-primary-hover)"
            >
              Explore Markets
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Watchlist Stats */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-6">
            <div className="rounded-xl border p-4 bg-(--bg-surface) border-(--border-standard)">
              <p className="text-(--color-60) text-sm mb-2">Total Watchlist Value</p>
              <p className="text-2xl font-bold text-(--text-primary)">
                ${Math.floor(totalWatchlistValue / 100).toLocaleString('en-US', { maximumFractionDigits: 2 })}B
              </p>
              <p className="flex gap-1.5 text-(--color-60) text-xs mt-2">
                <TrendingUp width={16} height={16} className='text-(--color-success)' />
                <p className='text-(--color-success)'>2.41%</p>
              </p>
            </div>

            <div className="rounded-xl border p-4 bg-(--bg-surface) border-(--border-standard)">
              <p className="text-(--color-60) text-sm mb-2">Total 24h Volume</p>
              <p className="text-2xl font-bold text-(--color-primary)">
                ${total24hVolume.toLocaleString('en-US', { maximumFractionDigits: 0 })}B
              </p>
              <p className="text-(--color-60) text-xs mt-2">All watchlist assets</p>
            </div>

            <div className="rounded-xl border p-4 bg-(--bg-surface) border-(--border-standard)">
              <p className="text-(--color-60) text-sm mb-2">Exchanges</p>
              <p className="text-2xl font-bold text-(--text-primary)">{exchangesCount}</p>
              <p className="text-(--color-60) text-xs mt-2">Connected</p>
            </div>

            <div className="rounded-xl border p-4 bg-(--bg-surface) border-(--border-standard)">
              <p className="text-(--color-60) text-sm mb-2">AI Insights</p>
              <p className="text-2xl font-bold text-(--color-accent)">{insightsCount}</p>
              <p className="text-(--color-60) text-xs mt-2">Trending signals</p>
            </div>

            <div className="rounded-xl border p-4 bg-(--bg-surface) border-(--border-standard)">
              <p className="text-(--color-60) text-sm mb-2">Trending Assets</p>
              <p className="text-2xl font-bold text-(--color-success)">{trendingAssetsCount}</p>
              <p className="text-(--color-60) text-xs mt-2">Top movers</p>
            </div>
          </div>

          {/* Watchlist Table */}
          <div className="rounded-2xl border overflow-hidden custom-scrollbar bg-(--bg-surface) border-(--border-standard)">
            <DataTable data={mockData} columns={columns} rowKey={(row) => row.id} />
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
      )}
    </motion.div>
  );
}
