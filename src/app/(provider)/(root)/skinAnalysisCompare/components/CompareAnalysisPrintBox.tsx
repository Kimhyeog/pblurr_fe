import { SkinAnalysisCompareResponse } from "@/types/types";
import React from "react";
import CompareImageBox from "./compareResultsBox/CompareImageBox";
import CompareRarChartGraph from "./compareResultsBox/CompareRarChartGraph";

interface Props {
  compareResult: SkinAnalysisCompareResponse;
}

function CompareAnalysisPrintBox({ compareResult }: Props) {
  const { result1, result2, result1Average, result2Average } = compareResult;

  return (
    <div className="w-full border-4 border-[#5CA7C8] bg-[#5CA7C8]/20 rounded-2xl p-4 flex flex-col sm:flex-row gap-y-3 sm:gap-y-0 sm:gap-x-3">
      {/* 첫 번째 Box - 이미지 비교 */}
      <CompareImageBox
        result1_Date={result1.createdAt}
        result2_Date={result2.createdAt}
        result1_Images={result1.imageUrls}
        result2_Images={result2.imageUrls}
      />

      {/* 두 번째 Box - 레이더 차트 , 평균 점수 비교 */}
      <CompareRarChartGraph
        result1={result1}
        result1Average={result1Average}
        result2={result2}
        result2Average={result2Average}
      />
    </div>
  );
}

export default CompareAnalysisPrintBox;
