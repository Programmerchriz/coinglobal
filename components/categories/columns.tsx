
import Image from "next/image";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

export const columns: DataTableColumn<Category>[] = [
  {
    header: 'Category',
    cellClassName: 'category-cell',
    cell: (category) => {
      return (
        // <Link href={`/coins/categories/${category.id}`}>
        //     <p>{category.name}</p>
        // </Link>
        <div>
          <p>{category.name}</p>
        </div>
      );
    },
  },
  {
    header: 'Top Gainers',
    cellClassName: 'top-gainers-cell',
    cell: (category) => category.top_3_coins.map((img) => (
      <Image
        key={img}
        src={img}
        alt=""
        width={28}
        height={28}
      />))
  },
  {
    header: '24h Change',
    cellClassName: 'change-header-cell',
    cell: (category) => {
      const change = category.market_cap_change_24h ?? 0;
      const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'flat';
      
      return (
        <div className={cn(
          'change-cell',
          trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-purple-100'
        )}>
          <p className="flex items-center gap-1">
            {formatPercentage(change)}
            {trend === 'up' && (
              <TrendingUp width={16} height={16} />
            )}
            {trend === 'down' && <TrendingDown width={16} height={16} />}
          </p>
        </div>
      );
    },
  },
  {
    header: 'Market Cap',
    cellClassName: 'market-cap-cell',
    cell: (category) => `${formatCurrency(category.market_cap)}`,
  },
  {
    header: 'Volume 24h',
    cellClassName: 'volume-cell',
    cell: (category) => `${formatCurrency(category.volume_24h)}`,
  },
];
