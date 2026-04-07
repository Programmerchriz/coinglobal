import { getCoinsByIds } from '@/lib/api/coins-id';

import Watchlist from './Watchlist';

interface WatchlistTableSectionProps {
  watchlistCoinIds: string[];
}

export default async function WatchlistTableSection({
  watchlistCoinIds,
}: WatchlistTableSectionProps) {
  const watchlistCoins = await getCoinsByIds(watchlistCoinIds);

  return (
    <div className="rounded-2xl border overflow-hidden custom-scrollbar bg-(--bg-surface) border-(--border-standard)">
      <Watchlist allCoins={watchlistCoins} watchlistCoinIds={watchlistCoinIds} />
    </div>
  );
}
