import StatCardFallback from './StatCardFallback';

export default function WatchlistStatsFallback() {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-6">
      <StatCardFallback label="Total Watchlist Market Cap" />
      <StatCardFallback label="Total 24h Volume" />
      <StatCardFallback label="AI Insights" />
      <StatCardFallback label="Trending Assets" />
    </div>
  );
};
