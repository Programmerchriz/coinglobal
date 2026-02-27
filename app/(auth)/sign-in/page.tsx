
import { redirect } from "next/navigation";

import { getServerSession } from '@/lib/session';
import AuthClientPage from "../auth-client";

export default async function SignInPage() {
  const session = await getServerSession();

  if (session) redirect("/dashboard");

  return <AuthClientPage defaultMode="sign-in" />;
};
