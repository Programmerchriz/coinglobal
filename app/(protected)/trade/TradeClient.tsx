"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function TradeClient() {
  const [side, setSide] = useState<"buy" | "sell">("buy");

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/coin-glob.png"
            alt="BTC"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
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
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:col-span-3"
        >
          <Card className="bg-(--bg-surface) border-(--border-standard) rounded-2xl">
            <CardContent className="p-6">

              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-(--text-primary)">
                  Price Chart
                </h3>

                <div className="flex gap-2 text-xs">
                  {["5m", "1h", "8h", "1D", "1W"].map((p) => (
                    <Button
                      key={p}
                      variant="outline"
                      className="border-(--border-input) text-(--color-70) rounded-lg"
                    >
                      {p}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Chart Placeholder */}
              <div className="h-[420px] rounded-xl bg-(--bg-indigo-10)" />

            </CardContent>
          </Card>
        </motion.div>

        {/* Trade Panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card className="bg-(--bg-surface) border-(--border-standard) rounded-2xl">
            <CardContent className="p-6 space-y-4">

              {/* Buy Sell Switch */}
              <div className="grid grid-cols-2 bg-(--bg-elevated) rounded-xl p-1">

                <button
                  onClick={() => setSide("buy")}
                  className={`py-2 rounded-lg text-sm ${
                    side === "buy"
                      ? "bg-(--color-success) text-white"
                      : "text-(--color-60)"
                  }`}
                >
                  Buy
                </button>

                <button
                  onClick={() => setSide("sell")}
                  className={`py-2 rounded-lg text-sm ${
                    side === "sell"
                      ? "bg-(--color-error) text-white"
                      : "text-(--color-60)"
                  }`}
                >
                  Sell
                </button>

              </div>

              {/* Amount */}
              <div>
                <p className="text-xs text-(--color-60) mb-1">
                  Amount
                </p>

                <input
                  placeholder="0.00"
                  className="w-full bg-(--bg-elevated) border border-(--border-input) rounded-xl px-3 py-2 text-sm outline-none"
                />
              </div>

              {/* Leverage */}
              <div>
                <p className="text-xs text-(--color-60) mb-1">
                  Leverage
                </p>

                <input
                  type="range"
                  min={1}
                  max={100}
                  className="w-full"
                />

                <p className="text-sm text-(--color-60)">
                  50x
                </p>
              </div>

              {/* Stop Loss */}
              <div>
                <p className="text-xs text-(--color-60) mb-1">
                  Stop Loss
                </p>

                <input
                  placeholder="0.00"
                  className="w-full bg-(--bg-elevated) border border-(--border-input) rounded-xl px-3 py-2 text-sm outline-none"
                />
              </div>

              {/* Take Profit */}
              <div>
                <p className="text-xs text-(--color-60) mb-1">
                  Take Profit
                </p>

                <input
                  placeholder="0.00"
                  className="w-full bg-(--bg-elevated) border border-(--border-input) rounded-xl px-3 py-2 text-sm outline-none"
                />
              </div>

              {/* Execute */}
              <Button
                className={`w-full py-3 rounded-xl font-medium ${
                  side === "buy"
                    ? "bg-(--color-success)"
                    : "bg-(--color-error)"
                }`}
              >
                {side === "buy" ? "Place Buy" : "Place Sell"}
              </Button>

            </CardContent>
          </Card>
        </motion.div>

      </div>

      {/* Market Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {[
          { name: "ETH / USDT", price: "$3,865.12", change: "+1.39%" },
          { name: "SOL / USDT", price: "$229.56", change: "+2.81%" },
          { name: "MATIC / USDT", price: "$0.72", change: "-7.12%" },
          { name: "TUSD / USDT", price: "$1.02", change: "+0.72%" }
        ].map((coin, i) => (

          <Card
            key={i}
            className="bg-(--bg-surface) border-(--border-standard) rounded-2xl"
          >
            <CardContent className="p-4">

              <p className="text-sm text-(--color-60)">
                {coin.name}
              </p>

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

        ))}

      </div>

    </div>
  );
};
