"use client";

import {
  getSkinAnalysisResult,
  submitSkinAnalysis,
} from "@/api/skinDiagnose/skinAnalysis";
import { SkinAnalysisResult } from "@/types/types";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import * as htmlToImage from "html-to-image";
import ScoreCard from "./ScoreCard";

const COLORS = ["#60A5FA", "#F87171", "#34D399"];

interface Props {
  result: SkinAnalysisResult;
}

const SkinAnalysis = (props: Props) => {
  const { result } = props;
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSaveImage = async () => {
    if (!resultRef.current) return;
    const blob = await htmlToImage.toBlob(resultRef.current);
    if (blob) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "skin-analysis-result.png";
      link.click();
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("링크가 복사되었습니다!");
    });
  };

  const categorizedData = result
    ? [
        {
          category: "이마",
          items: [
            { name: "이마 주름", value: result.foreheadWrinkle },
            { name: "이마 색소침착", value: result.foreheadPigmentation },
            { name: "미간 주름", value: result.glabellaWrinkle },
          ],
        },
        {
          category: "눈가",
          items: [
            { name: "왼쪽 눈가 주름", value: result.lefteyeWrinkle },
            { name: "오른쪽 눈가 주름", value: result.righteyeWrinkle },
          ],
        },
        {
          category: "볼",
          items: [
            { name: "왼쪽 볼 색소침착", value: result.leftcheekPigmentation },
            { name: "왼쪽 볼 모공", value: result.leftcheekPore },
            {
              name: "오른쪽 볼 색소침착",
              value: result.rightcheekPigmentation,
            },
            { name: "오른쪽 볼 모공", value: result.rightcheekPore },
          ],
        },
        {
          category: "면상 하부",
          items: [
            { name: "입술 건조도", value: result.lipDryness },
            { name: "턱선 처짐", value: result.jawlineSagging },
          ],
        },
      ]
    : [];

  const pieData = result
    ? [
        { name: "주름", value: result.totalWrinkle },
        { name: "색소침착", value: result.totalPigmentation },
        { name: "모공", value: result.totalPore },
      ]
    : [];

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      {result && (
        <motion.div
          ref={resultRef}
          className="mt-8 space-y-6 bg-white p-4 rounded shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-3 gap-4">
            {result.imageUrls.map((url, idx) => (
              <Image
                width={100}
                height={100}
                key={idx}
                src={url}
                alt={`분석 이미지 ${idx}`}
                className="rounded shadow"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* 막대 그래프 */}
            <div className="col-span-full">
              <h3 className="font-semibold text-lg mb-4">세부 항목별 점수</h3>
              <div className="flex flex-col gap-8">
                {categorizedData.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">
                      {section.category}
                    </h2>
                    <div className="flex flex-wrap gap-4">
                      {section.items.map((item, itemIndex) => (
                        <ScoreCard
                          key={itemIndex}
                          label={item.name}
                          score={item.value}
                          percentage={Math.round((item.value / 10) * 100)}
                          status={
                            item.value >= 7
                              ? "Good"
                              : item.value >= 4
                              ? "Normal"
                              : "Bad"
                          }
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 도넛 차트 */}
          <div>
            <h3 className="font-semibold mb-2">총점 비율 (도넛 차트)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleSaveImage}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              결과 저장
            </button>
            <button
              onClick={handleCopyLink}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              링크 복사
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SkinAnalysis;
