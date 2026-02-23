import { getTrendingCoins } from '@/lib/api/trendingCoins';

import TrendingCoinsTable from '@/components/trending-coins/TrendingCoinsTable';
import CoinsPagination from '@/components/all/CoinsPagination';

export default async function TrendingCoinsPage({ searchParams }: NextPageProps) {
  const { page } = await searchParams;
  const requestedPage = Number(page) || 1;
  const perPage: number = 8;

  const trendingCoins = await getTrendingCoins();

  const totalPages = Math.ceil(trendingCoins.coins.length / perPage);
  const safeTotalPages = Math.max(1, totalPages);
  const currentPage = Math.min(Math.max(1, requestedPage), safeTotalPages);

  const paginatedTrendingCoins = trendingCoins.coins.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const hasMorePages = currentPage < safeTotalPages;

  return (
    <div className="main-container">
      <h4 className="text-xl md:text-2xl font-semibold mb-2 pl-5">Trending Coins</h4>

      <div id="trending-coins" className="custom-scrollbar">
        <TrendingCoinsTable trendingCoins={paginatedTrendingCoins} />
      </div>

      <CoinsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasMorePages={hasMorePages}
        basePath="trending-coins"
      />
    </div>
  );
}
