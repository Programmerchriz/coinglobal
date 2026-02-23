import Image from 'next/image';

import { TrendingDown, TrendingUp } from 'lucide-react';

import { fetcher } from '@/lib/coingecko.actions';
import { cn, formatCurrency, formatPercentage, trendingClasses } from '@/lib/utils';

import DataTable from '@/components/all/DataTable';
import CandlestickChart from '@/components/all/CandlestickChart';
import CurrencyConverter from '@/components/coin/CurrencyConverter';
import CoinDetailCard from '@/components/coin/CoinDetailCard';
import ExchangeListings from '@/components/coin/ExchangeListings';
import TopMovers from '@/components/coin/TopMovers';
import Error from './error';

const recentTradesData = [
  {
    id: '1',
    price: '$87,490.13',
    amount: '0.0457',
    value: '$4,000.75',
    type: 'Buy',
    time: '7 min',
  },
  {
    id: '2',
    price: '$87,475.44',
    amount: '0.0572',
    value: '$5,000.11',
    type: 'Buy',
    time: '7 min',
  },
  {
    id: '3',
    price: '$87,470.06',
    amount: '0.0000',
    value: '$4.35',
    type: 'Sell',
    time: '10 min',
  },
  {
    id: '4',
    price: '$87,472.46',
    amount: '0.0001',
    value: '$5.25',
    type: 'Buy',
    time: '10 min',
  },
];

const recentTradesColumns: DataTableColumn<RecentTrade>[] = [
  {
    header: 'Price',
    cell: (row) => <span className="font-medium">{row.price}</span>,
  },
  {
    header: 'Amount',
    cell: (row) => <span className="font-medium">{row.amount}</span>,
  },
  {
    header: 'Value',
    cell: (row) => <span className="font-medium">{row.value}</span>,
  },
  {
    header: 'Buy/Sell',
    cell: (row) => (
      <b className={row.type === 'Buy' ? 'text-[#22C55E]' : 'text-[#EF4444]'}>{row.type}</b>
    ),
  },
  {
    header: 'Time',
    cell: (row) => row.time,
  },
];

