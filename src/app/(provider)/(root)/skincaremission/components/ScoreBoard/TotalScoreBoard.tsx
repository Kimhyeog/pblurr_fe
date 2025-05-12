import { motion } from "framer-motion";
import { FaMedal, FaCalendarAlt } from "react-icons/fa";

interface TotalScoreBoardProps {
  startDate: string;
  endDate: string;
  totalScore: number;
}

function TotalScoreBoard({
  startDate,
  endDate,
  totalScore,
}: TotalScoreBoardProps) {
  function formatKoreanDate(dateStr: string): string {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  }

  return (
    <motion.div
      className="w-full h-full flex flex-col gap-y-4 border-4 border-[#5CA7C8] rounded-2xl px-5 py-5 shadow-xl bg-gradient-to-b from-sky-50 to-white min-h-[250px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* 제목 및 설명 */}
      <div className="text-center space-y-1">
        <h3 className="text-lg font-semibold text-amber-600 tracking-tight">
          누적 총점
        </h3>
        <p className="text-xs text-gray-500 leading-snug">
          지금까지 수행한 미션의 종합 평균 점수입니다.
        </p>
      </div>

      {/* 날짜 정보 */}
      <div className="flex flex-col sm:flex-row items-center justify-center text-sm text-gray-700 gap-2">
        <FaCalendarAlt className="hidden sm:visible text-sky-400" />
        <div className="font-medium text-sky-500">미션 수행 기간:</div>
        <div className="font-normal flex flex-col sm:flex-row items-center">
          <div>{formatKoreanDate(startDate)}</div>
          <div>{"~"}</div>
          <div>{formatKoreanDate(endDate)}</div>
        </div>
      </div>

      {/* 총점 박스 */}
      <motion.div
        className="w-full relative bg-white border-2 border-yellow-300 rounded-xl px-6 py-4 shadow-md flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <FaMedal className="text-yellow-500 text-2xl drop-shadow-sm" />
          <h4 className="text-base font-semibold text-yellow-700">총점</h4>
          <motion.span
            className="text-2xl font-black text-amber-500 tracking-tight"
            initial={{ scale: 0.9 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            {totalScore}
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default TotalScoreBoard;
