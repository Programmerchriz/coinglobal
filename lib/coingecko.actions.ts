'use server';

import qs from 'query-string';

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) throw new Error('Could not get base url');
if (!API_KEY) throw new Error('Could not get api key');

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60
): Promise<T> {
  const baseUrl = `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  const url = params
    ? `${baseUrl}?${qs.stringify(params, {
        skipEmptyString: true,
        skipNull: true,
      })}`
    : baseUrl;
  console.log(url);

  const response = await fetch(url, {
    headers: {
      'x-cg-demo-api-key': API_KEY,
      'Content-Type': 'application/json',
    } as Record<string, string>,
    next: { revalidate },
  });

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}));

    throw new Error(`API Error: ${response.status} ${errorBody.error || response.statusText}`);
  }

  return response.json();
};

export async function searchCoins(query: string): Promise<SearchCoin[]> {
  if (!query) return [];

  // -----------------------------
  // STEP 1: Search endpoint
  // -----------------------------
  const searchData = await fetcher<SearchResponse>('/search', {
    query,
  });

  // sort coins by market cap
  const topCoins = searchData.coins
  .sort((a, b) => {
    if (!a.market_cap_rank) return 1;
    if (!b.market_cap_rank) return -1;
    return a.market_cap_rank - b.market_cap_rank;
  })
  .slice(0, 10);

  if (topCoins.length === 0) return [];

  const ids = topCoins.map((coin) => coin.id).join(',');

  // -----------------------------
  // STEP 2: Fetch price data
  // -----------------------------
  const marketData = await fetcher<MarketsResponse[]>('/coins/markets', {
    vs_currency: 'usd',
    ids,
    price_change_percentage: '24h',
  });

  // Convert markets array to lookup map
  const marketMap = new Map(
    marketData.map((coin) => [coin.id, coin])
  );

  // -----------------------------
  // STEP 3: Merge datasets
  // -----------------------------
  const merged: SearchCoin[] = topCoins.map((coin) => {
    const market = marketMap.get(coin.id);

    return {
      ...coin,
      data: {
        price: market?.current_price ?? null,
        price_change_percentage_24h:
          market?.price_change_percentage_24h ?? null,
      },
    };
  });

  return merged;
};
