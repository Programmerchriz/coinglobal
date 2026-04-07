
"use server";

import { prisma } from "../prisma";
import { unauthorizedSession } from "../session";

export async function addToWatchlist(coinId: string) {
  const session = await unauthorizedSession();

  const existing = await prisma.watchlist.findUnique({
    where: {
      userId_coinId: {
        userId: session.user.id,
        coinId,
      },
    },
  });

  if (existing) return ({ saved: true });

  await prisma.watchlist.create({
    data: {
      userId: session.user.id,
      coinId,
    },
  });

  return ({ saved: true });
};

export async function removeFromWatchlist(coinId: string) {
  const session = await unauthorizedSession();

  await prisma.watchlist.deleteMany({
    where: {
      userId: session.user.id,
      coinId,
    },
  });

  return ({ saved: false });
};

export async function toggleWatchlist(coinId: string) {
  const session = await unauthorizedSession();

  const existing = await prisma.watchlist.findUnique({
    where: {
      userId_coinId: {
        userId: session.user.id,
        coinId,
      },
    },
  });

  if (existing) {
    await prisma.watchlist.delete({
      where: {
        userId_coinId: {
          userId: session.user.id,
          coinId,
        },
      },
    });

    return ({ saved: false });
  }

  await prisma.watchlist.create({
    data: {
      userId: session.user.id,
      coinId,
    },
  });

  return ({ saved: true });
};

export async function clearWatchlist() {
  const session = await unauthorizedSession();

  await prisma.watchlist.deleteMany({
    where: {
      userId: session.user.id,
    },
  });
};

export async function getWatchlistIds() {
  const session = await unauthorizedSession();

  const watchListEntries = await prisma.watchlist.findMany({
    where: { userId: session.user.id },
    select: { coinId: true },
    orderBy: { createdAt: 'desc' },
  });

  return (watchListEntries.map(entry => entry.coinId));
};

export async function isInWatchlist(coinId: string) {
  const session = await unauthorizedSession();

  const existing = await prisma.watchlist.findUnique({
    where: {
      userId_coinId: {
        userId: session.user.id,
        coinId,
      },
    },
    select: {
      id: true,
    },
  });

  return (!!existing);
};
