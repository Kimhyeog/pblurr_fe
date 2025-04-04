"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { User, DiagnosisResult } from "@/types/types";
import { diagnoseSkinDisease } from "@/api/diease";
import HospitalRecommendComponent from "@/components/HospitalRecommend/HospitalRecommendation";

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

    console.log("이미지 URL:", imageSrcResult); // 콘솔에서 확인

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
    <div className="m-auto w-[80%] h-screen flex flex-col mt-5 gap-y-3 bg-[#F7F6F9]">
      {/* 진단 결과 창 */}
      <div className="rounded-lg flex flex-col items-center py-3 border-black border-[3px] bg-[#FFFFFF]">
        {/* 사진 업로드 부분 */}
        <div className="text-[26px] font-bold px-3 py-1 text-left self-start">
          피부 질환 진단 결과
        </div>
        {!image && (
          <div className="flex flex-col items-center justify-center relative">
            {/* 숨겨진 파일 업로드 필드 */}
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleImageUpload}
            />

            {/* 파일 업로드 버튼 */}
            <label
              htmlFor="fileUpload"
              className="flex items-center justify-center w-[300px] h-[300px] border-4 border-[#939498f9] border-dotted rounded-3xl cursor-pointer"
            >
              <span className="bg-[#5CA7C8] text-white px-4 py-2 font-bold rounded-lg">
                사진 업로드
              </span>
            </label>

            {/* 사진이 업로드되었을 때만 버튼 표시 */}
          </div>
        )}
        {image && (
          <div className="flex flex-col items-center justify-center relative">
            <Image
              src={imageSrc as string}
              alt="업로드된 이미지"
              width={300}
              height={300}
            />
          </div>
        )}
        <div>
          {image && (
            <button
              className="mt-4 w-[300px] bg-[#7FC5E0] text-2xl text-white px-4 py-2 font-bold rounded-lg
          hover:bg-[#5CA7C8] active:bg-[#4A8FBF] transition cursor-pointer"
              onClick={handleDiagnosis}
            >
              진단 요청
            </button>
          )}
        </div>
      </div>
      <div className=" rounded-lg flex flex-col items-center">
        {diagnosis && (
          <div className="flex flex-col gap-y-3 px-3 py-3 rounded-lg border-black border-[3px] bg-[#FFFFFF]">
            <h3 className="text-[23px] font-bold">의심 피부질환</h3>
            <div className="flex flex-row px-2 gap-x-1 text-[18px] border-[2px] border-[#DEDCE1] py-2 rounded-lg">
              <Image
                src="/images/질병아이콘.png"
                alt="의심짛환아이콘콘"
                width={30}
                height={30}
              />
              질병 : {diagnosis.disease}
            </div>
            <div className="flex flex-row px-2 gap-x-1 text-[18px] border-[2px] border-[#DEDCE1] py-2 rounded-lg">
              <p>확률: {diagnosis.probability.toFixed(2)}%</p>
            </div>
            <div className="flex flex-row px-2 gap-x-3 text-[18px] border-[2px] border-[#DEDCE1] py-2 rounded-lg">
              {/* 이미지 */}
              <Image
                src={diagnosis.imageUrl}
                alt="의심 질환 아이콘"
                width={500}
                height={500}
                className="rounded-lg"
              />

              {/* 치료법 정보 */}
              <div className="flex flex-col justify-center">
                <p className="font-bold text-lg">🩺 치료법</p>

                {/* treatment를 문장 단위로 분리하여 리스트 형태로 출력 */}
                <ul className="list-disc list-inside mt-2 space-y-1 px-3">
                  {diagnosis.treatment
                    .split(". ") // 문장을 '.' 기준으로 나눔
                    .filter((sentence) => sentence.trim() !== "") // 공백 필터링
                    .map((sentence, index) => (
                      <li key={index}>{sentence}.</li> // 다시 '.' 추가하여 출력
                    ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="px-3 py-3 border-black border-[3px] bg-[#FFFFFF]">
        <HospitalRecommendComponent />
      </div>
    </div>
  );
}
