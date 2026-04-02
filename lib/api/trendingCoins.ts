
import { fetcher, COINGECKO_REVALIDATE } from "@/lib/coingecko.actions";

export async function getTrendingCoins() {
  return (
    fetcher<{ coins: TrendingCoin[] }>(
      '/search/trending',
      undefined,
      COINGECKO_REVALIDATE.TRENDING
    )
  );
};
