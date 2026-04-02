
import { fetcher } from "@/lib/coingecko.actions";
import { COINGECKO_REVALIDATE } from '@/constants';

interface PeriodConfig {
  days: string | number;
  interval?: "daily" | "hourly" | undefined;
};

export async function getCandlestickChart(
  config: PeriodConfig,
  coinId: string,
) {
  const revalidate = 
    Number(config.days) <= 1
      ? COINGECKO_REVALIDATE.OHLC_INTRADAY
      : COINGECKO_REVALIDATE.OHLC_SWING;

  let newData: OHLCData[];

  try {
    newData = await fetcher<OHLCData[]>(
      `/coins/${coinId}/ohlc`,
      {
        vs_currency: 'usd',
        days: config.days,
      },
      revalidate
    );
    
  } catch (e) {
    console.error("Failed to fetch OHLCData:", e);
    throw new Error("Failed to fetch chart data");
  };

  return (newData ?? []);
};
