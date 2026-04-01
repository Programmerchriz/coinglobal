
import { fetcher } from "@/lib/coingecko.actions";

interface PeriodConfig {
  days: string | number;
  interval?: "daily" | "hourly" | undefined;
};

export async function getCandlestickChart(
  config: PeriodConfig,
  coinId: string,
) {
  let newData: OHLCData[];

  try {
    newData = await fetcher<OHLCData[]>(`/coins/${coinId}/ohlc`, {
      vs_currency: 'usd',
      days: config.days,
    });
    
  } catch (e) {
    console.error("Failed to fetch OHLCData:", e);
    throw new Error("Failed to fetch chart data");
  };

  return (newData ?? []);
};
