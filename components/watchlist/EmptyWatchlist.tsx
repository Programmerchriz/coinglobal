"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

export default function EmptyWatchlist() {

  return (
    <div className="w-full h-72 lg:h-96 rounded-2xl border flex flex-col items-center justify-center bg-(--bg-surface) border-(--border-standard)">
      <div className="flex flex-col items-center gap-4">
        <div className="w-20 h-20 rounded-full flex items-center justify-center bg-linear-to-br from-purple-500/20 to-pink-500/20">
          <Heart size={40} className="text-(--color-primary)" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-(--text-primary) mb-2">
            Your watchlist is empty
          </h3>
          <p className="text-(--color-60) text-sm mb-6">
            {`Start building your crypto watchlist by adding coins you're interested in.`}
          </p>
        </div>
        <Link
          href="/markets"
          className="px-6 py-2 rounded-lg text-sm font-medium text-white transition-all bg-(--color-primary) hover:bg-(--color-primary-hover)"
        >
          Explore Markets
        </Link>
      </div>
    </div>
  );
};