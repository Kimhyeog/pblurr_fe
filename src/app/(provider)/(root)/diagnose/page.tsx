"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { DetailDieaseInfo, DiagnosisResult } from "@/types/types";
import ProbabilityBar from "./components/ProbabilityBar";
import ModalUse from "@/components/Modal/ModalUse";
import DiagnoseBox from "./components/DiagnoseBox";
import SeoulMap from "./components/SeoulMap";
import { motion, AnimatePresence } from "framer-motion";
import DieaseDetail from "./components/DieaseDetail";
import Swal from "sweetalert2";
import DiagnoseMainBox from "./components/DiagnoseMainBox";

export default function Page() {
  const [imageSrc, setImageSrc] = useState<string | null>("");
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [detailInfo, setDetailInfo] = useState<DetailDieaseInfo | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const listVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (!imageSrc) setDiagnosis(null);
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  return (
    <div className="max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto min-h-screen flex flex-col mt-5 gap-y-3">
      <motion.ul
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-5"
      >
        {/* 제목 */}
        <div className="rounded-2xl flex flex-col items-center px-3 py-5 border-0 bg-white">
          <motion.li variants={itemVariants} className="w-full">
            <div className="lg:text-3xl font-bold pl-4 py-1 w-full text-center sm:text-left text-2xl">
              피부 질환 진단하기
            </div>
          </motion.li>

          {/* 진단 업로드 박스 */}
          <motion.li variants={itemVariants} className="w-full">
            <div className="w-full p-5">
              <DiagnoseBox
                setImage={setImageSrc}
                setDiagnose={setDiagnosis}
                setDetailInfo={setDetailInfo}
              />
            </div>
          </motion.li>
        </div>
      </motion.ul>

      {/* 병명 설명 (진단 결과 없을 때) */}
      {!diagnosis && <DiagnoseMainBox />}

      {/* 진단 결과 영역 */}
      {diagnosis && (
        <div className="rounded-2xl flex flex-col items-center">
          <div className="flex flex-col gap-y-3 px-3 py-5 rounded-lg border-0 bg-white w-full">
            <h3 className="px-2 text-center sm:text-left text-xl sm:text-2xl font-bold">
              피부 질환 진단 결과
            </h3>

            {/* 질병명 */}
            <div className="flex justify-between items-center gap-x-4 px-4 text-base sm:text-lg border-[2px] border-[#DEDCE1] py-2 rounded-lg">
              <div className="flex items-center gap-x-4">
                <Image
                  src="/images/질병아이콘.png"
                  alt="의심 질환 아이콘"
                  width={32}
                  height={32}
                />
                <p className="font-bold text-xl">
                  질환 :{" "}
                  <span className="text-[#e85959]">{diagnosis.disease}</span>
                </p>
              </div>
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

            {/* 질병 상세보가 */}
            {detailInfo && (
              <div className="text-base sm:text-lg border-[2px] border-[#DEDCE1] py-2 px-2 rounded-lg">
                <div className="flex  items-center gap-x-4 px-2 pb-2 justify-between">
                  <div className="flex items-center gap-x-4">
                    <Image
                      src="/images/질병아이콘.png"
                      alt="의심 질환 아이콘"
                      width={32}
                      height={32}
                    />
                    <p className="font-bold text-xl">질환 상세정보</p>
                  </div>
                  <div className="mr-3">
                    <button
                      className="px-3 py-2 bg-[#e85959] text-white hover:bg-[#e85959b7] rounded-2xl"
                      onClick={() => {
                        if (detailOpen) {
                          setDetailOpen(false);
                        } else {
                          Swal.fire(
                            "경고",
                            `해당 질환의 상세 정보에는 피부 질환의 실제 예시 이미지가 포함되어 있습니다.
피부 질환 이미지 특성상 다소 불편하게 느껴질 수 있으니,
이미지 확인을 원하시는 경우에만 진행해 주세요.`,
                            "warning"
                          ).then(() => {
                            setDetailOpen(true);
                          });
                        }
                      }}
                    >
                      질횐 상세 보기
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center border-[2px] border-[#DEDCE1]  rounded-lg">
                  <div className="py-5 px-5 rounded-lg">
                    <Image
                      src={diagnosis.imageUrl}
                      alt="의심 질환 예시 이미지"
                      width={400}
                      height={400}
                      className="rounded-2xl"
                    />
                  </div>
                  <span className="w-full border-[2px] border-[#DEDCE1]" />
                  <AnimatePresence initial={false}>
                    {detailOpen && (
                      <motion.div
                        key="expanded-content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden mt-2 text-sm text-gray-700"
                      >
                        <DieaseDetail detailInfo={detailInfo} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* 이미지 + 치료법 */}
            <div className="text-base sm:text-lg flex flex-col lg:flex-col gap-y-4 lg:gap-x-4 border-[2px] border-[#DEDCE1] py-2 px-2 rounded-lg">
              <div className="flex flex-col gap-y-5">
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
                  <span className="text-sm text-[#e85959] font-extrabold">
                    ※ {diagnosis.source}에서 제공된 정보입니다. 보다 정확한
                    진단과 치료를 위해 가까운 병원에 방문하세요.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 모달 (내 주변 병원 찾기) */}
          <div className="relative w-full h-full">
            <ModalUse buttonText="내 주변 병원찾기">
              {(closeModal) => (
                <>
                  <SeoulMap />
                  <button
                    className="font-bold cursor-pointer absolute top-[10px] right-[10px] text-3xl"
                    onClick={closeModal}
                  >
                    ×
                  </button>
                </>
              )}
            </ModalUse>
          </div>
        </div>
      )}
    </div>
  );
}
