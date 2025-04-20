"use client";

import { useEffect, useRef, useState } from "react";
import SkinAnalysis from "./components/SkinAnalysis/SkinAnalysis";
import InfoNav from "./components/Info/InfoNav";
import { SkinAnalysisResult } from "@/types/types";
import * as htmlToImage from "html-to-image";

export default function Page() {
  const [result, setResult] = useState<SkinAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // 업로드 후의 이미지 저장 핸들러
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

  //분석 결과를 링크 복사 핸들러러
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("링크가 복사되었습니다!");
    });
  };

  const scores = {
    wrinkleScore: 3,
    pigmentationScore: 5,
    poreScore: 7,
  };

  useEffect(() => {
    console.log(result);
  }, [result]);

  //백엔드에서 받은 JSON 데이터 => 프론트 String으로 변환용 객체 배열 data
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
    <div className="max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto min-h-screen mt-5 gap-y-3 ">
      <div className="rounded-2xl flex flex-col items-center px-3 py-5 border-0 bg-white">
        <div
          className="
        text-center sm:text-left
        text-xl sm:text-2xl lg:text-3xl font-bold pl-4 py-1 w-full"
        >
          피부 타입 및 피부질환 분석 결과
        </div>
        <div className="w-full px-5">
          <InfoNav
            setResult={setResult}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
        <div>{result && <SkinAnalysis result={result} />}</div>
        {/* <CosMeticSession {...scores} /> */}
      </div>
    </div>
  );
}
