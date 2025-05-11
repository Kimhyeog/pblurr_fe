//src\app\(provider)\(root)\skincaremission\components\ScoreBoard\AverageScoreBoard.tsx

import { motion } from "framer-motion";
import { FaStar, FaFire } from "react-icons/fa";

export interface AverageScoreBoardProps {
  averageScore: number; //오늘 일일 미션의 평균 점수 (100점 만점)
}

const getColor = (score: number) => {
  if (score >= 80) return "green";
  if (score <= 40) return "orange";
  return "blue";
};

export const AverageScoreBoard = ({ averageScore }: AverageScoreBoardProps) => {
  const color = getColor(averageScore);

  const textColor = {
    green: "text-green-500",
    orange: "text-orange-500",
    blue: "text-blue-500",
  }[color];

  const barColor = {
    green: "bg-green-400",
    orange: "bg-orange-400",
    blue: "bg-blue-400",
  }[color];

  return (
    <div className="w-full h-full flex flex-col gap-y-3 border-4 border-[#5CA7C8] rounded-2xl px-4 py-4 shadow-xl bg-gradient-to-b from-sky-50 to-white min-h-[250px]">
      {/* 제목 및 설명 */}
      <div className=" text-center mb-2">
        <h3 className="text-lg font-bold text-sky-600 mb-1">
          오늘의 평균 점수
        </h3>
        <p className="text-xs text-gray-500">
          오늘 수행한 미션에 대한 점수입니다.
        </p>
      </div>

      {/* 점수 뱃지 */}
      <motion.div
        className={`relative px-4 py-2 bg-white rounded-full border-2 border-sky-300 ${textColor} text-2xl font-extrabold flex items-center justify-center gap-2 shadow-lg`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
      >
        <FaStar className="text-yellow-400 text-xl animate-pulse" />
        {averageScore}점
        {averageScore === 100 && (
          <motion.span
            initial={{ rotate: -10, scale: 0 }}
            animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FaFire className="text-red-500 text-sm ml-1" />
          </motion.span>
        )}
        <motion.div
          className="absolute inset-0 rounded-full bg-white opacity-20 blur-md"
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.div>

      {/* Progress Bar */}
      <div className="mt-2">
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className={`h-full ${barColor}`}
            initial={{ width: 0 }}
            animate={{ width: `${averageScore}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <p className={`mt-1 text-sm font-semibold text-center ${textColor}`}>
          진행도: {averageScore} / 100
        </p>
      </div>
    </div>
  );
};
