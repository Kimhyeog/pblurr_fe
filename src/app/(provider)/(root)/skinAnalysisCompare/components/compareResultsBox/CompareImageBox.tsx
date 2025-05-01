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

  // 날짜 문자열을 YYYY-MM-DD 형식으로 변환
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // 유효하지 않은 날짜면 원본 그대로
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-[#DEDCE1]">
      <h3 className="text-[#3c9fca] font-bold text-lg mb-4">
        📸 분석 이미지 비교
      </h3>
      <div className="grid grid-cols-2 gap-6">
        {[0, 1, 2].map((idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center">
              <span className="text-sm text-[#5CA7C8] font-medium mb-1">
                {formatDate(result1_Date)} - {labelMap[idx]}
              </span>
              <Image
                src={result1_Images[idx]}
                alt={`result1-img-${idx}`}
                width={300}
                height={200}
                className="rounded-xl shadow-sm border border-[#DEDCE1]"
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-[#5CA7C8] font-medium mb-1">
                {formatDate(result2_Date)} - {labelMap[idx]}
              </span>
              <Image
                src={result2_Images[idx]}
                alt={`result2-img-${idx}`}
                width={300}
                height={200}
                className="rounded-xl shadow-sm border border-[#DEDCE1]"
              />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const labelMap = ["좌 30도", "정면", "우 30도"];

export default CompareImageBox;
