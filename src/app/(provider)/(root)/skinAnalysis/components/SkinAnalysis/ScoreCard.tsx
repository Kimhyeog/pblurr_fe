import React from "react";

interface ScoreCardProps {
  label: string;
  score: number;
  percentage: number;
  status: "Good" | "Bad"; // "Normal" 제거하고 Good, Bad만 사용
  max: number;
}

function ScoreCard(props: ScoreCardProps) {
  const { label, score, percentage, status, max } = props;

  // 상태별 스타일 설정
  const statusStyle = {
    Good: "bg-[#bef257] text-white", // Good 상태 색상
    Bad: "bg-[#ed5656] text-white", // Bad 상태 색상
  };

  const labelTextColor = status === "Bad" ? "text-[#ed5656]" : "text-[#3B6F82]";

  // 바 색상 설정
  const barColor = {
    Good: "#bef257", // Good 상태 바 색상
    Bad: "#ed5656", // Bad 상태 바 색상
  };

  return (
    <div className="w-full bg-white border border-[#DEDCE1] rounded-2xl shadow-sm p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span className={`text-lg font-bold ${labelTextColor}`}>{label}</span>
        <span
          className={`w-20 text-center text-sm px-2 py-1 rounded-full font-semibold ${statusStyle[status]}`}
        >
          {status}
        </span>
      </div>

      <div className="flex text-4xl items-end font-bold text-[#3B6F82] text-center">
        <p>{score}</p>
        <span className="text-black text-lg">&nbsp;/ {max}</span>
      </div>

      <div className="w-full bg-[#DEDCE1] rounded-full h-4 overflow-hidden">
        <div
          className="h-full transition-all duration-300 rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: barColor[status],
          }}
        ></div>
      </div>
    </div>
  );
}

export default ScoreCard;
