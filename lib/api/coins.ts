
import { fetcher } from "@/lib/coingecko.actions";
import { COINGECKO_REVALIDATE } from '@/constants';

export async function getCoins(perPage: number, currentPage: number) {
  let allCoins: CoinMarketData[];

  if (perPage > 0) {
    try {
      allCoins = await fetcher<CoinMarketData[]>(
        '/coins/markets',
        {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: perPage,
          page: currentPage,
          price_change_percentage: '24h',
        },
        COINGECKO_REVALIDATE.MARKETS
      );

    } catch (error) {
      console.error('Error fetching coins:', error);
      throw new Error("Failed to fetch coins data");
    }

    return (allCoins);
  }

  try {
    allCoins = await fetcher<CoinMarketData[]>(
      '/coins/markets',
      {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        price_change_percentage: '24h',
      },
      COINGECKO_REVALIDATE.MARKETS
    );

  } catch (error) {
    console.error('Error fetching coins:', error);
    throw new Error("Failed to fetch coins data");
  }

  return (allCoins);
};