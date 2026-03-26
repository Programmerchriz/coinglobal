
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { TrendingUp, TrendingDown, Bell, ChevronRightIcon } from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function DashboardClientPage() {
  const router = useRouter();

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-(--text-primary)">
          Dashboard Overview
        </h1>

        <Link href="/notifications">
          <Bell className="text-(--color-60)" />
        </Link>
      </div>

      {/* Net Worth Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-(--bg-surface) border-(--border-standard) rounded-2xl shadow-xl">
          <CardContent className="p-6">
            <p className="text-sm text-(--color-50)">Total Net Worth</p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-(--text-primary)">
              $782,041.30
            </h2>
            <p className="text-xs text-(--color-50) mt-1">
              ≈ 13.2752 BTC
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Profit & Loss Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <Card className="xl:col-span-2 bg-(--bg-surface) border-(--border-standard) rounded-2xl">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h3 className="font-semibold text-lg text-(--text-primary)">
                Profit & Loss
              </h3>

              <div className="flex flex-wrap gap-2 text-xs">
                {["D", "M", "Y", "All"].map((item) => (
                  <Button
                    key={item}
                    variant="outline"
                    className="border-(--border-input) text-(--color-70) hover:bg-(--color-outline-hover) rounded-lg"
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>

            <div className="h-40 sm:h-56 bg-(--bg-indigo-10) rounded-xl" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6">
          <Card className="bg-(--bg-surface) border-(--border-standard) rounded-2xl">
            <CardContent className="p-6">
              <p className="text-sm text-(--color-50)">
                Last Month Profit
              </p>

              <h4 className="text-lg sm:text-xl font-semibold mt-1 text-(--text-primary)">
                $2,041.30
              </h4>

              <div className="flex items-center gap-1 text-(--color-success) text-sm mt-1">
                <TrendingUp size={16} /> +12%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-(--bg-surface) border-(--border-standard) rounded-2xl">
            <CardContent className="p-6">
              <p className="text-sm text-(--color-50)">
                Last Month Loss
              </p>

              <h4 className="text-lg sm:text-xl font-semibold mt-1 text-(--text-primary)">
                $420.30
              </h4>

              <div className="flex items-center gap-1 text-(--color-error) text-sm mt-1">
                <TrendingDown size={16} /> -4%
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Watchlist */}
      <Card className="bg-(--bg-surface) border-(--border-standard) rounded-2xl mt-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h3 className="font-semibold text-lg text-(--text-primary)">
              Watchlist
            </h3>

            <Input
              placeholder="Search by name or symbol"
              className="w-full sm:w-64 bg-(--bg-sidebar) border-(--border-input) text-(--text-primary) rounded-xl"
            />
          </div>

          <div className="space-y-3">
            {["Bitcoin", "Ethereum", "Solana"].map((coin, i) => (
              <div
                key={i}
                className="flex justify-between p-3 bg-(--bg-sidebar) rounded-xl hover:bg-(--color-5) transition"
              >
                <span className="text-(--text-primary)">
                  {coin}
                </span>

                <span className="text-(--color-60)">
                  $--
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center mt-6">
            <button
              onClick={() => router.push("/watchlist")}
              className={cn(
                'btn-primary group px-6 py-3 hover:bg-(--color-primary-hover) active:scale-95 font-medium rounded-xl transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-indigo-600/30 hover:-translate-y-1 hover:cursor-pointer'
              )}
            >
              <span>Full Watchlist</span>
              <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
