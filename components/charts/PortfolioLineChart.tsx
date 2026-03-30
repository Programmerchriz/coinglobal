"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Mon", value: 24000 },
  { date: "Tue", value: 25500 },
  { date: "Wed", value: 23000 },
  { date: "Thu", value: 26000 },
  { date: "Fri", value: 28000 },
  { date: "Sat", value: 27000 },
  { date: "Sun", value: 26029 },
];

export default function PortfolioLineChart() {
  return (
    <div className="w-full h-52">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="var(--color-50)" />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
