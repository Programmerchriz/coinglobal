
import { getTrendingCoins } from '@/lib/api/trendingCoins';

import TrendingCoinsTable from '@/components/trending-coins/TrendingCoinsTable';
import CoinsPagination from '@/components/all/CoinsPagination';
import BackButton from '@/components/ui/BackButton';

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
    <div className="min-h-screen bg-[#0B0F19] text-white px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto space-y-6">

        <div>
          <BackButton />
        </div>

        <h4 className="text-2xl md:text-3xl font-semibold text-white">
          Trending Coins
        </h4>

        <div className="bg-[#111827] border border-white/5 rounded-2xl shadow-xl p-4">
          <TrendingCoinsTable trendingCoins={paginatedTrendingCoins} />
        </div>

        <div className="flex justify-center">
          <CoinsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasMorePages={hasMorePages}
            basePath="trending-coins"
          />
        </div>
      </div>
    </div>
  );
}
