import { MissionScore } from "@/types/types";
import { motion } from "framer-motion";
import { FaStar, FaFire } from "react-icons/fa";
import DeadLine from "./DeadLine";
import { ClipLoader } from "react-spinners";

interface Props {
  missionScore: MissionScore | null;
}

function ScoreBoard({ missionScore }: Props) {
  const getColor = (score: number) => {
    if (score >= 80) return "green";
    if (score <= 40) return "orange";
    return "blue";
  };

  const color = missionScore ? getColor(missionScore.averageScore) : "blue";
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
    <div className="w-full rounded-2xl shadow-lg px-6 py-8 bg-gradient-to-br from-[#E0F7FA] to-[#ffffff] border border-[#B2EBF2]">
      {missionScore ? (
        <div className="flex flex-col items-center text-center space-y-4">
          {/* 제목 */}
          <div className="flex items-center gap-2 text-[#0288D1] text-xl font-bold">
            <FaStar className="text-yellow-400 text-2xl" />
            <h2>미션 점수</h2>
          </div>
          <div className="w-full h-px bg-[#B2EBF2]" />

          {/* 기간 */}
          <div>
            <DeadLine
              startDate={missionScore.startDate}
              endDate={missionScore.endDate}
            />
          </div>

          {/* 점수 뱃지 */}
          <motion.div
            className={`mt-2 px-6 py-4 bg-white rounded-full border border-${color}-200 ${textColor} text-3xl font-extrabold flex items-center justify-center gap-3 shadow-md`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <FaStar className="text-yellow-400 text-2xl" />
            {missionScore.averageScore}점
            {missionScore.averageScore === 100 && (
              <motion.span
                initial={{ rotate: -10, scale: 0 }}
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <FaFire className="text-red-500 text-xl ml-1" />
              </motion.span>
            )}
          </motion.div>

          {/* Progress Bar */}
          <div className="w-full mt-2">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${barColor}`}
                style={{ width: `${missionScore.averageScore}%` }}
              />
            </div>
            <p className={`mt-1 text-sm font-medium ${textColor}`}>
              {missionScore.averageScore} / 100
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500 py-8">
          <ClipLoader color="#5CA7C8" size={40} />
          <p className="mt-3 text-sm">점수 데이터를 불러오는 중입니다...</p>
        </div>
      )}
    </div>
  );
}

export default ScoreBoard;
