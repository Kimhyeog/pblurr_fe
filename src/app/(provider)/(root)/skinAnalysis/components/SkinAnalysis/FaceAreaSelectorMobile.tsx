// src/app/(provider)/(root)/skinAnalysis/components/FaceAreaSelector.tsx

import React from "react";

interface FaceAreaSelectorMobileProps {
  categories: string[];
  onSelect: (category: string) => void;
  selectedCategory: string;
}

const FaceAreaSelectorMobile: React.FC<FaceAreaSelectorMobileProps> = ({
  categories,
  onSelect,
  selectedCategory,
}) => {
  return (
    <div className="flex gap-4 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-full text-white ${
            selectedCategory === category
              ? "bg-[#7FC5E0]"
              : "bg-[#3B6F82] hover:bg-[#7FC5E0]"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FaceAreaSelectorMobile;
