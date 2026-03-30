"use client";

import { ChevronDown } from "lucide-react";

const TOKENS = ["BTC", "ETH", "USDC", "SOL"];

export default function TokenSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 bg-(--bg-elevated) px-3 py-2 rounded-xl cursor-pointer hover:bg-(--bg-hover)">
      <span className="font-medium">{value}</span>
      <ChevronDown size={16} />
    </div>
  );
};
