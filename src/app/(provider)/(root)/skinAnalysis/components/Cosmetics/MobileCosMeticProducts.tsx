"use client";

import { ProductRecommendation } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { JSX, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRegSmileBeam,
  FaMagic,
  FaStar,
  FaPalette,
  FaCompressAlt,
} from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const CATEGORY_ICONS: Record<string, JSX.Element> = {
  "통합 주름": <FaRegSmileBeam className="text-2xl text-[#5ca8c8]" />,
  "통합 색소침착": <FaMagic className="text-2xl text-[#5ca8c8]" />,
  "통합 모공": <FaStar className="text-2xl text-[#5ca8c8]" />,
};

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
          {/* 카테고리 카드 */}
          <div className="w-full max-w-xs mx-auto bg-[#f8f8f8] shadow rounded-xl py-4 px-6 mb-6 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              {CATEGORY_ICONS[recommendation.category] || (
                <FaStar className="text-2xl text-[#5ca8c8]" />
              )}
              <h2
                className="
                whitespace-nowrap
              text-md
              sm:text-lg
              font-semibold text-gray-700"
              >
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

          {/* 제품 슬라이더 */}
          <ProductSlider products={recommendation.products} />
        </motion.div>
      ))}
    </div>
  );
}

function ProductSlider({
  products,
}: {
  products: ProductRecommendation["products"];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const direction = 1;

  return (
    <div className="relative flex items-center justify-center">
      {/* 왼쪽 버튼 */}
      <button
        onClick={handlePrev}
        className="absolute left-0 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
      >
        <IoChevronBack size={24} />
      </button>

      {/* 슬라이드 박스 */}
      <div className="w-2/3 h-[220px] overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            className="w-full flex-shrink-0"
            initial={{ x: direction * 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -direction * 100, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-full h-full flex justify-center">
              <div className="w-40 h-52 flex flex-col items-center bg-[#f9f9f9] p-3 rounded-xl shadow">
                <Image
                  src={products[currentIndex].productImage}
                  alt={products[currentIndex].product}
                  width={96}
                  height={96}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                />
                <span className="mt-2 text-sm font-semibold text-center text-gray-800">
                  {products[currentIndex].brand}
                </span>
                <span className="text-xs text-center text-gray-600 line-clamp-2">
                  {products[currentIndex].product}
                </span>
                <Link
                  href={products[currentIndex].productLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-xs font-medium text-white bg-[#5ca8c8] px-3 py-1 rounded-full hover:bg-[#4a94b2] transition"
                >
                  제품 보기
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 오른쪽 버튼 */}
      <button
        onClick={handleNext}
        className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
      >
        <IoChevronForward size={24} />
      </button>
    </div>
  );
}

export default MobileCosMeticProducts;
