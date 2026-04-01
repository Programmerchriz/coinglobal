"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
};

const markets = [
  { name: "ETH / USDT", price: "$3,865.12", change: "+1.39%" },
  { name: "SOL / USDT", price: "$229.56", change: "+2.81%" },
  { name: "MATIC / USDT", price: "$0.72", change: "-7.12%" },
  { name: "TUSD / USDT", price: "$1.02", change: "+0.72%" },
];

export default function TradeClient() {
  const [side, setSide] = useState<"buy" | "sell">("buy");

  return (
    <motion.div
      className="w-full h-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="space-y-6">
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Image
              src="/coin-glob.png"
              alt="BTC"
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />

            <div>
              <h1 className="text-xl font-semibold text-(--text-primary)">
                BTC / USDT
              </h1>

              <div className="flex items-center gap-2 text-sm text-(--color-60)">
                <span>$97,417.05</span>

                <span className="flex items-center gap-1 text-(--color-success)">
                  <TrendingUp size={14} /> 8.74%
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
          <motion.div variants={itemVariants} className="xl:col-span-3">
            <Card className="rounded-2xl border-(--border-standard) bg-(--bg-surface) shadow-sm">
              <CardContent className="p-6">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-semibold text-(--text-primary)">
                    Price Chart
                  </h3>

                  <div className="flex flex-wrap gap-2 text-xs">
                    {["5m", "1h", "8h", "1D", "1W"].map((period) => (
                      <Button
                        key={period}
                        variant="outline"
                        className="rounded-lg border-(--border-input) text-(--color-70)"
                      >
                        {period}
                      </Button>
                    ))}
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.15 }}
                  className="h-105 rounded-xl bg-(--bg-indigo-10)"
                />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="rounded-2xl border-(--border-standard) bg-(--bg-surface) shadow-sm">
              <CardContent className="space-y-4 p-6">
                <div className="grid grid-cols-2 rounded-xl bg-(--bg-elevated) p-1">
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSide("buy")}
                    className={`rounded-lg py-2 text-sm transition-colors ${
                      side === "buy"
                        ? "bg-(--color-success) text-white"
                        : "text-(--color-60)"
                    }`}
                  >
                    Buy
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSide("sell")}
                    className={`rounded-lg py-2 text-sm transition-colors ${
                      side === "sell"
                        ? "bg-(--color-error) text-white"
                        : "text-(--color-60)"
                    }`}
                  >
                    Sell
                  </motion.button>
                </div>

                <div>
                  <p className="mb-1 text-xs text-(--color-60)">Amount</p>
                  <input
                    placeholder="0.00"
                    className="w-full rounded-xl border border-(--border-input) bg-(--bg-elevated) px-3 py-2 text-sm outline-none"
                  />
                </div>

                <div>
                  <p className="mb-1 text-xs text-(--color-60)">Leverage</p>
                  <input type="range" min={1} max={100} className="w-full" />
                  <p className="text-sm text-(--color-60)">50x</p>
                </div>

                <div>
                  <p className="mb-1 text-xs text-(--color-60)">Stop Loss</p>
                  <input
                    placeholder="0.00"
                    className="w-full rounded-xl border border-(--border-input) bg-(--bg-elevated) px-3 py-2 text-sm outline-none"
                  />
                </div>

                <div>
                  <p className="mb-1 text-xs text-(--color-60)">Take Profit</p>
                  <input
                    placeholder="0.00"
                    className="w-full rounded-xl border border-(--border-input) bg-(--bg-elevated) px-3 py-2 text-sm outline-none"
                  />
                </div>

                <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.99 }}>
                  <Button
                    className={`w-full rounded-xl py-3 font-medium ${
                      side === "buy"
                        ? "bg-(--color-success)"
                        : "bg-(--color-error)"
                    }`}
                  >
                    {side === "buy" ? "Place Buy" : "Place Sell"}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4"
        >
          {markets.map((coin, index) => (
            <motion.div
              key={coin.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 + index * 0.08 }}
            >
              <Card className="rounded-2xl border-(--border-standard) bg-(--bg-surface) shadow-sm">
                <CardContent className="p-4">
                  <p className="text-sm text-(--color-60)">{coin.name}</p>

                  <h4 className="text-lg font-semibold text-(--text-primary)">
                    {coin.price}
                  </h4>

                  <p
                    className={`text-xs ${
                      coin.change.includes("-")
                        ? "text-(--color-error)"
                        : "text-(--color-success)"
                    }`}
                  >
                    {coin.change}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