const Coin = async ({ params }: CoinPageProps) => {
  const { id } = await params;
  if (!id) return <Error />;

  const isTrendingUp = (value: number) => value > 0;

  let coin: CoinDetailsData, coinOHLCData: OHLCData[];

  try {
    [coin, coinOHLCData] = await Promise.all([
      fetcher<CoinDetailsData>(`/coins/${id}/`),

      fetcher<OHLCData[]>(`/coins/${id}/ohlc`, {
        vs_currency: 'usd',
        days: 1,
        // interval: 'hourly',
        precision: 'full',
      }),
    ]);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return <Error />;
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

  const coinTickers: Ticker[] = coin.tickers;

  return (
    <section className="min-h-screen bg-[#0B0F19] text-white px-4 py-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Coin Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
                <Image src={coin.image.large} alt={` Logo`} width={32} height={32} />
              </div>

              <h1 className="text-2xl font-semibold">
                {`${id.slice(0, 1).toUpperCase()}${id.slice(1)}`}
              </h1>

              <span
                className={cn(
                  'px-2 py-1 text-xs rounded-lg bg-white/5 flex gap-1 items-center',
                  trendingClasses(coin.market_data.price_change_percentage_24h).textClass
                )}
              >
                {formatPercentage(coin.market_data.price_change_percentage_24h)}
                {isTrendingUp(coin.market_data.price_change_percentage_24h) ? (
                  <TrendingUp
                    width={16}
                    height={16}
                    className={cn(
                      trendingClasses(coin.market_data.price_change_percentage_24h).textClass
                    )}
                  />
                ) : (
                  <TrendingDown
                    width={16}
                    height={16}
                    className={cn(
                      trendingClasses(coin.market_data.price_change_percentage_24h).textClass
                    )}
                  />
                )}{' '}
                (24h)
              </span>
            </div>

            <div className="text-4xl font-bold">
              {formatCurrency(coin.market_data.current_price.usd)}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 mt-4 items-center">
              <div className="rounded-lg p-4">
                <p className="text-sm text-white/50">Today</p>
                <div className="flex gap-1 items-center">
                  <p
                    className={cn(
                      'font-semibold',
                      trendingClasses(coin.market_data.price_change_percentage_24h).textClass
                    )}
                  >
                    {formatPercentage(coin.market_data.price_change_percentage_24h)}
                  </p>
                  {isTrendingUp(coin.market_data.price_change_percentage_24h) ? (
                    <TrendingUp
                      width={16}
                      height={16}
                      className={cn(
                        trendingClasses(coin.market_data.price_change_percentage_24h).textClass
                      )}
                    />
                  ) : (
                    <TrendingDown
                      width={16}
                      height={16}
                      className={cn(
                        trendingClasses(coin.market_data.price_change_percentage_24h).textClass
                      )}
                    />
                  )}
                </div>
              </div>

              <div className="rounded-lg p-4">
                <p className="text-sm text-white/50">30 Days</p>
                <div className="flex gap-1 items-center">
                  <p
                    className={cn(
                      'font-semibold',
                      trendingClasses(coin.market_data.price_change_percentage_30d).textClass
                    )}
                  >
                    {formatPercentage(coin.market_data.price_change_percentage_30d)}
                  </p>
                  {isTrendingUp(coin.market_data.price_change_percentage_30d) ? (
                    <TrendingUp
                      width={16}
                      height={16}
                      className={cn(
                        trendingClasses(coin.market_data.price_change_percentage_30d).textClass
                      )}
                    />
                  ) : (
                    <TrendingDown
                      width={16}
                      height={16}
                      className={cn(
                        trendingClasses(coin.market_data.price_change_percentage_30d).textClass
                      )}
                    />
                  )}
                </div>
              </div>

              <div className="rounded-lg p-4">
                <p className="text-sm text-white/50">Price Change (24h)</p>
                <p
                  className={cn(
                    'font-semibold',
                    trendingClasses(coin.market_data.price_change_24h_in_currency.usd).textClass
                  )}
                >
                  {formatCurrency(coin.market_data.price_change_24h_in_currency.usd)}
                </p>
              </div>
            </div>
          </div>

          {/* Right: BTC Converter */}
          <CurrencyConverter
            symbol={coin.symbol}
            image={coin.image.large}
            currencies={currencies}
            currenciesObj={currenciesObj}
          />
        </div>

        {/* Chart + Coin Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-[#111827] border border-white/5 rounded-2xl lg:p-4 shadow-xl">
            {/* Chart Placeholder */}
            <CandlestickChart data={coinOHLCData} coinId={coin.id}>
              <div className="header pt-2">
                <h3 className="font-semibold">Trend Overview</h3>
              </div>
            </CandlestickChart>
          </div>

          {/* Coin Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Coin Details</h3>
            <CoinDetailCard coinDetailsArray={coinDetailsArray} />
          </div>
        </div>

        {/* Exchange Listings */}
        <div
          id="coins-page"
          className="custom-scrollbar py-3 grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6 px-0 custom-scrollbar"
        >
          <ExchangeListings tickers={coinTickers} />
          <div className="lg:col-span-1">
            <TopMovers />
          </div>
        </div>

        {/* Recent Trades */}
        <div
          id="coins-page"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6 px-0 pr-0 custom-scrollbar"
        >
          {/* Recent Trades - 2/3 */}
          <div className="lg:col-span-2 custom-scrollbar">
            <h4 className="text-xl md:text-3xl font-semibold mb-2 text-white">Recent Trades</h4>

            <DataTable
              data={recentTradesData}
              columns={recentTradesColumns}
              rowKey={(row) => row.id}
              tableClassName="coins-table"
              headerClassName="py-3!"
              bodyCellClassName="py-7!"
            />
          </div>

          {/* Top Movers - 1/3 */}
          <div className="lg:col-span-1"></div>
        </div>
      </div>
    </section>
  );
};

export default Coin;
