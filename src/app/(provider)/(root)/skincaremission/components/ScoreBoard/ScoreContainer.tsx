import { MissionScore } from "@/types/types";
import { FaStar } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import ScoreRankBox from "./ScoreRank123";
import { ScoreBadge } from "./ScoreBoard";

interface Props {
  missionScore: MissionScore | null;
}

function ScoreContainer({ missionScore }: Props) {
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
    <div className="w-full rounded-2xl shadow-lg px-6 py-4 bg-gradient-to-br from-[#E0F7FA] to-[#ffffff] border border-[#B2EBF2]">
      {missionScore ? (
        <div className="flex flex-col items-center text-center">
          {/* 제목 */}
          <div className="flex items-center gap-2 text-[#0288D1] text-xl font-bold mb-2">
            <FaStar className="text-yellow-400 text-2xl" />
            <h2>미션 점수</h2>
          </div>

          <div
            className="w-full h-auto sm:h-[300px] flex items-center
          flex-col  p-5 gap-5
          sm:flex-row
          "
          >
            {/* 미션 등수 단상 */}
            <ScoreRankBox />
            <ScoreBadge score={missionScore.averageScore} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500 py-6">
          <ClipLoader color="#5CA7C8" size={40} />
          <p className="mt-3 text-sm">점수 데이터를 불러오는 중입니다...</p>
        </div>
      )}
    </div>
  );
}

export default ScoreContainer;
