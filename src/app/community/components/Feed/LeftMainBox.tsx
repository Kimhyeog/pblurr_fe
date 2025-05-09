"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CMButton from "../common/CMButton";

const feeds = [
  {
    title: "피부에 좋은 과일 식품 5가지",
    description: "비타민이 풍부한 과일로 피부 건강을 챙기세요.",
    link: "https://blog.naver.com/jun_clinic/223847750611",
    category: "건강 정보",
    image: "/images/Community/LeftMainFeedImg_headth.jpg",
  },
  {
    title: "날씨 변화에 민감한 피부, 이렇게 관리하세요",
    description: "사계절 날씨에 따른 피부관리 습관을 알아보세요.",
    link: "https://blog.naver.com/ok_hira/223268867410",
    category: "피부 습관",
    image: "/images/Community/LeftMainFeedImg_habit.jpg",
  },
  {
    title: "2024 추천 화장품 BEST 5",
    description: "민감성 피부를 위한 화장품 리스트를 소개합니다.",
    link: "https://www.torriden.com/board/view.php?&bdId=brandcampaign&sno=12",
    category: "제품 추천",
    image: "/images/Community/LeftMainFeedImg_cosmetics.jpg",
  },
];

function LeftMainBox() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentFeed = feeds[selectedIndex];

  return (
    <div className="relative w-full sm:h-[400px] rounded-xl overflow-hidden">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeed.image}
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${currentFeed.image})` }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>

      {/* 텍스트 & 버튼 레이어 */}
      <div className="absolute bottom-4 left-4 z-10 text-white bg-black/50 px-4 py-5 rounded-2xl">
        <p className="text-2xl font-semibold">{currentFeed.title}</p>
        <p className="text-md">{currentFeed.description}</p>
        <div className="flex gap-2 mt-2">
          {feeds.map((feed, index) => (
            <CMButton
              key={feed.title}
              onClick={() => setSelectedIndex(index)}
              className={index === selectedIndex ? " text-black" : ""}
            >
              {feed.category}
            </CMButton>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeftMainBox;
