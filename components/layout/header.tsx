
import { getServerSession } from '@/lib/session';
import { getTrendingCoins } from '@/lib/api/trendingCoins';

import HeaderClient from "./HeaderClient";

export default async function Header() {
  let session = null;
  
  try {
    session = await getServerSession();
  } catch (e) {
    console.error("Error:", e);
  };

  return (
    <HeaderClient session={session} />
  );
};
