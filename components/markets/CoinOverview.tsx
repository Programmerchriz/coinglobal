import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import CandlestickChart from '@/components/all/CandlestickChart';
import { getTheme } from '@/lib/actions/theme-actions';
import { getCoin } from '@/lib/api/coin';

const CoinOverview = async () => {
  const theme = await getTheme();
  const coinId = "bitcoin";
  const { coin, coinOHLCData } = await getCoin(coinId);

  return (
    <div id="coin-overview" className="animate-fade-in-up">
      <CandlestickChart data={coinOHLCData} coinId={coinId} theme={theme}>
        <div className="header pt-2 flex items-center gap-4">
          <Image src={coin.image.large} alt={coin.name} width={56} height={56} />
          <div className="info">
            <p className="">
              {coin.name} / {coin.symbol.toUpperCase()}
            </p>
            
            <h1 className="text-3xl font-bold">
              {formatCurrency(coin.market_data.current_price.usd)}
            </h1>
          </div>
        </div>
      </CandlestickChart>
    </div>
  );
};

export default CoinOverview;
