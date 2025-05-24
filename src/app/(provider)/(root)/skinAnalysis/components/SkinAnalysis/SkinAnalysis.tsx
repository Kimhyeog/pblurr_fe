// src/app/(provider)/(root)/skinAnalysis/components/SkinAnalysis/SkinAnalysis.tsx

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import ScoreCard from "./ScoreCard";
import SkinResultAge from "./SkinResultAge";
import TotalScoreBox from "./TotalScoreBox";
import SwalComponent from "@/components/Modal/SwalComponent";
import { SkinAnalysisResult } from "@/types/types";
import FaceAreaSelectorMobile from "./FaceAreaSelectorMobile";
import FaceAreaSelector from "./FaceAreaSelector";
import FilterDropdown from "./FilterDropDown";
import TotalSkinAnalysis from "./TotalSkinAnalysis";
import TotalViewScoreCard from "./TotalViewScoreCard";

interface Props {
  result: SkinAnalysisResult;
}

const SkinAnalysis = ({ result }: Props) => {
  const resultRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("이마");
  const [totalDataView, setTotalDataView] = useState(true);
  useEffect(() => {
    if (result.skinAge === -1) {
      SwalComponent({
        title: "오류",
        content: (
          <div className="flex flex-col gap-y-3">
            <p className="text-center">
              정확한 진단을 위해 <strong>촬영 방법</strong> 확인 후
            </p>
            <p className="text-center">다시 업로드해주세요.</p>
          </div>
        ),
        icon: "warning",
      });
    }
  }, [result.skinAge]);

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
          category: "하안부",
          items: [
            { name: "입술 건조도", value: result.lipDryness },
            { name: "턱선 처짐", value: result.jawlineSagging },
          ],
        },
      ]
    : [];

  const scoreRanges: Record<string, number> = {
    "이마 주름": 6,
    "이마 색소침착": 5,
    "미간 주름": 6,
    "왼쪽 눈가 주름": 6,
    "오른쪽 눈가 주름": 6,
    "왼쪽 볼 색소침착": 5,
    "왼쪽 볼 모공": 5,
    "오른쪽 볼 색소침착": 5,
    "오른쪽 볼 모공": 5,
    "입술 건조도": 4,
    "턱선 처짐": 6,
  };

  function getStatusFromPercentage(percentage: number): "Good" | "Bad" {
    return percentage > 50 ? "Good" : "Bad";
  }

  const handleFilter = (selected: string) => {
    if (selected === "세부 항목") {
      setTotalDataView(true);
    } else if (selected === "전체 보기") {
      setTotalDataView(false);
      setSelectedCategory("전체 보기");
    }
  };

  // 선택된 카테고리 필터링
  const filteredData =
    selectedCategory === "전체 보기"
      ? categorizedData
      : categorizedData.filter(
          (section) => section.category === selectedCategory
        );

  return (
    <div className="w-full mx-auto px-4">
      {result && (
        <motion.div
          ref={resultRef}
          className="mt-8 space-y-6 bg-white p-4 rounded shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-xl sm:text-2xl font-semibold text-[#3B6F82] border-b pb-2 border-[#DEDCE1]">
            📊 피부 나이&nbsp;:{" "}
            <span className="text-[#7FC5E0] font-bold">{result.skinAge}대</span>
          </div>
          <div className="w-full hidden md:block">
            <SkinResultAge imageUrls={result.imageUrls} />
          </div>

          <div className="w-full relative">
            <div className="absolute top-0 right-0 z-1">
              <FilterDropdown
                options={["전체 보기", "세부 항목"]}
                onSelect={handleFilter}
              />
            </div>

            {totalDataView ? (
              <>
                <div className="text-xl sm:text-2xl font-semibold text-[#3B6F82] border-b pb-5 border-[#DEDCE1] my-5">
                  📊 세부 <span className="hidden sm:visible">항목별</span> 점수
                </div>
                <FaceAreaSelector
                  onSelect={setSelectedCategory}
                  selectedCategory={selectedCategory}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  <div className="col-span-full">
                    <div className="flex flex-col gap-8 mt-5">
                      {filteredData.map((section, sectionIndex) => (
                        <div
                          key={sectionIndex}
                          className="flex flex-col gap-2 border border-[#DEDCE1] rounded-2xl shadow-sm p-2 sm:p-4 mb-3"
                        >
                          <div className="flex items-center gap-2">
                            <Image
                              src="/images/피부분석아이콘.png"
                              alt="의심 질환 아이콘"
                              width={35}
                              height={35}
                            />
                            <h2 className="text-lg sm:text-2xl font-bold mb-2">
                              {section.category}
                            </h2>
                          </div>
                          <div className="flex flex-col gap-4">
                            {section.items.map((item, itemIndex) => {
                              const range = scoreRanges[item.name] ?? 10;
                              const percentage = Math.round(
                                (item.value / range) * 100
                              );
                              const status =
                                getStatusFromPercentage(percentage);

                              return (
                                // 수정&& :전체 요약 점수
                                <ScoreCard
                                  key={itemIndex}
                                  label={item.name}
                                  score={item.value}
                                  percentage={percentage}
                                  status={status}
                                  max={range}
                                />
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // "전체 보기" 선택 시: 모든 카테고리 한꺼번에 보여줌
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div className="col-span-full">
                  <div className="text-xl sm:text-2xl font-semibold pb-5 text-[#3B6F82] border-b pb-2 border-[#DEDCE1]">
                    📊 전체 <span className="hidden sm:visible">항목별</span>{" "}
                    점수
                  </div>
                  <div className="flex flex-col gap-8 mt-5">
                    {filteredData.map((section, sectionIndex) => (
                      <div
                        key={sectionIndex}
                        className="flex flex-col gap-2 border border-[#DEDCE1] rounded-2xl shadow-sm p-2 sm:p-4 mb-3"
                      >
                        <div className="flex items-center gap-2">
                          <Image
                            src="/images/피부분석아이콘.png"
                            alt="의심 질환 아이콘"
                            width={35}
                            height={35}
                          />
                          <h2 className="text-lg sm:text-2xl font-bold mb-2">
                            {section.category}
                          </h2>
                        </div>
                        <div className="flex flex-col gap-4">
                          {section.items.map((item, itemIndex) => {
                            const range = scoreRanges[item.name] ?? 10;
                            const percentage = Math.round(
                              (item.value / range) * 100
                            );
                            const status = getStatusFromPercentage(percentage);

                            return (
                              // 수정&& :전체 요약 점수
                              <TotalViewScoreCard
                                key={itemIndex}
                                label={item.name}
                                score={item.value}
                                percentage={percentage}
                                status={status}
                                max={range}
                              />
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <h3 className="text-lg sm:text-2xl font-semibold text-[#3B6F82] border-b pb-2 border-[#DEDCE1] mb-5">
            📊 종합 피부 점수
          </h3>
          <div className="w-full bg-white border border-[#DEDCE1] rounded-2xl shadow-sm p-4">
            <TotalScoreBox
              totalWrinkle={result.totalWrinkle}
              totalPigmentation={result.totalPigmentation}
              totalPore={result.totalPore}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SkinAnalysis;
