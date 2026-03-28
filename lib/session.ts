
"use server";

import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export const getServerSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session ?? null;
});

export async function requireSession() {
  const session = await getServerSession();

  if (!session) {
    redirect("/signin");
  }

  return session;
};

export const unauthorizedSession = async () => {
  const session = await getServerSession();
  if (!session?.user?.id) throw new Error("Unauthorized");

  return (session);
};
