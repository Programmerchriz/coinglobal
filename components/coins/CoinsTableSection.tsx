import { getWatchlistIds } from '@/lib/actions/watchlist-actions';
import { getCoins } from '@/lib/api/coins';

import CoinsClient from '@/app/(protected)/coins/CoinsClient';

interface CoinsTableSectionProps {
  currentPage: number;
  perPage: number;
}

export default async function CoinsTableSection({
  currentPage,
  perPage,
}: CoinsTableSectionProps) {
  const [allCoins, watchlistCoinIds] = await Promise.all([
    getCoins(perPage, currentPage),
    getWatchlistIds(),
  ]);

  const hasMorePages = allCoins.length === perPage;
  const estimatedTotalPages = currentPage >= 100
    ? Math.ceil(currentPage / 100) * 100 + 100
    : 100;

  return (
    <CoinsClient
      allCoins={allCoins}
      currentPage={currentPage}
      estimatedTotalPages={estimatedTotalPages}
      hasMorePages={hasMorePages}
      watchlistCoinIds={watchlistCoinIds}
    />
  );
}
