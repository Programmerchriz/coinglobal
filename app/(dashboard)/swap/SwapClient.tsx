"use client";

import { motion } from "framer-motion";
import { ArrowDownUp } from "lucide-react";

import SwapCard from "@/components/swap/SwapCard";

export default function SwapClient() {
  return (
    <div className="max-w-xl mx-auto w-full space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold text-(--text-primary)">
          Swap
        </h1>
      </div>

      {/* Swap UI */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <SwapCard />
      </motion.div>

    </div>
  );
};
