// pages/SkinDiagnosisPage.tsx
"use client";

import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { subject: "수분", score: 80 },
  { subject: "유분", score: 65 },
  { subject: "모공", score: 70 },
  { subject: "주름", score: 50 },
  { subject: "탄력", score: 60 },
  { subject: "피부결", score: 75 },
];

const SkinDiagnosisPage = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      {" "}
      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer>
          <RadarChart outerRadius="75%" data={data}>
            <PolarGrid stroke="#DEDCE1" strokeDasharray="4 4" />
            <PolarAngleAxis
              dataKey="subject"
              stroke="#333"
              tick={{ fontSize: 14 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tickCount={6}
              tick={{ fill: "#999" }}
            />
            <Radar
              name="피부 상태"
              dataKey="score"
              stroke="#7FC5E0"
              fill="#7FC5E0"
              fillOpacity={0.4}
              dot={{ fill: "#7FC5E0", r: 4 }}
            />
            <Tooltip
              contentStyle={{ borderRadius: 8, fontSize: 14 }}
              cursor={{ stroke: "#7FC5E0", strokeWidth: 1 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkinDiagnosisPage;
