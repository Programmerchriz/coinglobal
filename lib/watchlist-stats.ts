import "server-only";

import { cache } from 'react';

import { getTrendingCoins } from "@/lib/api/trendingCoins";
import { getAllCoinTickers } from "@/lib/api/coin-tickers";

const getCachedCoinTickers = cache(async (id: string) => {
  return getAllCoinTickers(id);
});

export function getTotalWatchlistMarketCap(coins: CoinMarketData[]) {
  return (coins.reduce((sum, coin) => sum + (coin.market_cap ?? 0), 0));
};

export function getTotalWatchlist24hVolume(coins: CoinMarketData[]) {
  return (coins.reduce((sum, coin) => sum + (coin.total_volume ?? 0), 0));
};

export function getTrendingAssetsCount(
  watchlistCoinIds: string[],
  trendingCoins: TrendingCoin[]
) {
  const watchlistSet = new Set(watchlistCoinIds);

  return (
    trendingCoins.reduce((count, { item }) => {
      return count + (watchlistSet.has(item.id) ? 1 : 0);
    }, 0)
  );
};

export function getUniqueExchangeCount(tickerGroups: Ticker[][]) {
  const exchanges = new Set<string>();

  for (const tickers of tickerGroups) {
    for (const ticker of tickers) {
      const name = ticker.market?.name?.trim().toLowerCase();
      if (name) exchanges.add(name);
    }
  }

  return (exchanges.size);
};

export async function getWatchlistStats(
  watchlistCoins: CoinMarketData[]
): Promise<WatchlistStats> {
  if (watchlistCoins.length === 0) {
    return {
      totalMarketCap: 0,
      totalMarketCapChange24h: 0,
      totalMarketCapChange24hPercentage: 0,
      total24hVolume: 0,
      uniqueExchangeCount: 0,
      trendingAssetsCount: 0,
    };
  };

  const watchlistCoinIds = watchlistCoins.map(coin => coin.id);
  
  const [ trendingResponse, tickerGroups ] = await Promise.all([
    getTrendingCoins(),
    Promise.all(
      watchlistCoinIds.map(id => getAllCoinTickers(id).catch(() => []))
    ),
  ]);

  const totalMarketCap = getTotalWatchlistMarketCap(watchlistCoins);
  const totalMarketCapChange24h = getTotalWatchlistMarketCapChange24h(watchlistCoins);

  return (
    {
      totalMarketCap,
      totalMarketCapChange24h,
      totalMarketCapChange24hPercentage: getTotalWatchlistMarketCapChange24hPercentage(
        totalMarketCap,
        totalMarketCapChange24h
      ),
      total24hVolume: getTotalWatchlist24hVolume(watchlistCoins),
      uniqueExchangeCount: getUniqueExchangeCount(tickerGroups),
      trendingAssetsCount: getTrendingAssetsCount(
        watchlistCoinIds,
        trendingResponse.coins
      ),
    }
  );
};

export function getTotalWatchlistMarketCapChange24h(coins: CoinMarketData[]) {
  return coins.reduce((sum, coin) => sum + (coin.market_cap_change_24h ?? 0), 0);
};

export function getTotalWatchlistMarketCapChange24hPercentage(
  totalMarketCap: number,
  totalMarketCapChange24h: number
) {
  const previousTotalMarketCap = totalMarketCap - totalMarketCapChange24h;

  if (!previousTotalMarketCap) return 0;

  return (totalMarketCapChange24h / previousTotalMarketCap) * 100;
};

export function getWatchlistCoreStats(
  watchlistCoins: CoinMarketData[],
  trendingCoins: TrendingCoin[]
): Omit<WatchlistStats, 'uniqueExchangeCount'> {
  const watchlistCoinIds = watchlistCoins.map((coin) => coin.id);
  const totalMarketCap = getTotalWatchlistMarketCap(watchlistCoins);
  const totalMarketCapChange24h = getTotalWatchlistMarketCapChange24h(watchlistCoins);

  return (
    {
      totalMarketCap,
      totalMarketCapChange24h,
      totalMarketCapChange24hPercentage: getTotalWatchlistMarketCapChange24hPercentage(
        totalMarketCap,
        totalMarketCapChange24h
      ),
      total24hVolume: getTotalWatchlist24hVolume(watchlistCoins),
      trendingAssetsCount: getTrendingAssetsCount(watchlistCoinIds, trendingCoins),
    }
  );
};

export async function getWatchlistExchangeCount(watchlistCoinIds: string[]) {
  if (watchlistCoinIds.length === 0) return 0;

  const tickerGroups = await Promise.all(
    watchlistCoinIds.map(id => getCachedCoinTickers(id).catch(() => []))
  );

  return (getUniqueExchangeCount(tickerGroups));
};
