
import { formatCurrency } from '@/lib/utils';
import { getTheme } from '@/lib/actions/theme-actions';
import { isInWatchlist } from '@/lib/actions/watchlist-actions';
import { getCoin } from '@/lib/api/coin';

import CoinDetailsClient from './CoinDetailsClient';

const Coin = async ({ params }: CoinPageProps) => {
  const theme = await getTheme();
  const { id } = await params;
  if (!id) throw new Error("Coin id not found");

  const [{ coin, coinTickers, coinOHLCData }, initialIsInWatchlist] = await Promise.all([
    getCoin(id),
    isInWatchlist(id)
  ]);

  if (!coin) {
    throw new Error("Failed to fetch coin data");
  }

  const currencies = [
    ...new Set([
      'usd',
      'eur',
      'gbp',
      'cad',
      'aud',
      'nzd',
      'jpy',
      'ngn',
      ...Object.keys(coin.market_data.current_price),
    ]),
  ];

  const currenciesObj = coin.market_data.current_price;

  const coinDetailsArray: CoinDetailsArrayProps[] = [
    {
      title: 'Market Cap',
      isLink: false,
      value: `${formatCurrency(coin.market_data.market_cap.usd)}`,
    },
    {
      title: 'Market Cap Rank',
      isLink: false,
      value: `# ${coin.market_cap_rank}`,
    },
    {
      title: 'Total Volume',
      isLink: false,
      value: `${formatCurrency(coin.market_data.total_volume.usd)}`,
    },
    {
      title: 'Website',
      isLink: true,
      href: coin.links.homepage?.[0] || '/',
    },
    {
      title: 'Whitepaper',
      isLink: true,
      href: coin.links.whitepaper || '/',
    },
    {
      title: 'Community',
      isLink: true,
      href: coin.links.subreddit_url || '/',
    },
  ];

  return (
    <CoinDetailsClient
      coin={coin}
      id={id}
      theme={theme}
      coinOHLCData={coinOHLCData}
      currencies={currencies}
      currenciesObj={currenciesObj}
      coinDetailsArray={coinDetailsArray}
      coinTickers={coinTickers}
      initialIsInWatchlist={initialIsInWatchlist}
    />
  );
};

export default Coin;
