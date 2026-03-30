"use client";

import { Card, CardContent } from "@/components/ui/card";
import DataTable from "@/components/all/DataTable";
import { columns } from "./columns";

type Asset = {
  name: string;
  symbol: string;
  value: string;
  allocation: string;
};

const assets: Asset[] = [
  { name: "Bitcoin", symbol: "BTC", value: "$62,500", allocation: "40%" },
  { name: "Ethereum", symbol: "ETH", value: "$39,000", allocation: "25%" },
  { name: "Solana", symbol: "SOL", value: "$23,500", allocation: "15%" },
  { name: "BNB", symbol: "BNB", value: "$15,690", allocation: "10%" },
  { name: "Other", symbol: "-", value: "$16,200", allocation: "10%" },
];

export default function AssetTable() {
  return (
    <Card className="bg-(--bg-surface) border-(--border-standard) rounded-2xl shadow-xl">
      <CardContent className="p-6">

        <h3 className="font-semibold text-lg text-(--text-primary) mb-6">
          Asset Breakdown
        </h3>

        <div className="overflow-x-auto">
          <DataTable
            data={assets}
            columns={columns}
            rowKey={(row, i) => `${row.symbol}-${i}`}
            tableClassName="min-w-full"
            headerClassName="bg-transparent"
            bodyCellClassName="py-3"
          />
        </div>

      </CardContent>
    </Card>
  );
};
