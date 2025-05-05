import { DailyMission } from "@/types/types";
import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { saveTodayMissionCheck } from "@/api/skinCareMission";
import InCompleteMissionsBox from "./InCompleteMissionsBox";
import CompleteMissionsBox from "./CompleteMissionsBox";

interface Props {
  dailyMissionList: DailyMission[];
  setMissions: (MissionList: DailyMission[]) => void;
}

function MissionBoard(props: Props) {
  const { dailyMissionList, setMissions } = props;
  const [missionStates, setMissionStates] = useState<boolean[]>([]);

  useEffect(() => {
    setMissionStates(dailyMissionList.map((m) => m.checked || false));
  }, [dailyMissionList]);

  const toggleMission = (index: number) => {
    // 완료된 항목은 토글 비활성화
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

  // 분류
  // ✅ forEach를 사용한 분류 방식
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
        checked={missionStates[mission.index] === true}
        onChange={() => toggleMission(mission.index)}
        disabled={dailyMissionList[mission.index].checked} // ✅ 완료된 항목은 토글 불가
        className={`form-checkbox h-5 w-5 rounded border-gray-300 focus:ring-[#58A399] ${
          missionStates[mission.index]
            ? "text-[#58A399]"
            : "text-gray-400 hover:text-[#58A399]"
        }`}
      />
      <span
        className={`text-gray-700 transition-all duration-200 ${
          missionStates[mission.index] ? " text-[#58A399] font-medium" : ""
        }`}
      >
        {mission.mission}
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
          {/* ✅ 미완료 항목 */}
          {incompleteMissions.length > 0 && (
            <InCompleteMissionsBox
              incompleteMissions={incompleteMissions}
              renderMissionItem={renderMissionItem}
            />
          )}

          {/* ✅ 완료 항목 */}
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
