"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface MainPostsFilterProps {
  setSortTypeLatest: (sortLatest: string) => void;
  setSortTypeLiked: (sortLiked: string) => void;
  setSortTypeCommented: (sortCommented: string) => void;
}

const tabs = [
  { id: "latest", label: "최신 순" },
  { id: "liked", label: "좋아요 순" },
  { id: "commented", label: "댓글 순" },
];

function MainPostsFilter(props: MainPostsFilterProps) {
  const { setSortTypeLatest, setSortTypeLiked, setSortTypeCommented } = props;
  const [selected, setSelected] = useState("latest");

  const handleClick = (id: string) => {
    setSelected(id);
    if (id === "latest") setSortTypeLatest("latest");
    else if (id === "liked") setSortTypeLiked("liked");
    else if (id === "commented") setSortTypeCommented("commented");
  };

  return (
    <div className="hidden sm:flex relative border-3 border-pink-300 rounded-2xl p-1 bg-white shadow-sm">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleClick(tab.id)}
          className={`relative z-10 px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200
            ${selected === tab.id ? "text-pink-600" : "text-gray-500"}`}
        >
          {tab.label}
          {selected === tab.id && (
            <motion.div
              layoutId="underline"
              className="absolute inset-0 bg-pink-100 rounded-full z-[-1]"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

export default MainPostsFilter;
