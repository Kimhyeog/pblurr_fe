import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import React from "react";

interface TotalSkinAnalysisProps {
  categorizedData: {
    category: string;
    items: { name: string; value: number }[];
  }[];
  scoreRanges: Record<string, number>;
}

const colors: Record<string, string> = {
  이마: "#7FC5E0",
  눈가: "#9DD3A8",
  볼: "#FFBCBC",
  하안부: "#FFC785",
};

const highlightText = (name: string, category: string, color: string) => {
  const index = name.indexOf(category);
  if (index === -1) return name;
  return (
    <>
      {name.slice(0, index)}
      <tspan style={{ fontWeight: "bold", fill: color }}>{category}</tspan>
      {name.slice(index + category.length)}
    </>
  );
};

const TotalSkinAnalysis = ({
  categorizedData,
  scoreRanges,
}: TotalSkinAnalysisProps) => {
  return (
    <div className="w-full flex flex-row ">
      {categorizedData.map((section, sectionIdx) => (
        <div
          key={sectionIdx}
          className="w-full bg-white shadow p-4 rounded-xl overflow-x-auto"
        >
          <h3
            className="text-lg font-bold mb-4"
            style={{ color: colors[section.category] || "#000" }}
          >
            {section.category}
          </h3>
          <div className="flex flex-row">
            {section.items.map((item, itemIdx) => {
              const max = scoreRanges[item.name] ?? 10;
              const color = colors[section.category] || "#8884d8";
              const data = [
                {
                  name: item.name,
                  value: item.value,
                },
              ];

              return (
                <div key={itemIdx} className="w-auto h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data}
                      layout="vertical" // 가로 막대 → 제거!
                      margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, max]} hide />
                      <YAxis type="category" dataKey="name" hide />
                      <Tooltip formatter={(value: number) => `${value}점`} />
                      <Bar dataKey="value" fill={color} radius={[8, 8, 0, 0]}>
                        <LabelList
                          dataKey="value"
                          position="top"
                          style={{ fontWeight: "bold", fill: "#444" }}
                        />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="text-center text-sm font-bold mt-1">
                    {highlightText(item.name, section.category, color)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TotalSkinAnalysis;
