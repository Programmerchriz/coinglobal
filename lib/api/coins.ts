
import { fetcher } from "@/lib/coingecko.actions";

export async function getCoins(perPage: number, currentPage: number) {
  let allCoins: CoinMarketData[];

  try {
    allCoins = await fetcher<CoinMarketData[]>('/coins/markets', {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: perPage,
      page: currentPage,
      price_change_percentage: '24h',
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error("Failed to fetch categories data");
  }

  return (allCoins);
};