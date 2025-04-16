import React from "react";

interface ScoreCardProps {
  label: string;
  score: number;
  percentage: number;
  status: "Normal" | "Good" | "Bad";
}

function ScoreCard(props: ScoreCardProps) {
  const { label, score, percentage, status } = props;
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-60 flex flex-col items-start gap-3">
      {/* 아이콘 + 라벨 */}
      <div className="flex items-center gap-2">
        <div className="bg-[#C2EDED] p-2 rounded-xl text-[24px]">아</div>
        <span className="text-md font-semibold">{label}</span>
      </div>

      {/* 점수 */}
      <div className="text-2xl font-bold text-gray-800">{score}점</div>

      {/* 상태 */}
      <span className="bg-[#C2EDED] text-sm px-2 py-1 rounded-md text-[#2E8B8B]">
        {status}
      </span>

      {/* 막대 그래프 */}
      <div className="w-full bg-[#DDF2F2] rounded-full h-6 overflow-hidden mt-1">
        <div
          className="bg-[#2E8B8B] h-full flex justify-start items-center text-white text-sm font-medium rounded-full transition-all duration-300
            
          "
          style={{ width: `${percentage}%` }}
        >
          <span className="bg-[#0d3f3f] text-white rounded-4xl px-2 ml-2">
            {score}점
          </span>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
