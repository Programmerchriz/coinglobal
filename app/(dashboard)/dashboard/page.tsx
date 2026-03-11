
import DashboardClientPage from '@/app/(dashboard)/dashboard/DashboardClient';
import { Suspense } from "react";
import Loading from './loading';


export default async function Dashboard() {
  return (
    <Suspense fallback={<Loading />}>
      <DashboardClientPage />
    </Suspense>
  );
};
