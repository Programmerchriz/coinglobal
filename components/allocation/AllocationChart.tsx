"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const data = [
  { name: "BTC", value: 40 },
  { name: "ETH", value: 25 },
  { name: "SOL", value: 15 },
  { name: "BNB", value: 10 },
  { name: "Other", value: 10 },
];

const COLORS = [
  "#F7931A",
  "#627EEA",
  "#00FFA3",
  "#F3BA2F",
  "#6B7280",
];

export default function AllocationChart() {
  return (
    <Card className="bg-(--bg-surface) border-(--border-standard) rounded-2xl shadow-xl h-full">

      <CardContent className="p-6">

        <h3 className="font-semibold text-lg text-(--text-primary) mb-6">
          Portfolio Distribution
        </h3>

        <div className="h-72">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={data}
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

            </PieChart>
          </ResponsiveContainer>

        </div>

      </CardContent>

    </Card>
  );
};
