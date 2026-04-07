
import { fetcher } from "@/lib/coingecko.actions";
import { COINGECKO_REVALIDATE } from '@/constants';

export async function getCoinsByIds(ids: string[]) {
  if (ids.length === 0) return [];

  return fetcher<CoinMarketData[]>(
    '/coins/markets',
    {
      vs_currency: 'usd',
      ids: ids.join(','),
      order: 'market_cap_desc',
      price_change_percentage: '24h',
    },
    COINGECKO_REVALIDATE.MARKETS
  );
}
