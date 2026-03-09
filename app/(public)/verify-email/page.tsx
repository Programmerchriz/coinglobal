
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/session";
import { ResendVerificationButton } from "./resend-verification-button";

export const metadata: Metadata = {
  title: "Verify Email",
};

export default async function VerifyEmailPage() {
  const session = await getServerSession();
  // if (!session) redirect("/sign-in");

  if (true) redirect("/dashboard"); // Unaccesssible

  const user = session?.user;
  if (user?.emailVerified) redirect("/dashboard");

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-(--bg-surface) text-(--text-primary) relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-(--bg-glass-indigo) rounded-full blur-3xl" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-(--bg-glass-purple) rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-(--bg-surface) border border-(--color-5) rounded-2xl shadow-2xl p-8 backdrop-blur-xl text-center space-y-6">
          <div className="space-y-3">
            <h1 className="text-2xl font-semibold">
              Verify your email
            </h1>

            <p className="text-sm text-(--color-50)">
              We’ve sent a verification link to:
            </p>

            <p className="text-sm font-medium text-(--color-primary-hover) break-all">
              {user?.email}
            </p>

            <p className="text-xs text-(--color-40)">
              Please check your inbox and click the link to activate your account.
            </p>
          </div>

          <ResendVerificationButton email={user?.email || ""} />
        </div>
      </div>
    </main>
  );
};
