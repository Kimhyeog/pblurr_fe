// components/GraphView.tsx

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

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

const TotalSkinAnalysis = ({
  categorizedData,
  scoreRanges,
}: TotalSkinAnalysisProps) => {
  // 전체 데이터 항목 평탄화 (각 항목 하나씩)
  const flattenedData = categorizedData.flatMap((section) =>
    section.items.map((item) => {
      const max = scoreRanges[item.name] ?? 10;
      return {
        name: item.name,
        value: item.value,
        percentage: Math.round((item.value / max) * 100),
        category: section.category,
      };
    })
  );

  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={flattenedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-15} textAnchor="end" interval={0} />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(value: any) => `${value}%`} />
          <Bar
            dataKey="percentage"
            radius={[8, 8, 0, 0]}
            isAnimationActive
            label={{
              position: "top",
              formatter: (value: number) => `${value}%`,
            }}
          >
            <LabelList dataKey="percentage" position="top" />
            {flattenedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[entry.category] || "#8884d8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalSkinAnalysis;
