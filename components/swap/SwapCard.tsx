"use client";

import { useState } from "react";
import { ArrowDownUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TokenSelector from "./TokenSelector";

export default function SwapCard() {
  const [from, setFrom] = useState("USDC");
  const [to, setTo] = useState("ETH");
  const [amount, setAmount] = useState("");

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <Card className="bg-(--bg-surface) border-(--border-standard) rounded-2xl shadow-xl">
      <CardContent className="p-6 space-y-4">

        {/* FROM */}
        <div className="p-4 bg-(--bg-sidebar) rounded-xl space-y-3">
          <div className="flex justify-between text-sm text-(--color-50)">
            <span>From</span>
            <span>Balance: 0.00</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <input
              type="number"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-2xl outline-none w-full text-(--text-primary)"
            />

            <TokenSelector value={from} onChange={setFrom} />
          </div>

          {/* Quick % buttons */}
          <div className="flex gap-2 mt-2">
            {["25%", "50%", "75%", "Max"].map((p) => (
              <button
                key={p}
                className="text-xs px-3 py-1 rounded-lg bg-(--color-5) hover:bg-(--color-10)"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* SWITCH */}
        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="p-2 rounded-full bg-(--bg-elevated) hover:scale-110 transition"
          >
            <ArrowDownUp size={18} />
          </button>
        </div>

        {/* TO */}
        <div className="p-4 bg-(--bg-sidebar) rounded-xl space-y-3">
          <div className="flex justify-between text-sm text-(--color-50)">
            <span>To</span>
            <span>Balance: 0.00</span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <input
              type="text"
              placeholder="0"
              disabled
              className="bg-transparent text-2xl outline-none w-full text-(--text-primary)"
            />

            <TokenSelector value={to} onChange={setTo} />
          </div>
        </div>

        {/* INFO */}
        <div className="text-sm text-(--color-50) flex justify-between">
          <span>Rate</span>
          <span>1 {from} ≈ 0.00032 {to}</span>
        </div>

        <div className="text-sm text-(--color-50) flex justify-between">
          <span>Network Fee</span>
          <span>$0.12</span>
        </div>

        {/* BUTTON */}
        <Button className="w-full mt-4 btn-primary py-3 text-base">
          Swap
        </Button>

      </CardContent>
    </Card>
  );
};
