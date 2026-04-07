import StatCard from './StatCard';
import { getWatchlistExchangeCount } from '@/lib/watchlist-stats';

interface ExchangeCountStatCardProps {
  watchlistCoinIds: string[];
}

export default async function ExchangeCountStatCard({
  watchlistCoinIds,
}: ExchangeCountStatCardProps) {
  const uniqueExchangeCount = await getWatchlistExchangeCount(watchlistCoinIds);

  return (
    <StatCard
      label="Exchanges"
      value={uniqueExchangeCount}
      footer={<p className="text-(--color-60)">Connected</p>}
    />
  );
};
