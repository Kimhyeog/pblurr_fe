"use client";

import GeneralModal from "@/components/Modal/GeneralModal";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { SkinAnalysisResult } from "@/types/types";
import UploadFaceBox from "../UploadFace/UploadFaceBox";

interface Props {
  setResult: (skinAnalysisResult: SkinAnalysisResult | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

function DiagnoseStartInfo(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="p-6 rounded-xl bg-[#f0f9fc] shadow-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* 내용1 */}
        <h2 className="text-center hidden md:block text-2xl font-bold text-[#5CA7C8] mb-4">
          <strong className="text-[#5CA7C8]">
            나만의 피부 맞춤 분석, 지금 시작해요!
          </strong>{" "}
          🧴✨
        </h2>

        {/* 내용2 */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <Image
            src="/images/PhotosThatLeadToAnalysis.png" // 예시 이미지를 public/images 경로에 넣어주세요
            alt="피부 미용 진단 요약 이미지"
            width={600}
            height={300}
            className="rounded-md mx-auto"
          />
          <p className="text-sm text-gray-600 text-center mt-2"></p>
        </div>

        {/* 내용3 - 분석 시작 버튼 */}
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#5CA7C8] hover:bg-[#4d97b9] text-white font-semibold py-2 px-6 rounded-full shadow-md transition"
          >
            분석 시작하기
          </button>
        </div>
      </motion.div>

      {/* 간단한 모달창 */}
      {isModalOpen && (
        <GeneralModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <UploadFaceBox {...props} onClose={() => setIsModalOpen(false)} />
        </GeneralModal>
      )}
    </>
  );
}

export default DiagnoseStartInfo;
