"use client";

import { useEffect, useState } from "react";
import { getSkinAnalysisDateList } from "@/api/skinAnalysisCompare";
import { useRouter } from "next/navigation";
import { SkinAnalysisCompareResponse } from "@/types/types";
import AnalysisDateList from "./components/SelectDates/AnalysisDateList";
import CompareAnalysisPrintBox from "./components/CompareAnalysisPrintBox";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const SkinAnalysisHistoryPage = () => {
  const router = useRouter();

  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [compareResult, setCompareResult] =
    useState<SkinAnalysisCompareResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    data: dateList = [], // 기본값 빈 배열
    isLoading,
    isError,
  } = useQuery<string[]>({
    queryKey: ["analysisCompareList"],
    queryFn: getSkinAnalysisDateList,
    retry: 0,
    staleTime: 1000 * 60 * 5,
  });

  // dateList 로직 처리용 useEffect
  useEffect(() => {
    if (!isLoading && (isError || dateList.length === 0)) {
      alert("피부 미용 분석한 기록이 없습니다.");
      router.push("/skinAnalysis");
    }
  }, [isLoading, isError, dateList, router]);

  return (
    <div className="max-w-full flex flex-col sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto min-h-screen mt-5 gap-y-3 sm:gap-y-5">
      <div className="w-full md:w-auto p-5 rounded-2xl shadow-xl bg-white">
        <h2 className="w-full p-4 rounded-2xl text-2xl text-center sm:text-left font-bold mb-2">
          피부 분석 날짜 선택
        </h2>
        <div className="w-full border-4 border-[#5CA7C8] bg-[#5CA7C8]/20 rounded-2xl flex flex-row">
          {dateList.length > 0 && (
            <AnalysisDateList
              dateList={dateList}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
              setCompareResult={setCompareResult}
              setLoading={setLoading}
            />
          )}
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        compareResult && (
          <div className="w-full md:w-auto p-5 rounded-2xl shadow-xl bg-white">
            <h2 className="w-full p-4 rounded-2xl text-2xl text-center sm:text-left font-bold mb-2">
              분석 비교 결과
            </h2>
            <CompareAnalysisPrintBox compareResult={compareResult} />
          </div>
        )
      )}
    </div>
  );
};

export default SkinAnalysisHistoryPage;
