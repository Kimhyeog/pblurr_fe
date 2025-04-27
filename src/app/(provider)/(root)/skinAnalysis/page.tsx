"use client";

import { useEffect, useState } from "react";
import SkinAnalysis from "./components/SkinAnalysis/SkinAnalysis";
import InfoNav from "./components/Info/InfoNav";
import { SkinAnalysisResult } from "@/types/types";
import {
  mockEmptySkinAnalysisResult,
  mockSkinAnalysisResult,
} from "@/data/skinAnalysis";
import CosMeticSession from "./components/Cosmetics/CosMeticSession";

export default function Page() {
  const [result, setResult] = useState<SkinAnalysisResult | null>(
    mockSkinAnalysisResult
  );
  const [loading, setLoading] = useState(false);
  const [showCosmetic, setShowCosmetic] = useState(false); // ★ 추가: 화장품 추천 버튼 눌렀는지 여부

  useEffect(() => {
    console.log(result);
  }, [result]);

  const handleReset = () => {
    setResult(null);
    setShowCosmetic(false); // ★ 다시 분석할 때는 화장품 추천 보기 상태도 초기화
  };

  const handleShowCosmetic = () => {
    setShowCosmetic(true);
  };

  return (
    <div className="max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto min-h-screen mt-5 gap-y-3">
      {result === null ? (
        // result가 null일 때 (처음 화면)
        <div className="rounded-2xl flex flex-col gap-y-4 items-center px-10 py-5 border-0 bg-white">
          <div className="w-full">
            <div className="text-center sm:text-left text-xl sm:text-2xl lg:text-3xl font-bold pl-1 py-1 w-full mb-4">
              피부 미용 분석 안내
            </div>
            <InfoNav
              setResult={setResult}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
        </div>
      ) : showCosmetic ? (
        // 화장품 추천 화면
        <div className="rounded-2xl flex flex-col gap-y-4 items-center px-10 py-5 border-0 bg-white">
          <div className="text-center sm:text-left text-xl sm:text-2xl lg:text-3xl font-bold pl-1 py-1 w-full">
            피부 미용 분석 기반 화장품 추천
          </div>
          <div className="w-full border-4 border-[#5CA7C8] rounded-2xl shadow-xl bg-white">
            <CosMeticSession
              wrinkleScore={result.totalWrinkle}
              pigmentationScore={result.totalPigmentation}
              poreScore={result.totalPore}
            />
          </div>
        </div>
      ) : (
        // 피부 분석 결과 화면
        <div className="rounded-2xl flex flex-col gap-y-4 items-center px-10 py-5 border-0 bg-white">
          <div className="w-full flex">
            <div className="flex-1 text-center sm:text-left text-xl sm:text-2xl lg:text-3xl font-bold pl-1 py-1 w-full mb-2">
              피부 미용 분석 결과
            </div>
            <div>
              <button
                className="px-3 py-2 bg-[#e85959] text-white text-xl sm:text-2xl hover:bg-[#e85959b7] rounded-2xl"
                onClick={handleReset}
              >
                다시 분석 하기
              </button>
            </div>
          </div>
          <div className="w-full border-4 border-[#5CA7C8] rounded-2xl shadow-xl bg-white">
            <SkinAnalysis result={result} />
            <div className="w-full px-6 mb-4">
              <button
                className="w-full py-2 bg-[#5CA7C8] text-white text-xl sm:text-2xl hover:bg-[#5ca8c8ab] rounded-2xl"
                onClick={handleShowCosmetic}
              >
                화장품 추천 받기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
