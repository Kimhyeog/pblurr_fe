// src/components/DonutChart.tsx

"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type DonutChartProps = {
  label: string;
  value: number;
  max: number;
  color: string;
};

function DonutChart({ label, value, max, color }: DonutChartProps) {
  const data = [
    { name: label, value: value, fill: color },
    { name: "남은 범위", value: Math.max(0, max - value), fill: "#E5E7EB" },
  ];

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width={150} height={150}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            startAngle={90}
            endAngle={-270}
            cornerRadius={20}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <p className="mt-2 font-semibold">{label}</p>
    </div>
  );
}

export default DonutChart;
