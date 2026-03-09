
import Image from 'next/image';
import Link from 'next/link';

import { TrendingDown, TrendingUp } from 'lucide-react';

import { cn, formatCurrency, formatPercentage } from '@/lib/utils';

export const columns: DataTableColumn<TrendingCoin>[] = [
  {
    header: 'Coin',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item;

      return (
        <Link href={`/coins/${item.id}`}>
          <Image src={item.large} alt={item.name} width={36} height={36} />
          <p className='custom-scrollbar overflow-x-auto max-w-30 sm:max-w-60 md:max-w-80 lg:max-w-50'>{item.name}</p>
        </Link>
      );
    },
  },
  {
    header: '24h Change',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin.item;
      const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;

      return (
        <div className={cn('price-change', isTrendingUp ? 'text-(--color-success)' : 'text-(--color-error)')}>
          <p className="flex items-center gap-1">
            {formatPercentage(item.data.price_change_percentage_24h.usd)}
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
    header: 'Price',
    cellClassName: 'price-cell',
    cell: (coin) => `${formatCurrency(coin.item.data.price)}`,
  },
];
