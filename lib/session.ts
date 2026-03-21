
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

// export const getServerSession = async () => {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   return session;
// };

export async function requireSession() {
  const session = await getServerSession();

  if (!session) {
    redirect("/signin");
  }

  return session;
};
