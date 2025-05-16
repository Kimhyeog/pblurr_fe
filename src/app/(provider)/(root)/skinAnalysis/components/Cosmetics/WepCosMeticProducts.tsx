import { ProductRecommendation } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { JSX } from "react";
import { motion } from "framer-motion";
import {
  FaRegSmileBeam,
  FaMagic,
  FaStar,
  FaPalette,
  FaCompressAlt,
} from "react-icons/fa";

const getCategoryTheme = (category: string) => {
  switch (category) {
    case "통합 주름":
      return {
        icon: <FaRegSmileBeam />,
        color: "#5ca8c8",
        bg: "#e0f4fa",
        border: "#b2e2f3",
        badgeStyle: "bg-white text-[#333] border border-[#aacbdc] shadow-sm",
        textStyle: "text-[#4a99b3]",
      };
    case "통합 색소침착":
    case "통합 색소 침착":
      return {
        icon: <FaPalette />,
        color: "#a477d7",
        bg: "#f6f0fd",
        border: "#d7c4f3",
        badgeStyle: "bg-[#eee4fa] text-[#7a55ba] border border-[#c8b3e6]",
        textStyle: "text-[#7e59b4]",
      };
    case "통합 모공":
      return {
        icon: <FaCompressAlt />,
        color: "#f5a623",
        bg: "#fff8e7",
        border: "#fcd6a3",
        badgeStyle: "bg-[#fff3ce] text-[#b67a10] border border-[#f5c879]",
        textStyle: "text-[#c8871c]",
      };
    default:
      return {
        icon: <FaMagic />,
        color: "#7777cc",
        bg: "#f0f3ff",
        border: "#c8d2ff",
        badgeStyle: "bg-[#e3e9ff] text-[#444b8f] border border-[#b5c1f7]",
        textStyle: "text-[#5a63b5]",
      };
  }
};

type Props = {
  cosmetics: ProductRecommendation[];
};

function WepCosMeticProducts({ cosmetics }: Props) {
  return (
    <div className="w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {cosmetics?.map((recommendation, index) => {
        const theme = getCategoryTheme(recommendation.category);

        return (
          <motion.div
            key={index}
            className="w-full bg-white rounded-3xl px-6 sm:px-10 py-12 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* 카테고리 헤더 */}
            <div
              className="relative w-full max-w-xl mx-auto rounded-[2rem] px-6 py-6 mb-12 border shadow-[inset_0_1px_6px_rgba(0,0,0,0.03)] overflow-hidden"
              style={{
                backgroundColor: theme.bg,
                borderColor: theme.border,
              }}
            >
              {/* 아이콘 + 제목 */}
              <div className="flex items-center justify-center gap-3 mb-3">
                <div
                  className="p-2 rounded-full shadow bg-white"
                  style={{ color: theme.color }}
                >
                  {theme.icon}
                </div>
                <h2
                  className={`text-lg sm:text-xl font-bold ${theme.textStyle}`}
                >
                  {recommendation.category} 추천 제품
                </h2>
              </div>

              {/* 점수 뱃지 */}
              <div className="flex justify-center">
                <span
                  className={`text-xs sm:text-sm font-medium px-4 py-1 rounded-full transition duration-200 ${
                    recommendation.score === "high"
                      ? theme.badgeStyle
                      : "bg-[#f0f0f0] text-[#888] border border-[#ccc]"
                  }`}
                >
                  {recommendation.score === "high"
                    ? "✨ High 추천"
                    : "⚠️ Low 추천"}
                </span>
              </div>

              {/* 장식 원형 배경 */}
              <div
                className="absolute -top-6 -left-6 w-24 h-24 opacity-20 rounded-full blur-2xl"
                style={{ backgroundColor: theme.color }}
              />
              <div
                className="absolute -bottom-6 -right-6 w-32 h-32 opacity-20 rounded-full blur-2xl"
                style={{ backgroundColor: theme.color }}
              />
            </div>

            {/* 제품 리스트 */}
            <div className="w-full flex flex-wrap justify-center gap-6 pb-2">
              {recommendation.products.map((product, idx) => (
                <motion.div
                  key={idx}
                  className="group flex flex-col items-center bg-[#fafafa] p-5 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200 w-[150px] sm:w-[170px] md:w-[190px]"
                  whileHover={{ scale: 1.04 }}
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-200 shadow-sm transition-transform group-hover:scale-105">
                    <Image
                      src={product.productImage}
                      alt={product.product}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="mt-4 text-sm font-semibold text-center text-gray-800">
                    {product.brand}
                  </span>
                  <span className="mt-1 text-xs text-center text-gray-600 line-clamp-2 h-[3rem]">
                    {product.product}
                  </span>
                  <Link
                    href={product.productLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-xs font-medium text-white bg-[#5ca8c8] px-4 py-1.5 rounded-full hover:bg-[#4694b2] transition-colors duration-200"
                  >
                    제품 보기
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default WepCosMeticProducts;
