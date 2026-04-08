import "server-only";

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
): WatchlistStats {
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
