import { fetcher } from "@/lib/coingecko.actions";
import { COINGECKO_REVALIDATE } from "@/constants";

export async function getCoinTickersPage(
  id: string,
  page = 1,
  perPage = 100,
) {
  return (
    fetcher<{ tickers: Ticker[] }>(
      `/coins/${id}/tickers`,
      { page, per_page: perPage },
      COINGECKO_REVALIDATE.COIN_TICKERS,
    )
  );
};

export async function getAllCoinTickers(id: string, maxPages = 10) {
  const perPage = 100;
  const allTickers: Ticker[] = [];

  for (let page = 1; page <= maxPages; page++) {
    const { tickers } = await getCoinTickersPage(id, page, perPage);

    allTickers.push(...tickers);
    if (tickers.length < perPage) break;
  };

  return (allTickers);
};
