import { DailyMission } from "@/types/types";
import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { saveTodayMissionCheck } from "@/api/skinCareMission";
import InCompleteMissionsBox from "./InCompleteMissionsBox";
import CompleteMissionsBox from "./CompleteMissionsBox";
import {
  FaTint,
  FaSun,
  FaCapsules,
  FaLeaf,
  FaSmile,
  FaRegSmileBeam,
  FaRegClock,
  FaHandsWash,
  FaSyringe,
  FaRegGrinStars,
} from "react-icons/fa";

interface Props {
  dailyMissionList: DailyMission[];
  setMissions: (MissionList: DailyMission[]) => void;
}

// ✅ 문자열과 아이콘 매핑
const missionIconMap: Record<string, ReactNode> = {
  "매일 저녁 레티놀 성분의 세럼 바르기": (
    <FaSyringe className="text-[#E63946]" />
  ),
  "매일 2L 이상 수분 섭취하기": <FaTint className="text-[#457B9D]" />,
  "저녁 세안 후 AHA 성분 제품 바르기": (
    <FaHandsWash className="text-[#F1FAEE]" />
  ),
  "비타민C 섭취하기": <FaCapsules className="text-[#FF6F61]" />,
  "아침 세안 후 BHA 성분 토너 또는 패드 사용하기": (
    <FaLeaf className="text-[#2A9D8F]" />
  ),
  "외출 전 자외선 차단제 바르기": <FaSun className="text-[#F1C40F]" />,
  "하루 1회 입술 보습제 바르기": <FaSmile className="text-[#F4A261]" />,
  "하루 3회 이상 입술 보습제 덧바르기": (
    <FaRegSmileBeam className="text-[#E9C46A]" />
  ),
  "하루 1회 턱선 리프팅 마사지를 5분간 실천하기": (
    <FaRegClock className="text-[#6C757D]" />
  ),
  "콜라겐 보충제 또는 식품으로 콜라겐 섭취하기": (
    <FaRegGrinStars className="text-[#FFD700]" />
  ),
};

function MissionBoard(props: Props) {
  const { dailyMissionList, setMissions } = props;
  const [missionStates, setMissionStates] = useState<boolean[]>([]);

  useEffect(() => {
    setMissionStates(dailyMissionList.map((m) => m.checked || false));
  }, [dailyMissionList]);

  const toggleMission = (index: number) => {
    if (dailyMissionList[index].checked) return;
    setMissionStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  const handleSave = async () => {
    const updatedMissions = dailyMissionList.map((mission, index) => ({
      ...mission,
      checked: missionStates[index],
    }));

    console.log("🛰️ 저장할 미션 상태:", updatedMissions);

    setMissions(updatedMissions);

    try {
      const responseMessage = await saveTodayMissionCheck(missionStates);
      alert(responseMessage);
      window.location.reload();
    } catch (error: any) {
      alert(error.message || "미션 저장 중 오류가 발생했습니다.");
    }
  };

  const completedMissions: (DailyMission & { index: number })[] = [];
  const incompleteMissions: (DailyMission & { index: number })[] = [];

  dailyMissionList.forEach((mission, index) => {
    const withIndex = { ...mission, index };
    if (missionStates[index] === true) {
      completedMissions.push(withIndex);
    } else {
      incompleteMissions.push(withIndex);
    }
  });

  const renderMissionItem = (mission: DailyMission & { index: number }) => (
    <motion.li
      key={mission.index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: mission.index * 0.05, duration: 0.3 }}
      className={`flex items-center space-x-3 rounded-lg p-3 shadow-sm transition ${
        missionStates[mission.index] ? "bg-[#E0F7EB]" : "bg-white"
      }`}
    >
      <input
        type="checkbox"
        checked={missionStates[mission.index]}
        onChange={() => toggleMission(mission.index)}
        disabled={dailyMissionList[mission.index].checked}
        className={`form-checkbox h-5 w-5 rounded border-gray-300 focus:ring-[#58A399] ${
          missionStates[mission.index]
            ? "text-[#58A399]"
            : "text-gray-400 hover:text-[#58A399]"
        }`}
      />
      {/* ✅ 아이콘 + 텍스트 */}
      <span className="flex items-center space-x-2 text-gray-700 transition-all duration-200">
        {missionIconMap[mission.mission]}
        <span
          className={`${
            missionStates[mission.index] ? "text-[#58A399] font-medium" : ""
          }`}
        >
          {mission.mission}
        </span>
      </span>
    </motion.li>
  );

  return (
    <div className="bg-[#E9F6FC] rounded-xl shadow-md p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold text-[#146C94] mb-4 text-center">
        오늘의 스킨케어 미션
      </h1>

      {missionStates.length > 0 && (
        <>
          {incompleteMissions.length > 0 && (
            <InCompleteMissionsBox
              incompleteMissions={incompleteMissions}
              renderMissionItem={renderMissionItem}
            />
          )}
          {completedMissions.length > 0 && (
            <CompleteMissionsBox
              completedMissions={completedMissions}
              renderMissionItem={renderMissionItem}
            />
          )}
        </>
      )}

      <div className="flex justify-center mt-4">
        <button
          onClick={handleSave}
          className="bg-[#7FC5E0] text-white hover:bg-[#5CA7C8] active:bg-[#4A8FBF] font-semibold py-2 px-6 rounded-lg shadow cursor-pointer transition"
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default MissionBoard;
