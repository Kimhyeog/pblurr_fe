// pages/SkinDiagnosisPage.tsx
"use client";

import React, { useState } from "react";
import { diagnoseSkinDisease, getSkinDiseaseDetail } from "@/api/diease/index";
import Image from "next/image";
import { DetailDieaseInfo, DiagnosisResult } from "@/types/types";
import { motion, AnimatePresence } from "framer-motion";

const SkinDiagnosisPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [diagnosisResult, setDiagnosisResult] =
    useState<DiagnosisResult | null>(null);
  const [detailInfo, setDetailInfo] = useState<DetailDieaseInfo | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!image) return;

    const result = await diagnoseSkinDisease(image);
    setDiagnosisResult(result);

    if (result?.disease) {
      const detail = await getSkinDiseaseDetail(result.disease);
      setDetailInfo(detail);
    }
  };

  return (
    <div>
      <h1>피부 질환 진단</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleSubmit}>진단 시작</button>

      {diagnosisResult && (
        <div>
          <h2>진단 결과</h2>
          <p>질환: {diagnosisResult.disease}</p>
          <p>확률: {Math.round(diagnosisResult.probability * 100)}%</p>
          <p>치료법: {diagnosisResult.treatment}</p>
          <Image
            src={diagnosisResult.imageUrl}
            alt="진단 이미지"
            width={200}
            height={200}
          />
        </div>
      )}

      {detailInfo && (
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="expanded-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-2 text-sm text-gray-700"
            >
              <p className="mb-2">
                후천 멜라닌세포모반은 자외선과 관련이 깊고, 다양한 크기와 색을
                보입니다.
              </p>
              <p>
                치료가 필요한 경우 드물지만, 의심 증상이 있다면 피부과 전문의의
                진단이 필요합니다.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-2 text-blue-600 font-medium hover:underline"
      >
        {isExpanded ? "접기 ▲" : "더보기 ▼"}
      </button>
    </div>
  );
};

export default SkinDiagnosisPage;
