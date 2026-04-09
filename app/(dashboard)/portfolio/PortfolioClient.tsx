"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingDown, ShieldAlert } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PortfolioLineChart from "@/components/charts/PortfolioLineChart";
import TradingViewWidget from "@/components/charts/TradingViewWidget";

export default function PortfolioClient() {
  const [chartType, setChartType] = useState<"portfolio" | "market">("portfolio");

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold text-(--text-primary)">
          Portfolio
        </h1>

        <Button className="btn-primary px-4 py-2 text-sm">
          Deposit
        </Button>
      </div>

      {/* TOP SUMMARY */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-(--bg-surface) border-(--border-standard) rounded-2xl">
          <CardContent className="p-6 space-y-4">

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-(--color-50) text-sm">Portfolio Value</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-(--text-primary)">
                  $26,029.74
                </h2>
              </div>

              <div className="flex items-center gap-2 text-(--color-error)">
                <TrendingDown size={18} />
                <span>-15.4%</span>
              </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Stat label="Realized PnL" value="+$128,429" positive />
              <Stat label="Unrealized PnL" value="-$35,021" />
              <Stat label="Net Change" value="+$4,821" positive />
              <Stat label="Projected Growth" value="+$35,021" positive />
            </div>

          </CardContent>
        </Card>
      </motion.div>

      {/* CHART + RISK */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* CHART */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:col-span-3"
        >
          <Card className="bg-(--bg-surface) border-(--border-standard) rounded-2xl">
            <CardContent className="p-6 space-y-4">

              {/* HEADER CONTROLS */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <h3 className="font-semibold text-lg text-(--text-primary)">
                  Performance
                </h3>

                {/* TIMEFRAMES */}
                <div className="flex gap-2 text-xs">
                  {["1D", "1W", "1M", "1Y"].map((t) => (
                    <Button
                      key={t}
                      variant="outline"
                      className="border-(--border-input) text-(--color-70) rounded-lg"
                    >
                      {t}
                    </Button>
                  ))}
                </div>
              </div>

              {/* CHART TYPE TOGGLE */}
              {/* <div className="flex gap-2 text-xs">
                <Button
                  onClick={() => setChartType("portfolio")}
                  className={`rounded-lg ${
                    chartType === "portfolio"
                      ? "bg-(--color-primary) text-white hover:cursor-pointer"
                      : "bg-(--bg-sidebar)"
                  }`}
                >
                  Portfolio
                </Button>

                <Button
                  onClick={() => setChartType("market")}
                  className={`rounded-lg ${
                    chartType === "market"
                      ? "bg-(--color-primary) text-white hover:cursor-pointer"
                      : "bg-(--bg-sidebar)"
                  }`}
                >
                  Market
                </Button>
              </div> */}

              {/* CHART */}
              <div className="pt-2">
                {chartType === "portfolio" ? (
                  <PortfolioLineChart />
                ) : (
                  <TradingViewWidget />
                )}
              </div>

            </CardContent>
          </Card>
        </motion.div>

        {/* RISK SCORE */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-(--bg-surface) border-(--border-standard) rounded-2xl h-full">
            <CardContent className="p-6 space-y-4">

              <div className="flex items-center gap-2">
                <ShieldAlert size={18} className="text-(--color-warning)" />
                <h3 className="text-(--text-primary) font-semibold">
                  Risk Score
                </h3>
              </div>

              <div className="w-full h-2 bg-(--color-10) rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-(--color-error)" />
              </div>

              <div className="flex justify-between text-xs text-(--color-50)">
                <span>Low</span>
                <span>High</span>
              </div>

            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* HOLDINGS */}
      <Card className="bg-(--bg-surface) border-(--border-standard) rounded-2xl">
        <CardContent className="p-6">

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-(--text-primary)">
              Top Holdings
            </h3>

            <Button variant="outline" className="text-xs">
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {["BTC", "ETH", "SOL"].map((coin, i) => (
              <div
                key={i}
                className="flex justify-between p-3 bg-(--bg-sidebar) rounded-xl"
              >
                <span>{coin}</span>
                <span className="text-(--color-60)">$--</span>
              </div>
            ))}
          </div>

        </CardContent>
      </Card>

      {/* TRANSACTIONS */}
      <Card className="bg-(--bg-surface) border-(--border-standard) rounded-2xl">
        <CardContent className="p-6">

          <h3 className="text-lg font-semibold text-(--text-primary) mb-4">
            Recent Activity
          </h3>

          <div className="space-y-3">
            {["Received BTC", "Sent ETH", "Bought SOL"].map((tx, i) => (
              <div
                key={i}
                className="flex justify-between p-3 bg-(--bg-sidebar) rounded-xl"
              >
                <span>{tx}</span>
                <span className="text-(--color-50)">Just now</span>
              </div>
            ))}
          </div>

        </CardContent>
      </Card>

    </div>
  );
}


/* SMALL STAT COMPONENT */
function Stat({
  label,
  value,
  positive = false,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="p-3 bg-(--bg-sidebar) rounded-xl">
      <p className="text-xs text-(--color-50)">{label}</p>
      <p
        className={`font-semibold mt-1 ${
          positive ? "text-(--color-success)" : "text-(--color-error)"
        }`}
      >
        {value}
      </p>
    </div>
  );
};
