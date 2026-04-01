
import { getServerSession } from '@/lib/session';
import { getTrendingCoins } from '@/lib/api/trendingCoins';
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const session = await getServerSession();
  const trendingCoins = session ? (await getTrendingCoins()).coins : [];

  return (
    <HeaderClient session={session} initialTrendingCoins={trendingCoins} />
  );
};
