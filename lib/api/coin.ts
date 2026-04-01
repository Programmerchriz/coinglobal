
import { fetcher } from "@/lib/coingecko.actions";

export interface GetCoinResponse {
  coin: CoinDetailsData;
  coinTickers: Ticker[];
  coinOHLCData: OHLCData[];
};

export async function getCoin(id: string): Promise<GetCoinResponse> {
  let coin: CoinDetailsData, coinOHLCData: OHLCData[], coinTickersRes: { tickers: Ticker[] };

  try {
    [coin, coinTickersRes, coinOHLCData ] = await Promise.all([
      fetcher<CoinDetailsData>(`/coins/${id}/`),

      fetcher<{ tickers: Ticker[] }>(`/coins/${id}/tickers`, { page: 1, per_page: 5 }),

      fetcher<OHLCData[]>(`/coins/${id}/ohlc`, {
        vs_currency: 'usd',
        days: 1,
        // interval: 'hourly',
        precision: 'full',
      }),
    ]);

  } catch (error) {
    console.error('Error fetching coin:', error);
    throw new Error("Failed to fetch coin data");
  }

  return ({
    coin,
    coinTickers: coinTickersRes.tickers || [],
    coinOHLCData,
  });
};
