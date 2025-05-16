import { ProductRecommendation } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { JSX } from "react";
import { motion } from "framer-motion";
import { FaRegSmileBeam, FaMagic, FaStar } from "react-icons/fa";

const CATEGORY_ICONS: Record<string, JSX.Element> = {
  "통합 주름": <FaRegSmileBeam className="text-2xl text-[#5ca8c8]" />,
  "통합 색소침착": <FaMagic className="text-2xl text-[#5ca8c8]" />,
  "통합 모공": <FaStar className="text-2xl text-[#5ca8c8]" />,
};

type Props = {
  cosmetics: ProductRecommendation[];
};

function MobileCosMeticProducts({ cosmetics }: Props) {
  return (
    <div className="w-full text-center bg-white px-4 py-8 space-y-10">
      {cosmetics?.map((recommendation, index) => (
        <motion.div
          key={index}
          className="w-full text-center bg-white rounded-2xl p-6 shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
        >
          {/* 카테고리 카드 스타일 */}
          <div className="w-full max-w-xs mx-auto bg-[#f8f8f8] shadow rounded-xl py-4 px-6 mb-6 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              {CATEGORY_ICONS[recommendation.category] || (
                <FaStar className="text-2xl text-[#5ca8c8]" />
              )}
              <h2 className="text-lg font-semibold text-gray-700">
                {recommendation.category} 추천 제품
              </h2>
            </div>

            <span
              className={`text-sm font-bold px-3 py-1 rounded-full ${
                recommendation.score === "high"
                  ? "bg-blue-100 text-blue-600 border border-blue-300"
                  : "bg-gray-100 text-gray-600 border border-gray-300"
              }`}
            >
              {recommendation.score === "high" ? "High" : "Low"}
            </span>
          </div>

          {/* 제품 리스트 */}
          <div className="w-full flex gap-4 pb-2 ">
            {recommendation.products.map((product, idx) => (
              <motion.div
                key={idx}
                className=" w-40 h-50 flex flex-col items-center bg-[#f9f9f9] p-3 rounded-xl shadow hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={product.productImage}
                  alt={product.product}
                  width={96}
                  height={96}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                />
                <span className="mt-2 text-sm font-semibold text-center text-gray-800">
                  {product.brand}
                </span>
                <span className="text-xs text-center text-gray-600 line-clamp-2">
                  {product.product}
                </span>
                <Link
                  href={product.productLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-xs font-medium text-white bg-[#5ca8c8] px-3 py-1 rounded-full hover:bg-[#4a94b2] transition"
                >
                  제품 보기
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default MobileCosMeticProducts;
