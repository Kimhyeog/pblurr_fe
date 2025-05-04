// src/app/(provider)/(root)/skincaremission/components/MissionBoead.tsx

import { DailyMission } from "@/types/types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { saveTodayMissionCheck } from "@/api/skinCareMission";

interface Props {
  dailyMissionList: DailyMission[];
  setMissions: (MissionList: DailyMission[]) => void;
}

function MissionBoead(props: Props) {
  const { dailyMissionList, setMissions } = props;
  const [missionStates, setMissionStates] = useState<boolean[]>([]);

  useEffect(() => {
    setMissionStates(dailyMissionList.map((m) => m.checked || false));
  }, [dailyMissionList]);

  const toggleMission = (index: number) => {
    setMissionStates((prev) =>
      prev.map((state, i) => (i === index ? !state : state))
    );
  };

  const handleSave = async () => {
    const result = dailyMissionList.map((mission, index) => ({
      ...mission,
      checked: missionStates[index],
    }));

    console.log("🛰️ x저장할 미션 상태:", result);

    // 상위 상태 업데이트
    setMissions(result); // ✅ 이 줄 추가!

    try {
      const responseMessage = await saveTodayMissionCheck(missionStates);
      alert(responseMessage); // 예: "미션 체크 저장이 완료되었습니다."
      window.location.reload();
    } catch (error: any) {
      alert(error.message || "미션 저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="bg-[#E9F6FC] rounded-xl shadow-md p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold text-[#146C94] mb-4 text-center">
        오늘의 스킨케어 미션
      </h1>
      <ul className="space-y-4 mb-6">
        {dailyMissionList.map((mission, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`flex items-center space-x-3 bg-white rounded-lg p-3 shadow-sm ${
              missionStates[index] ? "bg-[#E0F7EB]" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={missionStates[index] ?? false}
              onChange={() => toggleMission(index)}
              className="form-checkbox h-5 w-5 text-[#58A399] rounded border-gray-300 focus:ring-[#58A399]"
            />
            <span
              className={`text-gray-700 transition-all duration-200 ${
                missionStates[index]
                  ? "line-through text-[#58A399] font-medium"
                  : ""
              }`}
            >
              {mission.mission}
            </span>
          </motion.li>
        ))}
      </ul>
      <div className="flex justify-center">
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

export default MissionBoead;
