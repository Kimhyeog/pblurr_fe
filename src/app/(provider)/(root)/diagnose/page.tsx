//diagnose/page.tsx
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { DiagnosisResult } from "@/types/types";
import ProbabilityBar from "./components/ProbabilityBar";
import ModalUse from "@/components/Modal/ModalUse";
import DieasesBox from "./components/DieasesBox";
import DiagnoseBox from "./components/DiagnoseBox";
import SeoulMap from "./components/SeoulMap";

export default function Page() {
  const [imageSrc, setImageSrc] = useState<string | null>("");
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null); // 진단 결과 상태 추가

  useEffect(() => {
    if (!imageSrc) setDiagnosis(null);
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);
  useEffect(() => {}, [diagnosis]);

  return (
    <div className="mx-auto w-full max-w-[900px] min-h-screen flex flex-col mt-5 gap-y-3 px-4">
      {/* 진단 결과 창 */}
      <div className="rounded-2xl flex flex-col items-center px-3 py-5 border-0 bg-white">
        {/* 제목 */}
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold pl-4 py-1 text-left w-full">
          피부 질환 진단하기
        </div>
        <div className="w-full p-5 ">
          <DiagnoseBox setImage={setImageSrc} setDiagnose={setDiagnosis} />
        </div>
      </div>
      {/* 병명 설명 */}
      {!diagnosis && (
        <div>
          <DieasesBox />
        </div>
      )}
      {/* 진단 결과 */}
      {diagnosis && (
        <div className="rounded-2xl flex flex-col items-center">
          <div className="flex flex-col gap-y-3 px-3 py-5 rounded-lg border-0  bg-white w-full">
            <h3 className="px-2 text-xl sm:text-2xl font-bold">
              피부 질환 진단 결과
            </h3>

            {/* 질병명 */}
            <div className="flex items-center gap-x-4 px-4 text-base sm:text-lg border-[2px] border-[#DEDCE1] py-2 rounded-lg">
              <Image
                src="/images/질병아이콘.png"
                alt="의심 질환 아이콘"
                width={32}
                height={32}
              />
              <p className="font-bold text-xl">
                질병 :{" "}
                <span className="text-[#e85959]">{diagnosis.disease}</span>
              </p>
            </div>

            {/* 확률 */}
            <div className="text-base sm:text-lg border-[2px] border-[#DEDCE1] py-2 px-2 rounded-lg">
              <div className="flex flex-row items-center gap-x-4 px-2">
                <Image
                  src="/images/질병아이콘.png"
                  alt="의심 질환 아이콘"
                  width={32}
                  height={32}
                />
                <p className="font-bold text-xl">
                  확률: {diagnosis.probability.toFixed(2)}%
                </p>
              </div>
              <ProbabilityBar percent={diagnosis.probability.toFixed(2)} />
            </div>

            {/* 이미지 + 치료법 */}
            <div className="text-base sm:text-lg flex flex-col lg:flex-col gap-y-4 lg:gap-x-4 border-[2px] border-[#DEDCE1] py-2 px-2 rounded-lg">
              <div className="flex flex-row items-center gap-x-4 px-2">
                <Image
                  src="/images/질병아이콘.png"
                  alt="의심 질환 아이콘"
                  width={32}
                  height={32}
                />
                <p className="font-bold text-xl"> 의심질환 증상과 치료방법</p>
              </div>
              <div className="flex flex-col justify-start gap-y-5">
                <div className="flex justify-center  border-[2px] border-[#DEDCE1] py-5 px-5 rounded-lg">
                  <Image
                    src={diagnosis.imageUrl}
                    alt="의심 질환 예시 이미지"
                    width={400}
                    height={400}
                    className="rounded-2xl"
                  />
                </div>
                <div className="border-[2px] border-[#DEDCE1] py-5 px-5 rounded-lg flex flex-col gap-y-4 justify-center w-full">
                  <p className="flex items-center justify-between font-bold text-2xl mb-2 pl-1 pb-2 border-b">
                    <span className="whitespace-nowrap">🩺 치료법</span>
                  </p>
                  <ul className="list-disc pl-5 space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {diagnosis.treatment
                      .split(". ")
                      .filter((sentence) => sentence.trim() !== "")
                      .map((sentence, index) => (
                        <li key={index} className="text-justify">
                          {sentence}.
                        </li>
                      ))}
                  </ul>
                  <span className="text-sm text-[#e85959] text-gray font-extrabold">
                    ※ {` `}
                    <span>{diagnosis.source}</span>
                    에서 제공된 정보입니다. 보다 정확한 진단과 치료를 위해
                    가까운 병원에 방문하세요.
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full h-full">
            <ModalUse buttonText="내 주변 병원찾기">
              {(closeModal) => (
                <>
                  <SeoulMap />
                  <button
                    className="font-bold  cursor-pointer absolute top-[10px] right-[10px] text-3xl"
                    onClick={closeModal} // 모달을 닫는 함수
                  >
                    ×
                  </button>
                </>
              )}
            </ModalUse>
          </div>
        </div>
      )}

      {/* 병원 추천 컴포넌트 */}
    </div>
  );
}
