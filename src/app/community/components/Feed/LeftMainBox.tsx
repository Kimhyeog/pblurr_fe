"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CMButton from "../common/CMButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const feeds = [
  {
    title: "피부재생에 좋은 음식 시너지 효과 가능해요",
    description: "피부 영양이 풍부한 음식으로 피부 건강을 챙기세요.",
    link: "/community/post/admin/1",
    category: "건강 정보",
    image: "/images/Community/LeftMainFeedImg_headth.jpg",
  },
  {
    title: "건조한 겨울에 민감한 피부, 이렇게 관리하세요",
    description: "겨울 날씨에 따른 피부관리 습관을 알아보세요.",
    link: "/community/post/admin/2",
    category: "피부 습관",
    image: "/images/Community/LeftMainFeedImg_habit.jpg",
  },
  {
    title: "2024 올해 추천 화장품",
    description: "민감성 피부를 위한 기초 화장품을 소개합니다.",
    link: "/community/post/admin/3",
    category: "제품 추천",
    image: "/images/Community/LeftMainFeedImg_cosmetics.jpg",
  },
];

function LeftMainBox() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentFeed = feeds[selectedIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % feeds.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % feeds.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? feeds.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full min-h-[400px] rounded-xl overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <Link href={currentFeed.link}>
            <motion.div
              key={currentFeed.image}
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${currentFeed.image})` }}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </Link>
        </AnimatePresence>
      </div>

      {/* 텍스트 레이어 */}
      <div className="absolute bottom-20 md:bottom-4 left-4 z-10 text-white bg-black/50 px-4 py-5 rounded-2xl max-w-[90%]">
        <p className="text-xl md:text-2xl font-semibold">{currentFeed.title}</p>
        <p className="text-sm md:text-md">{currentFeed.description}</p>

        {/* 카테고리 버튼 */}
        <div className="flex flex-wrap gap-2 mt-2">
          {feeds.map((feed, index) => (
            <CMButton
              key={feed.title}
              onClick={() => setSelectedIndex(index)}
              className={index === selectedIndex ? "text-black" : ""}
            >
              {feed.category}
            </CMButton>
          ))}
        </div>
      </div>

      {/* 컨트롤 버튼: 모바일은 하단 중앙, PC는 우측 상단 */}
      <div className="absolute top-2 left-2 z-20 flex items-center space-x-2">
        <button
          onClick={handlePrev}
          className="bg-black/50 text-white p-2 md:p-1 rounded-full hover:bg-black/70  cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={handleNext}
          className="bg-black/50 text-white p-2 md:p-1 rounded-full hover:bg-black/70 cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default LeftMainBox;
