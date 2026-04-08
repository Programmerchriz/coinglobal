import { getCoinsByIds } from '@/lib/api/coins-id';

import Watchlist from './Watchlist';
import CoinsPagination from '@/components/all/CoinsPagination';

interface WatchlistTableSectionProps {
  watchlistCoinIds: string[];
  currentPage: number;
}

export default async function WatchlistTableSection({
  watchlistCoinIds,
  currentPage,
}: WatchlistTableSectionProps) {
  const watchlistCoins = await getCoinsByIds(watchlistCoinIds);
  const perPage = 6;

  const sortedWatchlistCoins = [...watchlistCoins].sort(
    (a, b) =>
      (a.market_cap_rank ?? Number.MAX_SAFE_INTEGER) -
      (b.market_cap_rank ?? Number.MAX_SAFE_INTEGER)
  );

  const totalPages = Math.max(1, Math.ceil(sortedWatchlistCoins.length / perPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedWatchlistCoins = sortedWatchlistCoins.slice(
    (safeCurrentPage - 1) * perPage,
    safeCurrentPage * perPage
  );

  const hasMorePages = safeCurrentPage < totalPages;

  return (
    <div>
      <div className="rounded-2xl border overflow-hidden custom-scrollbar bg-(--bg-surface) border-(--border-standard)">
        <Watchlist
          allCoins={paginatedWatchlistCoins}
          watchlistCoinIds={watchlistCoinIds}
          isSorted={true}
        />
      </div>

      <div className="flex justify-center">
        <CoinsPagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          hasMorePages={hasMorePages}
          basePath="watchlist"
        />
      </div>
    </div>
  );
}
