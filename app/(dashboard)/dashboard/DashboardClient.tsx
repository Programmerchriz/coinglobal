
"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown, Bell } from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardClientPage() {
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">
          Dashboard Overview
        </h1>

        <Link href="/notifications">
          <Bell className="text-white/60" />
        </Link>
      </div>

      {/* Net Worth Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-[#111827] border-white/5 rounded-2xl shadow-xl">
          <CardContent className="p-6">
            <p className="text-sm text-white/50">Total Net Worth</p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1">
              $782,041.30
            </h2>
            <p className="text-xs text-white/50 mt-1">
              ≈ 13.2752 BTC
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Profit & Loss Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <Card className="xl:col-span-2 bg-[#111827] border-white/5 rounded-2xl">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h3 className="font-semibold text-lg">
                Profit & Loss
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {["D", "M", "Y", "All"].map((item) => (
                  <Button
                    key={item}
                    variant="outline"
                    className="border-white/10 text-white/70 hover:bg-white/10 rounded-lg"
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
            <div className="h-40 sm:h-56 bg-gradient-to-r from-indigo-600/20 to-transparent rounded-xl" />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-6">
          <Card className="bg-[#111827] border-white/5 rounded-2xl">
            <CardContent className="p-6">
              <p className="text-sm text-white/50">
                Last Month Profit
              </p>
              <h4 className="text-lg sm:text-xl font-semibold mt-1">
                $2,041.30
              </h4>
              <div className="flex items-center gap-1 text-green-500 text-sm mt-1">
                <TrendingUp size={16} /> +12%
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#111827] border-white/5 rounded-2xl">
            <CardContent className="p-6">
              <p className="text-sm text-white/50">
                Last Month Loss
              </p>
              <h4 className="text-lg sm:text-xl font-semibold mt-1">
                $420.30
              </h4>
              <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
                <TrendingDown size={16} /> -4%
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Watchlist */}
      <Card className="bg-[#111827] border-white/5 rounded-2xl mt-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <h3 className="font-semibold text-lg">Watchlist</h3>
            <Input
              placeholder="Search by name or symbol"
              className="w-full sm:w-64 bg-[#0F1623] border-white/10 text-white rounded-xl"
            />
          </div>

          <div className="space-y-3">
            {["Bitcoin", "Ethereum", "Solana"].map((coin, i) => (
              <div
                key={i}
                className="flex justify-between p-3 bg-[#0F1623] rounded-xl hover:bg-white/5 transition"
              >
                <span>{coin}</span>
                <span className="text-white/60">$--</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
