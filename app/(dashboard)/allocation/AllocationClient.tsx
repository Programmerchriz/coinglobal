"use client";

import { motion } from "framer-motion";
import { PieChart, Wallet, TrendingUp } from "lucide-react";

import PortfolioSummary from "@/components/allocation/PortfolioSummary";
import AllocationChart from "@/components/allocation/AllocationChart";
import AssetTable from "@/components/allocation/AssetTable";

export default function AllocationClient() {
  return (
    <div className="space-y-8">

      {/* Page Header */}

      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold text-(--text-primary)">
          Asset Allocation
        </h1>

        <div className="flex items-center gap-2 text-(--color-60)">
          <PieChart size={18} />
          <span className="text-sm">Portfolio Breakdown</span>
        </div>
      </div>

      {/* Portfolio Summary */}

      <PortfolioSummary />

      {/* Allocation + Chart */}

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:col-span-3"
        >
          <AssetTable />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="xl:col-span-2"
        >
          <AllocationChart />
        </motion.div>

      </div>

    </div>
  );
};
