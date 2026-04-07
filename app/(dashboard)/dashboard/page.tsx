
import { Suspense } from "react";

import { getWatchlistIds } from "@/lib/actions/watchlist-actions";
import { getCoins } from '@/lib/api/coins';

import DashboardClientPage from '@/app/(dashboard)/dashboard/DashboardClient';
import Loading from './loading';

export default async function Dashboard() {
  const currentPage = 0;
  const perPage: number = 0;

  const [allCoins, watchlistCoinIds] = await Promise.all([
    getCoins(perPage, currentPage),
    getWatchlistIds(),
  ]);
  
  return (
    <Suspense fallback={<Loading />}>
      <DashboardClientPage
        allCoins={allCoins}
        watchlistCoinIds={watchlistCoinIds}
      />
    </Suspense>
  );
};
