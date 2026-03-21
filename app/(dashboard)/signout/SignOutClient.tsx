
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Loading from "@/components/auth/SignOutLoading";
import { signOut } from "@/lib/actions/auth-actions";

const SIGNOUT_DELAY = 1500;

export default function SignOutClient() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(async () => {
      await signOut();
      router.replace("/signin");
    }, SIGNOUT_DELAY);

    return () => clearTimeout(timer);
  }, [router]);

  return <Loading />;
};
