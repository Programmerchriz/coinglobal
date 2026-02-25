
import { fetcher } from '@/lib/coingecko.actions';
import { getServerSession } from '@/lib/session';

import HeaderClient from "./HeaderClient";

export default async function Header() {
  let session;
  
  try {
    session = await getServerSession();
  } catch (e) {
    console.error("Error:", e);
  };

  if (session) {
    const trending = await fetcher<{ coins: TrendingCoin[] }>('/search/trending');
    return (
      <HeaderClient trendingCoins={trending?.coins} session={session} />
    );
  }

  return (
    <HeaderClient trendingCoins={[]} session={session} />
  );
};
