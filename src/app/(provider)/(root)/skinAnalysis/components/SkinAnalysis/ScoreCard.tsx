import React from "react";

interface ScoreCardProps {
  label: string;
  score: number;
  percentage: number;
  status: "Normal" | "Good" | "Bad";
}

function ScoreCard(props: ScoreCardProps) {
  const { label, score, percentage, status } = props;

  const statusStyle = {
    Good: "bg-[#7FC5E0] text-white",
    Normal: "bg-[#DEDCE1] text-gray-800",
    Bad: "bg-[#F87171] text-white",
  };

  const labelTextColor = status === "Bad" ? "text-[#F87171]" : "text-[#3B6F82]";

  const barColor = {
    Good: "#7FC5E0",
    Normal: "#7FC5E0",
    Bad: "#F87171",
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

      <div className="flex text-4xl font-bold text-[#3B6F82] text-center">
        {score}점
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
