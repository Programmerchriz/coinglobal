
import { fetcher } from "@/lib/coingecko.actions";
import { COINGECKO_REVALIDATE } from '@/constants';

export interface GetCoinResponse {
  coin: CoinDetailsData;
  coinTickers: Ticker[];
  coinOHLCData: OHLCData[];
};

export async function getCoin(id: string): Promise<GetCoinResponse> {
  let coin: CoinDetailsData, coinOHLCData: OHLCData[], coinTickersRes: { tickers: Ticker[] };

  try {
    [coin, coinTickersRes, coinOHLCData ] = await Promise.all([
      fetcher<CoinDetailsData>(
        `/coins/${id}/`,
        undefined,
        COINGECKO_REVALIDATE.COIN_DETAILS

      ),

      fetcher<{ tickers: Ticker[] }>(
        `/coins/${id}/tickers`, { page: 1, per_page: 5 },
        COINGECKO_REVALIDATE.COIN_TICKERS
      ),

      fetcher<OHLCData[]>(
        `/coins/${id}/ohlc`,
        {
          vs_currency: 'usd',
          days: 1,
          // interval: 'hourly',
          precision: 'full',
        },
        COINGECKO_REVALIDATE.OHLC_INTRADAY
      ),
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
