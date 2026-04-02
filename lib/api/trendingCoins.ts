
import { fetcher } from "@/lib/coingecko.actions";
import { COINGECKO_REVALIDATE } from '@/constants';

export async function getTrendingCoins() {
  return (
    fetcher<{ coins: TrendingCoin[] }>(
      '/search/trending',
      undefined,
      COINGECKO_REVALIDATE.TRENDING
    )
  );
};
