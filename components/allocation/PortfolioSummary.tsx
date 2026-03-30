"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function PortfolioSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

      <Card className="bg-(--bg-surface) border-(--border-standard) rounded-2xl shadow-xl">
        <CardContent className="p-6">
          <p className="text-sm text-(--color-50)">Total Portfolio</p>

          <h2 className="text-2xl font-bold mt-1 text-(--text-primary)">
            $156,905.89
          </h2>

          <p className="text-xs text-(--color-50)">
            Across 12 Assets
          </p>
        </CardContent>
      </Card>

      <Card className="bg-(--bg-surface) border-(--border-standard) rounded-2xl">
        <CardContent className="p-6">
          <p className="text-sm text-(--color-50)">Top Asset</p>

          <h3 className="text-lg font-semibold mt-1 text-(--text-primary)">
            Bitcoin
          </h3>

          <p className="text-(--color-success) text-sm mt-1 flex gap-1 items-center">
            <TrendingUp size={16} /> 38.4%
          </p>
        </CardContent>
      </Card>

      <Card className="bg-(--bg-surface) border-(--border-standard) rounded-2xl">
        <CardContent className="p-6">
          <p className="text-sm text-(--color-50)">Diversification</p>

          <h3 className="text-lg font-semibold mt-1 text-(--text-primary)">
            Balanced
          </h3>

          <p className="text-xs text-(--color-50)">
            12 Assets
          </p>
        </CardContent>
      </Card>

    </div>
  );
};
