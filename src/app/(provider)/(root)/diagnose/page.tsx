"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { User, DiagnosisResult } from "@/types/types";
import { diagnoseSkinDisease } from "@/api/diease";
import ProbabilityBar from "./components/ProbabilityBar";
import ModalUse from "@/components/Modal/ModalUse";
import SeoulMap from "../test/page";
import DieasesBox from "./components/DieasesBox";

export default function Page() {
  const [image, setImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null); // 진단 결과 상태 추가

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);

      // 기존 URL이 있다면 정리
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }

      const newImageUrl = URL.createObjectURL(file);
      setImageSrc(newImageUrl);
    }
  };

  const handleDiagnosis = async () => {
    if (!image) {
      alert("이미지를 업로드하세요.");
      return;
    }
    const result = await diagnoseSkinDisease(image);
    const imageSrcResult = URL.createObjectURL(image);

    setImageSrc(imageSrcResult); // 이미지 URL 설정
    setDiagnosis(result);
  };

  console.log(diagnosis);

  useEffect(() => {
    console.log("imageSrc 상태 변경:", imageSrc);
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  return (
    <div className="mx-auto w-full max-w-[900px] min-h-screen flex flex-col mt-5 gap-y-3 px-4">
      {/* 진단 결과 창 */}
      <div className="rounded-lg flex flex-col items-center px-3 py-5 border-0 bg-white">
        {/* 제목 */}
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold px-3 py-1 text-left w-full">
          피부 질환 진단하기
        </div>

        {/* 이미지 업로드 */}
        {!image && (
          <div className="flex flex-col items-center justify-center relative w-full">
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="fileUpload"
              className="flex items-center justify-center w-[80%] sm:w-[300px] h-[300px] border-4 border-[#939498f9] border-dotted rounded-3xl cursor-pointer"
            >
              <span className="bg-[#5CA7C8] text-white px-4 py-2 font-bold rounded-lg">
                사진 업로드
              </span>
            </label>
          </div>
        )}

        {/* 업로드된 이미지 */}
        {image && (
          <div className="flex flex-col items-center justify-center relative mt-2">
            <Image
              src={imageSrc as string}
              alt="업로드된 이미지"
              width={300}
              height={300}
              className="rounded-lg"
            />
          </div>
        )}

        {/* 진단 버튼 */}
        {image && (
          <button
            className="mt-4 w-[80%] sm:w-[300px] bg-[#7FC5E0] text-xl sm:text-2xl text-white px-4 py-2 font-bold rounded-lg
          hover:bg-[#5CA7C8] active:bg-[#4A8FBF] transition cursor-pointer"
            onClick={handleDiagnosis}
          >
            진단 요청
          </button>
        )}
      </div>
      {/* 병명 설명 */}
      {!diagnosis && <DieasesBox />}
      {/* 진단 결과 */}
      {diagnosis && (
        <div className="rounded-lg flex flex-col items-center">
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
                <div className="border-[2px] border-[#DEDCE1] py-5 px-5 rounded-lg flex flex-col justify-center w-full">
                  <p className="flex items-center justify-between font-bold text-2xl mb-2 pl-1 pb-2 border-b">
                    <span className="whitespace-nowrap">🩺 치료법</span>
                    <span className="text-sm text-gray font-bold">
                      ※ {` `}대한피부과학회에서 제공된 정보입니다. 보다 정확한
                      진단과 치료를 위해 가까운 병원에 방문하세요.
                    </span>
                  </p>
                  <ul className=" list-disc list-inside space-y-1">
                    {diagnosis.treatment
                      .split(". ")
                      .filter((sentence) => sentence.trim() !== "")
                      .map((sentence, index) => (
                        <li key={index}>{sentence}.</li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 병원 추천 컴포넌트 */}
      <div className="relative w-full h-full px-10">
        <ModalUse buttonText="내 주변 병원찾기">
          {(closeModal) => (
            <>
              <SeoulMap />
              <button
                className="cursor-pointer absolute top-[10px] right-[10px] text-3xl"
                onClick={closeModal} // 모달을 닫는 함수
              >
                ×
              </button>
            </>
          )}
        </ModalUse>
      </div>
    </div>
  );
}
