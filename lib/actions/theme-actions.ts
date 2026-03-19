
"use server";

import { prisma } from "../prisma";
import { getServerSession } from "../session";

export async function updateTheme(theme: "light" | "dark") {
  const session = await getServerSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

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
