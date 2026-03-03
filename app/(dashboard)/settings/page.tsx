
import { getServerSession } from "@/lib/session";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const session = await getServerSession();
  if (!session) return null;

  return (
    <SettingsClient
      user={session.user}
    />
  );
};
