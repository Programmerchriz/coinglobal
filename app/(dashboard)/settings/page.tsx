
import { Suspense } from "react";
import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/session";
import SettingsClient from "./SettingsClient";
import Loading from "./loading";

export default async function SettingsPage() {
  const session = await getServerSession();
  if (!session) redirect("/signin");

  return (
    <Suspense fallback={<Loading />}>
      <SettingsClient
        user={session.user}
      />
    </Suspense>
  );
};
