"use server";

import { prisma } from "../prisma";
import { unauthorizedSession } from "../session";

export async function saveUserAvatar(publicUrl: string) {
  const session = await unauthorizedSession();

  if (!publicUrl || typeof publicUrl !== "string") {
    throw new Error("Invalid image URL");
  };

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: { image: publicUrl },
  });

  return ({ imageUrl: updated.image });
};
