
"use server";

import { prisma } from "../prisma";
import { getServerSession } from "../session";

export async function updateUsername(username: string) {
  const session = await getServerSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { username },
  });
};
