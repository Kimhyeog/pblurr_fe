"use client";

import { useEffect, useState } from "react";
import SkinAnalysis from "./components/SkinAnalysis/SkinAnalysis";
import InfoNav from "./components/Info/InfoNav";
import { SkinAnalysisResult } from "@/types/types";
import CosMeticSession from "./components/Cosmetics/CosMeticSession";
import DiagnoseStartInfo from "./components/Info/DiagnoseStartInfo";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { createSkinCareMission } from "@/api/skinCareMission";
import SwalComponent from "@/components/Modal/SwalComponent";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Page() {
  const router = useRouter();

  const [result, setResult] = useState<SkinAnalysisResult | null>(null);
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

  if (loading)
    return (
      <div className="max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto min-h-screen flex flex-col">
        <LoadingSpinner />
      </div>
    );
  return (
    <div className="max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto min-h-screen mt-5 gap-y-3">
      {result === null ? (
        // result가 null일 때 (처음 화면)
        <div className="rounded-2xl flex flex-col gap-y-4 items-center px-0 sm:px-10 py-5 border-0 bg-white">
          <div className="w-full">
            <div className="text-center sm:text-left text-xl sm:text-2xl lg:text-3xl font-bold pl-1 py-1 w-full mb-4">
              피부 미용 분석 받기
            </div>
            <DiagnoseStartInfo
              setResult={setResult}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
          <div className="w-full">
            <div className="text-center sm:text-left text-xl sm:text-2xl lg:text-3xl font-bold pl-1 py-1 w-full mb-4">
              피부 미용 분석 안내
            </div>
            <InfoNav />
          </div>
        </div>
      ) : showCosmetic ? (
        // 화장품 추천 화면
        <div className="rounded-2xl flex flex-col gap-y-4 items-center px-10 py-5 border-0 bg-white">
          <div
            className="flex 
          flex-col
          sm:flex-row
          gap-y-5 sm:gap-y-0
          
          sm:justify-between items-center text-center sm:text-left 
          text-lg sm:text-2xl lg:text-3xl font-bold pl-1 py-1 w-full"
          >
            <p>피부 미용 분석 기반 화장품 추천</p>{" "}
            <button
              onClick={() => setShowCosmetic(false)}
              className="group relative inline-flex items-center justify-center px-4 py-1 sm:py-3 sm:px-6 text-base sm:text-md font-semibold text-white bg-gradient-to-r from-[#4DB6AC] to-[#0288D1] rounded-full shadow-md transition-all duration-300 hover:scale-105 hover:from-[#00897B] hover:to-[#0277BD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0288D1]"
            >
              📊 <span className="ml-2">분석 결과 다시 보기</span>
            </button>
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
        <div className="rounded-2xl flex flex-col gap-y-4 items-center  px-3 sm:px-10 py-5 border-0 bg-white">
          <div className="w-full flex flex-col sm:flex-row items-center justify-center">
            <div className="flex-1 text-center sm:text-left text-xl sm:text-2xl lg:text-3xl font-bold pl-1 py-1 w-full mb-2">
              피부 미용 분석 결과
            </div>
            <div>
              <button
                className="px-3 py-2 bg-[#e85959] text-white  text-md sm:text-2xl hover:bg-[#e85959b7] rounded-2xl"
                onClick={handleReset}
              >
                다시 분석 하기
              </button>
            </div>
          </div>
          <div className="w-full border-4 border-[#5CA7C8] rounded-2xl shadow-xl bg-white">
            <SkinAnalysis result={result} />
            <div className="w-full px-6 mb-4 flex flex-col gap-y-4">
              <button
                className="w-full py-2 bg-[#5CA7C8] text-white text-xl sm:text-2xl hover:bg-[#5ca8c8ab] rounded-2xl"
                onClick={handleShowCosmetic}
              >
                화장품 추천 받기
              </button>

              <button
                className="w-full py-2 bg-[#FBBF24] text-white text-xl sm:text-2xl hover:bg-[#fbbe24aa] active:bg-[#fbbe2460] rounded-2xl"
                onClick={() => {
                  SwalComponent({
                    title: "경고",
                    content: (
                      <p className="text-center">
                        이전에 생성한 스킨케어미션과 기록들이 초기화됩니다.
                        <br />
                        그래도 생성하시겠습니까??
                      </p>
                    ),
                    icon: "warning",
                    isthen: true,
                    showCancelButton: true,
                    onConfirm: async () => {
                      setLoading(true);
                      try {
                        await createSkinCareMission();
                        router.push("/skincaremission");
                      } catch (error: any) {
                        Swal.fire("실패", error.message, "warning");
                      } finally {
                        setLoading(false);
                      }
                    },
                    onCancel: () => {},
                  });
                }}
              >
                스킨 케어 미션 생성하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
