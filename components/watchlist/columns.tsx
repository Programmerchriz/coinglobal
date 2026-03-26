import { Heart, TrendingUp, TrendingDown } from 'lucide-react';

import { WatchlistItem } from '@/app/(dashboard)/watchlist/WatchlistClient';

export const columns: DataTableColumn<WatchlistItem>[] = [
  {
    header: 'Rank',
    cell: (item, index) => <div className="text-(--color-60) text-sm">{index + 1}</div>,
  },
  {
    header: 'Asset',
    cell: (item) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-(--bg-elevated) text-(--color-primary)">
          {item.symbol[0]}
        </div>
        <div>
          <p className="font-medium text-(--text-primary)">{item.symbol}</p>
          <p className="text-(--color-60) text-xs">{item.name}</p>
        </div>
      </div>
    ),
  },
  {
    header: 'Price',
    cell: (item) => (
      <p className="font-semibold text-(--text-primary)">
        $
        {item.currentPrice.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    ),
  },
  {
    header: '24h Change',
    cell: (item) => {
      const isPositive = item.priceChangePercent24h >= 0;
      return (
        <div className="flex items-center gap-1">
          {isPositive ? (
            <>
              <TrendingUp size={16} className="text-(--color-success)" />
              <span className="font-medium text-(--color-success)">
                +{item.priceChangePercent24h.toFixed(2)}%
              </span>
            </>
          ) : (
            <>
              <TrendingDown size={16} className="text-(--color-error)" />
              <span className="font-medium text-(--color-error)">
                {item.priceChangePercent24h.toFixed(2)}%
              </span>
            </>
          )}
        </div>
      );
    },
  },
  {
    header: 'Market Cap',
    cell: (item) => (
      <div>
        <p className="font-medium text-(--text-primary)">
          ${item.marketCap.toLocaleString('en-US', { maximumFractionDigits: 1 })}B
        </p>
        <p className="text-(--color-60) text-xs mt-1">{item.dominance.toFixed(2)}% dominance</p>
      </div>
    ),
  },
  {
    header: '',
    cell: (item) => (
      <button
        className="p-2 rounded-lg transition-colors hover:bg-(--bg-elevated) hover:cursor-pointer bg-transparent text-(--color-primary)"
        title="Remove from watchlist"
      >
        <Heart size={18} fill="currentColor" />
      </button>
    ),
  },
];
