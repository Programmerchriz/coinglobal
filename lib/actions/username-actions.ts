
"use server";

import { prisma } from "../prisma";
import { unauthorizedSession } from "../session";

export async function updateUsername(username: string) {
  const session = await unauthorizedSession();

  await prisma.user.update({
    where: { id: session.user.id },
    data: { username },
  });
};
