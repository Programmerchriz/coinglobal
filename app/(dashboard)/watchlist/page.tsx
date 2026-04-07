
import { Suspense } from 'react';
import { Heart } from 'lucide-react';

import { getWatchlistIds } from '@/lib/actions/watchlist-actions';

import BackButton from '@/components/ui/BackButton';
import EmptyWatchlist from '@/components/watchlist/EmptyWatchlist';
import WatchlistStatsSection from '@/components/watchlist/WatchlistStatsSection';
import WatchlistTableSection from '@/components/watchlist/WatchlistTableSection';
import WatchlistStatsFallback from '@/components/watchlist/fallback/WatchlistStatsFallback';
import WatchlistTableFallback from '@/components/watchlist/fallback/WatchlistTableFallback';

export default async function WatchlistPage() {
  const watchlistCoinIds = await getWatchlistIds();

  return (
    <div
      className="w-full min-h-screen bg-(--bg-app) pb-8 px-0 sm:px-4 md:px-8 overflow-x-hidden"
    >
      <div className="absolute -top-50 w-100 h-100 bg-(--color-primary)/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 w-100 h-100 bg-(--color-accent)/20 rounded-full blur-3xl" />

      <div className="max-w-full relative z-10 mx-auto">
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

        {
          watchlistCoinIds.length < 1 ? (
            <EmptyWatchlist />
          ) : (
            <div>
              <Suspense fallback={<WatchlistStatsFallback />}>
                <WatchlistStatsSection watchlistCoinIds={watchlistCoinIds} />
              </Suspense>

              <Suspense fallback={<WatchlistTableFallback />}>
                <WatchlistTableSection watchlistCoinIds={watchlistCoinIds} />
              </Suspense>

              <div className="mt-6 p-4 rounded-lg border text-(--color-60) text-sm bg-(--bg-elevated) border-(--border-standard)">
                <p>
                  ðŸ’¡{' '}
                  <span className="text-(--color-50) ml-2">
                    Prices update every 60 seconds. Click the heart icon to manage your watchlist.
                  </span>
                </p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}
