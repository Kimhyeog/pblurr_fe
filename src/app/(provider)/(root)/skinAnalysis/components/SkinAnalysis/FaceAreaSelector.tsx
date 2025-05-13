import Image from "next/image";
import React from "react";

interface FaceAreaSelectorMobileProps {
  onSelect: (category: string) => void;
  selectedCategory: string;
}

const areaPositions: { [key: string]: { top: string; left: string } } = {
  이마: { top: "17%", left: "50%" },
  "왼쪽 눈가 주름": { top: "35%", left: "24%" },
  "오른쪽 눈가 주름": { top: "35%", left: "76%" },
  "왼쪽 볼": { top: "50%", left: "27%" },
  "오른쪽 볼": { top: "50%", left: "73%" },
  하안부: { top: "65%", left: "50%" },
};

const FaceAreaSelectorMobile: React.FC<FaceAreaSelectorMobileProps> = ({
  onSelect,
  selectedCategory,
}) => {
  const categories = [
    "전체",
    "이마",
    "왼쪽 눈가 주름",
    "오른쪽 눈가 주름",
    "왼쪽 볼",
    "오른쪽 볼",
    "하안부",
  ];

  return (
    <div
      className="relative w-full max-w-[600px] mx-auto mb-6 
      "
      // // 모바일일떄 안보이기 수정&&
      // hidden visible
    >
      {/* 얼굴 이미지 */}
      <Image
        src="/images/front-face.png"
        alt="Face"
        className="w-full h-full object-cover rounded-lg"
        width={600}
        height={600}
      />

      {/* 얼굴 부위 버튼들 */}
      {categories.map((category) => {
        if (category === "전체") return null;

        const position = areaPositions[category];
        if (!position) return null;

        const isEyeWrinkle =
          category === "왼쪽 눈가 주름" || category === "오른쪽 눈가 주름";
        const isCheek = category === "왼쪽 볼" || category === "오른쪽 볼";

        const displayCategory = isEyeWrinkle
          ? "눈가"
          : isCheek
          ? "볼"
          : category;

        const isSelected = selectedCategory === displayCategory;

        return (
          <button
            key={category}
            onClick={() => onSelect(displayCategory)}
            className={`absolute px-3 py-1 rounded-full whitespace-nowrap text-sm sm:text-2xl transform -translate-x-1/2 -translate-y-1/2 ${
              isSelected
                ? "bg-[#7FC5E0] text-white"
                : "bg-[#3B6F82] text-white hover:bg-[#7FC5E0]"
            }`}
            style={{ top: position.top, left: position.left }}
          >
            {/* "왼쪽 눈가 주름"과 "오른쪽 눈가 주름" 버튼 텍스트 중앙 정렬 */}
            <span className="block text-center">
              {category === "왼쪽 눈가 주름" || category === "오른쪽 눈가 주름"
                ? category.split(" ").map((word, index) => (
                    <React.Fragment key={index}>
                      {word}
                      {index === 0 && <br />} {/* 첫 번째 단어 뒤에만 줄바꿈 */}
                    </React.Fragment>
                  ))
                : category}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FaceAreaSelectorMobile;
