"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface MobileMainPostsFilterProps {
  setSortTypeLatest: (sortLatest: string) => void;
  setSortTypeLiked: (sortLiked: string) => void;
  setSortTypeCommented: (sortCommented: string) => void;
}

const MobileMainPostsFilter = ({
  setSortTypeLatest,
  setSortTypeLiked,
  setSortTypeCommented,
}: MobileMainPostsFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("최신 순");

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);

    switch (option) {
      case "최신 순":
        setSortTypeLatest("latest");
        break;
      case "좋아요 순":
        setSortTypeLiked("liked");
        break;
      case "댓글 순":
        setSortTypeCommented("commented");
        break;
    }
  };

  const options = ["최신 순", "좋아요 순", "댓글 순"];

  return (
    <div className="relative inline-block text-left text-sm sm:text-[16px] font-medium sm:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center 
        w-[110px] sm:w-[120px] 
        h-[30px] sm:h-[40px] 
        px-2 py-1 sm:px-4 sm:py-2 
        text-pink-300 bg-pink-50 border border-pink-400 rounded-xl shadow-sm"
      >
        {selected}
        <ChevronDown className="w-4 h-4 text-pink-500" />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-[160px] rounded-xl bg-white border border-pink-200 shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="block w-full text-left px-5 py-3 text-pink-500 hover:bg-pink-100 hover:text-pink-700"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileMainPostsFilter;
