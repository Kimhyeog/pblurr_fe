import Image from "next/image";
import React from "react";

interface Props {
  result1_Date: string;
  result2_Date: string;
  result1_Images: string[];
  result2_Images: string[];
}

function CompareImageBox(props: Props) {
  const { result1_Date, result2_Date, result1_Images, result2_Images } = props;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="flex-1 bg-[#E7F6FA] p-6 rounded-3xl shadow-lg border border-[#BEE6F2]">
      <div className="w-full text-center sm:text-left py-2 px-4 mb-2 rounded-lg bg-[#FFFFFF] font-bold text-xl text-[#5CA7C8] border-2 border-[#3C9FCA]">
        분석 이미지 비교
      </div>

      {/* 모바일에서는 flex-col, sm 이상에서는 grid-cols-2 */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-6">
        {[0, 1, 2].map((idx) => {
          // 모바일에서는 정면(1번)만 보여주고, sm 이상에서 모두 보여줌
          const isMobileOnly = idx !== 1;
          return (
            <React.Fragment key={idx}>
              <div
                className={`flex flex-col items-center ${
                  isMobileOnly ? "hidden sm:flex" : ""
                }`}
              >
                <span className="font-bold text-lg text-[#5CA7C8] mb-1">
                  {formatDate(result1_Date)} - {labelMap[idx]}
                </span>
                <div className="relative w-[200px] h-[150px] sm:w-[150px] sm:h-[150px] bg-white">
                  <Image
                    src={result1_Images[idx]}
                    alt={`result1-img-${idx}`}
                    fill
                    className="rounded-xl shadow-sm border border-[#DEDCE1] object-contain"
                  />
                </div>
              </div>
              <div
                className={`flex flex-col items-center ${
                  isMobileOnly ? "hidden sm:flex" : ""
                }`}
              >
                <span className="font-bold text-lg text-[#5CA7C8] mb-1">
                  {formatDate(result2_Date)} - {labelMap[idx]}
                </span>
                <div className="relative w-[200px] h-[150px] sm:w-[150px] sm:h-[150px] bg-white">
                  <Image
                    src={result2_Images[idx]}
                    alt={`result2-img-${idx}`}
                    fill
                    className="rounded-xl shadow-sm border border-[#DEDCE1] object-contain"
                  />
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

const labelMap = ["좌 30도", "정면", "우 30도"];

export default CompareImageBox;
