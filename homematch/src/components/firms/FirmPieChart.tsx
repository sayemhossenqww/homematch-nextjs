"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";

interface FirmPieChartProps {
  data: { hdb: number; condo: number; landed: number; commercial: number };
}

const COLORS = ["#c8881f", "#60a5fa", "#34d399", "#a78bfa"];

export default function FirmPieChart({ data }: FirmPieChartProps) {
  const chartData = [
    { name: "HDB", value: data.hdb },
    { name: "Condo", value: data.condo },
    { name: "Landed", value: data.landed },
    { name: "Commercial", value: data.commercial },
  ].filter(item => item.value > 0);

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <RechartsTooltip 
            formatter={(value) => [`${value ?? 0}%`, "Projects"]}
            contentStyle={{ backgroundColor: "#111827", borderColor: "#374151", borderRadius: "8px", color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
