
import { getWatchlistIds } from '@/lib/actions/watchlist-actions';
import { getCoins } from '@/lib/api/coins';

import CoinsClient from './CoinsClient';

const Coins = async ({ searchParams }: NextPageProps) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const perPage: number = 10;

  const [allCoins, watchlistCoinIds] = await Promise.all([
    getCoins(perPage, currentPage),
    getWatchlistIds(),
  ]);

  const hasMorePages = allCoins.length === perPage;
  const estimatedTotalPages = currentPage >= 100 ? Math.ceil(currentPage / 100) * 100 + 100 : 100;

  return (
    <CoinsClient
      allCoins={allCoins}
      currentPage={currentPage}
      estimatedTotalPages={estimatedTotalPages}
      hasMorePages={hasMorePages}
      watchlistCoinIds={watchlistCoinIds}
    />
  )
};

export default Coins;
