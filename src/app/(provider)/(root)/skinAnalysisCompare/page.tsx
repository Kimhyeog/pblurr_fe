"use client";

// pages/skinAnalysis/history.tsx (예시 경로)
import { useEffect, useState } from "react";
import { getSkinAnalysisDateList } from "@/api/skinAnalysisCompare";
import { useRouter } from "next/navigation";
import { SkinAnalysisCompareResponse } from "@/types/types";
import AnalysisDateList from "./components/AnalysisDateList";
import CompareAnalysisPrintBox from "./components/CompareAnalysisPrintBox";
import AnalysisCalendar from "./components/AnalysisCalendar";

const SkinAnalysisHistoryPage = () => {
  // 고객이 피부 미용 진단 받은 날짜 데이터들
  const [dateList, setDateList] = useState<string[]>([]);
  // 선택된 두 피부미용 날짜데이터
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  // 선택된 두 피부미용 비교 결과 데이터
  const [compareResult, setCompareResult] =
    useState<SkinAnalysisCompareResponse | null>(null);

  //피부 미용 기록이 없을 시, 피부미용 받으로 이동용 useRouter
  const router = useRouter();

  useEffect(() => {
    const fetchDateList = async () => {
      try {
        const dates = await getSkinAnalysisDateList();
        if (dates.length === 0) {
          alert("피부 미용 분석한 기록이 없습니다.");
          router.push("/skinAnalysis");
        } else {
          setDateList(dates);
        }
      } catch (error: any) {
        // getSkinAnalysisDateList에서 400 처리 포함되어 있으므로 여기서는 기본 오류 처리만

        router.push("/skinAnalysis");
      }
    };

    fetchDateList();
  }, [router]);

  return (
    <div className="max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto min-h-screen mt-5 gap-y-3,">
      <div className="w-full  md:w-auto  p-5  rounded-2xl shadow-xl bg-white">
        <h2 className="w-full p-4 rounded-2xl text-2xl text-left font-bold mb-2">
          피부 분석 날짜 선택
        </h2>
        <div className="w-full border-4 border-[#5CA7C8] bg-[#5CA7C8]/20 rounded-2xl flex flex-row">
          {/* 정렬도 추가하자
            월 , 최신순, 오래된 순
          */}
          <AnalysisDateList
            dateList={dateList}
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates} // 함수 직접 전달
            setCompareResult={setCompareResult}
          />
        </div>
        {compareResult && (
          <CompareAnalysisPrintBox compareResult={compareResult} />
        )}
      </div>
    </div>
  );
};

export default SkinAnalysisHistoryPage;
