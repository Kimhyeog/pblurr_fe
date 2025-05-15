"use client";

import { SkinAnalysisResult } from "@/types/types";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { motion } from "framer-motion";

interface Props {
  result1: SkinAnalysisResult;
  result2: SkinAnalysisResult;
  result1Average: number;
  result2Average: number;
}

// 날짜 문자열을 YYYY-MM-DD 형식으로 변환
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // 유효하지 않은 날짜면 원본 그대로
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function CompareRarChartGraph(props: Props) {
  const { result1, result2, result1Average, result2Average } = props;

  const maxValues = {
    totalWrinkle: 26,
    totalPigmentation: 15,
    totalPore: 10,
    lipDryness: 4,
    skinAge: 80,
    jawlineSagging: 6,
  };

  const normalize = (value: number, max: number) => value / max;

  const radarData = [
    {
      subject: "색소침착",
      result1: normalize(
        result1.totalPigmentation,
        maxValues.totalPigmentation
      ),
      result2: normalize(
        result2.totalPigmentation,
        maxValues.totalPigmentation
      ),
    },
    {
      subject: "주름",
      result1: normalize(result1.totalWrinkle, maxValues.totalWrinkle),
      result2: normalize(result2.totalWrinkle, maxValues.totalWrinkle),
    },
    {
      subject: "모공",
      result1: normalize(result1.totalPore, maxValues.totalPore),
      result2: normalize(result2.totalPore, maxValues.totalPore),
    },
    {
      subject: "입술 건조도",
      result1: normalize(result1.lipDryness, maxValues.lipDryness),
      result2: normalize(result2.lipDryness, maxValues.lipDryness),
    },
    {
      subject: "피부 나이",
      result1: normalize(result1.skinAge, maxValues.skinAge),
      result2: normalize(result2.skinAge, maxValues.skinAge),
    },
    {
      subject: "턱선 처짐",
      result1: normalize(result1.jawlineSagging, maxValues.jawlineSagging),
      result2: normalize(result2.jawlineSagging, maxValues.jawlineSagging),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full sm:w-auto bg-[#FFFFFF] p-6 rounded-3xl shadow-lg border-4 border-[#C7EAF3] mx-auto"
    >
      <div
        className="w-full text-center text-[#5CA7C8] font-extrabold text-xl sm:text-left items-center 
      py-2 px-4 mb-2 rounded-lg bg-[#FFFFFF]  border-2 border-[#3C9FCA]"
      >
        비교 차트
      </div>
      {/* h-[350px] */}
      <div className="w-full h-[150px] my-5 sm:h-[300px]">
        <ResponsiveContainer>
          <RadarChart outerRadius="75%" data={radarData}>
            <PolarGrid stroke="#F3F3F3" strokeDasharray="4 4" />
            <PolarAngleAxis
              dataKey="subject"
              stroke="#888"
              tick={{ fontSize: 13, fill: "#5CA7C8" }}
              className="font-extrabold"
            />
            <PolarRadiusAxis
              angle={30}
              domain={[
                0,
                Math.max(...radarData.flatMap((d) => [d.result1, d.result2])),
              ]}
              tick={{ fill: "#C0C0C0", fontSize: 11 }}
              axisLine={false}
            />
            <Radar
              name={`${formatDate(result1.createdAt)}`}
              dataKey="result1"
              stroke="#5CA7C8"
              fill="#5CA7C8"
              fillOpacity={0.3}
              dot={{ fill: "#5CA7C8", r: 3 }}
            />
            <Radar
              name={`${formatDate(result2.createdAt)}`}
              dataKey="result2"
              stroke="#F9A8D4"
              fill="#F9A8D4"
              fillOpacity={0.25}
              dot={{ fill: "#F9A8D4", r: 3 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                fontSize: 13,
                borderColor: "#EAEAEA",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              }}
              cursor={{ stroke: "#ccc", strokeWidth: 1 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8 text-sm sm:text-base bg-[#F0FAFC] px-6 py-6 rounded-2xl border border-[#BEE6F2] shadow-inner">
        <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
          <p className="text-[#5CA7C8] font-bold text-lg">
            {formatDate(result1.createdAt)}
            <br />
            <span className="text-[#5CA7C8] font-medium">평균 점수</span>
          </p>
          <span className="text-[#3C9FCA] font-extrabold text-xl mt-1">
            {result1Average}
          </span>
        </div>

        <span className=" font-bold text-lg">vs</span>

        <div className="text-[#F9A8D4] flex flex-col items-center sm:items-start text-center sm:text-left">
          <p className="font-bold text-lg">
            {formatDate(result2.createdAt)}
            <br />
            <span className=" font-medium">평균 점수</span>
          </p>
          <span className="font-extrabold text-xl mt-1">{result2Average}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default CompareRarChartGraph;
