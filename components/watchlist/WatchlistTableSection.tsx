import { getCoinsByIds } from '@/lib/api/coins-id';

import WatchlistTablePaginationClient from './WatchlistTablePaginationClient';

interface WatchlistTableSectionProps {
  watchlistCoinIds: string[];
}

export default async function WatchlistTableSection({
  watchlistCoinIds,
}: WatchlistTableSectionProps) {
  const perPage = 6;
  const totalPages = Math.max(1, Math.ceil(watchlistCoinIds.length / perPage));
  const initialCoins = await getCoinsByIds(watchlistCoinIds, perPage, 1);

  return (
    <WatchlistTablePaginationClient
      watchlistCoinIds={watchlistCoinIds}
      initialCoins={initialCoins}
      initialPage={1}
      perPage={perPage}
      totalPages={totalPages}
    />
  );
};
