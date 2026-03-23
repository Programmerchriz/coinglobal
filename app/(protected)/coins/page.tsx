
import Image from 'next/image';
import Link from 'next/link';

import { TrendingUp, TrendingDown } from 'lucide-react';

import { cn, formatCurrency, formatPercentage } from '@/lib/utils';
import { fetcher } from '@/lib/coingecko.actions';

import DataTable from '../../../components/all/DataTable';
import CoinsPagination from '../../../components/all/CoinsPagination';
import BackButton from '@/components/ui/BackButton';

const columns: DataTableColumn<CoinMarketData>[] = [
  {
    header: 'Rank',
    cellClassName: 'rank-cell',
    cell: (coin) => `#${coin.market_cap_rank}`,
  },
  {
    header: 'Token',
    cellClassName: 'token-cell',
    cell: (coin) => {
      return (
        <Link href={`/coins/${coin.id}`} className="token-info">
          <Image src={coin.image} alt={`${coin.name} Logo`} width={28} height={28} />
          <p>
            {coin.name} ({coin.symbol.toUpperCase()})
          </p>
        </Link>
      );
    },
  },
  {
    header: 'Price',
    cellClassName: 'price-cell',
    cell: (coin) =>
      `${formatCurrency(coin.current_price)}`.toLowerCase().startsWith('us')
        ? `${formatCurrency(coin.current_price)}`
        : `${formatCurrency(coin.current_price)}`,
  },
  {
    header: '24h Change',
    cellClassName: 'change-header-cell',
    cell: (coin) => {
      const isTrendingUp = coin.price_change_percentage_24h > 0;

      return (
        <div className={cn('change-cell', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
          <p className="flex items-center gap-1">
            {formatPercentage(coin.price_change_percentage_24h)}
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />
            )}
          </p>
        </div>
      );
    },
  },
  {
    header: 'Market Cap',
    cellClassName: 'market-cap-cell',
    cell: (coin) =>
      `${formatCurrency(coin.market_cap)}`.toLowerCase().startsWith('us')
        ? `${formatCurrency(coin.market_cap)}`
        : `${formatCurrency(coin.market_cap)}`,
  },
];

const Coins = async ({ searchParams }: NextPageProps) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const perPage: number = 10;

  let allCoins: CoinMarketData[];

  try {
    allCoins = await fetcher<CoinMarketData[]>('/coins/markets', {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: perPage,
      page: currentPage,
      price_change_percentage: '24h',
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error("Failed to fetch categories data");
  }

  const hasMorePages = allCoins.length === perPage;
  const estimatedTotalPages = currentPage >= 100 ? Math.ceil(currentPage / 100) * 100 + 100 : 100;

  return (
    <div className="relative min-h-screen bg-(--bg-base) text-(--color-100) px-4 md:px-8 py-8">
      {/* Background Glow */}
      <div className="absolute -top-50 -left-50 w-100 h-100 bg-(--bg-glass-indigo) rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        <div>
          <BackButton />
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-semibold">
            All Coins
          </h1>

          <p className="text-(--color-50) text-sm mt-1">
            Explore different cryptocurrencies and their performance.
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl shadow-xl">
          <div id="coins-page" className="custom-scrollbar p-4 md:p-6">
            <DataTable
              data={allCoins}
              columns={columns}
              rowKey={(row) => row.id}
              tableClassName="coins-table"
              headerClassName="py-3!"
              bodyCellClassName="py-2! px-4"
            />
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <CoinsPagination
            currentPage={currentPage}
            totalPages={estimatedTotalPages}
            hasMorePages={hasMorePages}
            basePath="coins"
          />
        </div>
      </div>
    </div>
  );
};

export default Coins;
