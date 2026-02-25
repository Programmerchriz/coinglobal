
import { redirect } from "next/navigation";
import { getServerSession } from '@/lib/session';

import AuthClientPage from "../auth-client";

export default async function SignUpPage() {
  const session = await getServerSession();

  if (session) redirect("/dashboard");

  return <AuthClientPage defaultMode="signup" />;
}
