
import { fetcher } from '@/lib/coingecko.actions';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import HeaderClient from "./HeaderClient";

export default async function Header() {
  let session;
  
  try {
    session = await auth.api.getSession({
      headers: await headers(),
    });
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
