
"use server";

import { prisma } from "../prisma";
import { getServerSession, unauthorizedSession } from "../session";

export async function updateTheme(theme: "light" | "dark") {
  const session = await unauthorizedSession();

  await prisma.user.update({
    where: { id: session.user.id },
    data: { theme },
  });
};

export async function getTheme() {
  const session = await getServerSession();

  if (!session?.user?.id) return ("dark");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { theme: true },
  });

  return (user?.theme ?? "dark");
};
