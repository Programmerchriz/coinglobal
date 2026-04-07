"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

import { cn, formatCurrency, formatPercentage } from "@/lib/utils";

import WatchlistToggle from "@/components/watchlist/WatchlistToggle";
import CoinsPagination from "@/components/all/CoinsPagination";
import DataTable from "@/components/all/DataTable";
import BackButton from "@/components/ui/BackButton";
import { addToWatchlist, removeFromWatchlist } from "@/lib/actions/watchlist-actions";

interface CoinsClientProps {
  allCoins: CoinMarketData[];
  currentPage: number;
  estimatedTotalPages: number;
  hasMorePages: boolean;
  watchlistCoinIds: string[];
};

export default function CoinsClient({
  allCoins,
  currentPage,
  estimatedTotalPages,
  hasMorePages,
  watchlistCoinIds,
}: CoinsClientProps) {
  const [optimisticWatchlistIds, setOptimisticWatchlistIds] = useState(
    () => new Set(watchlistCoinIds)
  );
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());

  const handleToggleWatchlist = async ({id, nextState}: {id: string; nextState: boolean}) => {
    setOptimisticWatchlistIds(prev => {
      const next = new Set(prev);

      if (nextState) next.add(id);
      else next.delete(id);

      return (next);
    });

    setPendingIds(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

    try {
      await (nextState ? addToWatchlist(id) : removeFromWatchlist(id));
    } catch(e) {
      setOptimisticWatchlistIds(prev => {
        const next = new Set(prev);

        if (nextState) next.delete(id);
        else next.add(id);

        return (next);
      });
    } finally {
      setPendingIds(prev => {
        const next = new Set(prev);
        next.delete(id);

        return (next);
      });
    };
  };

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
          <Link href={`/coins/${coin.id}`} className="token-info flex gap-1 items-center font-semibold">
            <Image src={coin.image} alt={`${coin.name} Logo`} width={28} height={28} />
            <p>
              {coin.name}
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
    {
      header: 'Watchlist',
      cellClassName: 'watchlist-cell',
      cell: (coin) => {
        const coinId = coin.id;
        const isSaved = optimisticWatchlistIds.has(coinId);
        
        return (
          <WatchlistToggle
            id={coinId}
            disabled={pendingIds.has(coinId)}
            isInWatchlist={isSaved}
            onToggle={() => {handleToggleWatchlist({id: coinId, nextState: !isSaved})}}
          />
        );
      },
    },
  ];

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
          <div id="coins-page" className="custom-scrollbar py-4 md:py-2">
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
