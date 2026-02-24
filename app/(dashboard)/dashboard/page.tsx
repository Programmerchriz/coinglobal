
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import DashboardClientPage from '@/app/(dashboard)/dashboard/DashboardClient';

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return;

  return (
    <DashboardClientPage
      session = {session}
    />
  );
};
