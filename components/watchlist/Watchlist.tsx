"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TrendingUp, TrendingDown } from 'lucide-react';

import { cn, formatCurrency, formatPercentage } from '@/lib/utils';
import { addToWatchlist, removeFromWatchlist } from '@/lib/actions/watchlist-actions';

import WatchlistTable from '@/components/watchlist/WatchlistTable';
import WatchlistToggle from './WatchlistToggle';

interface WatchlistProps {
  allCoins: CoinMarketData[];
  watchlistCoinIds: string[];
  maxItems?: number;
};

const Watchlist = ({
  allCoins,
  watchlistCoinIds,
  maxItems,
}: WatchlistProps) => {
  const router = useRouter();
  const [optimisticWatchlistIds, setOptimisticWatchlistIds] = useState(() => new Set(watchlistCoinIds));
  const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());

  const sortedWatchlistCoins = allCoins
    .filter(coin => optimisticWatchlistIds.has(coin.id))
    .sort(
      (a, b) => 
        (a.market_cap_rank ?? Number.MAX_SAFE_INTEGER) -
        (b.market_cap_rank ?? Number.MAX_SAFE_INTEGER)
    );
  
  const displayedWatchlistCoins = maxItems
    ? sortedWatchlistCoins.slice(0, maxItems)
    : sortedWatchlistCoins;
  
  const columns: DataTableColumn<CoinMarketData>[] = [
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

  return (
    <div id="categories" className="custom-scrollbar animate-fade-in-up">
      <WatchlistTable watchlist={displayedWatchlistCoins} columns={columns} />
    </div>
  );
};

export default Watchlist;
