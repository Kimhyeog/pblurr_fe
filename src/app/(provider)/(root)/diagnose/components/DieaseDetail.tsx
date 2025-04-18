import { DetailDieaseInfo } from "@/types/types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Props {
  detailInfo: DetailDieaseInfo;
}

function DieaseDetail({ detailInfo }: Props) {
  const { disease, imageUrls, definition, cause, symptom, source } = detailInfo;
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{disease}</h2>

      {/* 이미지 갤러리 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {imageUrls.map((url, index) => (
          <Image
            key={index}
            src={url}
            width={200}
            height={200}
            alt={`${disease} 예시 이미지 ${index + 1}`}
            className="w-full h-48 object-cover rounded-2xl border"
          />
        ))}
      </div>

      {/* 정의 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">정의</h3>
        <p className="text-gray-600 whitespace-pre-line">{definition}</p>
      </div>

      {/* 더보기 섹션 */}
      <AnimatePresence initial={false}>
        {showMore && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden space-y-4"
          >
            {/* 원인 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">원인</h3>
              <p className="text-gray-600 whitespace-pre-line">{cause}</p>
            </div>

            {/* 증상 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">증상</h3>
              <p className="text-gray-600 whitespace-pre-line">{symptom}</p>
            </div>

            {/* 출처 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-1">출처</h3>
              <p className="text-gray-500">{source}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setShowMore(!showMore)}
        className="text-blue-600 hover:underline font-medium"
      >
        {showMore ? "접기 ▲" : "더보기 ▼"}
      </button>
    </div>
  );
}

export default DieaseDetail;
