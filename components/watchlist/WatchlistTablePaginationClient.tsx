'use client';

import { useState, useTransition } from 'react';

import CoinsPagination from '@/components/all/CoinsPagination';
import { cn } from '@/lib/utils';
import { getWatchlistCoinsPage } from '@/lib/actions/watchlist-actions';

import Watchlist from './Watchlist';

interface WatchlistTablePaginationClientProps {
  watchlistCoinIds: string[];
  initialCoins: CoinMarketData[];
  initialPage: number;
  perPage: number;
  totalPages: number;
}

export default function WatchlistTablePaginationClient({
  watchlistCoinIds,
  initialCoins,
  initialPage,
  perPage,
  totalPages,
}: WatchlistTablePaginationClientProps) {
  const [coins, setCoins] = useState(initialCoins);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (page: number) => {
    if (page === currentPage || isPending) return;

    setError(null);

    startTransition(() => {
      getWatchlistCoinsPage(watchlistCoinIds, page, perPage)
        .then((nextCoins) => {
          setCoins(nextCoins);
          setCurrentPage(page);
        })
        .catch(() => {
          setError('Unable to load that page right now. Please try again.');
        });
    });
  };

  return (
    <div>
      <div
        className={cn(
          'rounded-2xl border overflow-hidden custom-scrollbar bg-(--bg-surface) border-(--border-standard) transition-opacity',
          isPending && 'disabled cursor-not-allowed opacity-60 pointer-events-none'
        )}
      >
        <Watchlist
          allCoins={coins}
          watchlistCoinIds={watchlistCoinIds}
          isSorted={true}
        />
      </div>

            {isPending ? (
              <div className="flex min-h-5 items-center justify-center">
                <p className="text-xs text-(--color-60)">Loading...</p>
              </div>
            ) : error ? (
              <div className="flex min-h-5 items-center justify-center">
                <p className="text-xs text-(--color-error)">{error}</p>
              </div>
            ) : null}

      <div className="flex justify-center">
        <CoinsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasMorePages={currentPage < totalPages}
          basePath="watchlist"
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
