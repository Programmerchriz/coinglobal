
import { getServerSession } from '@/lib/session';

import DashboardClientPage from '@/app/(dashboard)/dashboard/DashboardClient';

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) return;

  return (
    <DashboardClientPage
      session = {session}
    />
  );
};
