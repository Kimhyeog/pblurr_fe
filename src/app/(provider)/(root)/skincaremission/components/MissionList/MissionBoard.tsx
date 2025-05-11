import { DailyMission, MissionScore } from "@/types/types";
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
import { ClipLoader } from "react-spinners"; // npm install react-spinners
import DeadLine from "../ScoreBoard/DeadLine";
import Swal from "sweetalert2";

interface Props {
  dailyMissionList: DailyMission[];
  setMissions: (MissionList: DailyMission[]) => void;
  loading: boolean;
  areAllMissionsCompleted: () => boolean; // 새로운 속성 추가
  missionScore: MissionScore | null;
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
  const { dailyMissionList, setMissions, missionScore } = props;
  const [missionStates, setMissionStates] = useState<boolean[]>([]);

  const formatDate = (dateString: string, day = 0) => {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `생성날짜 : ${yyyy}년 ${mm} 월 ${dd} 일`;
  };

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
      Swal.fire("", "미션을 업데이트하였습니다.", "success").then(() => {
        window.location.reload();
      });
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

  const areCheckedStatesEqual = () => {
    return dailyMissionList.every(
      (mission, index) => mission.checked === missionStates[index]
    );
  };

  const renderMissionItem = (mission: DailyMission & { index: number }) => (
    <motion.li
      key={mission.index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: mission.index * 0.05, duration: 0.3 }}
      className={`flex items-center space-x-3 rounded-lg p-3 shadow-md transition ${
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

  if (props.loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <ClipLoader size={35} color="#58A399" />
      </div>
    );
  }

  return (
    <div className="relative w-full border-6 border-[#5CA7C8] bg-[#E9F6FC] rounded-xl shadow-md p-6 ">
      <div className="w-full">
        <h1 className="w-full text-xl font-bold text-[#146C94] mb-4 text-center">
          오늘의 스킨케어 미션
        </h1>
        <p className="absolute top-0 right-0 font-bold text-sm text-gray-600 px-3 py-1 rounded-lg border border-sky-200 bg-sky-50 shadow-sm hidden sm:inline-block">
          {/* 미션 날짜 텍스트 수정 */}
          {formatDate(missionScore!.startDate)}
        </p>
      </div>
      {/* 기간 */}
      {missionScore ? (
        <DeadLine
          startDate={missionScore.startDate ?? new Date().toDateString()}
          endDate={missionScore.endDate ?? new Date().toDateString()}
        />
      ) : (
        <div className="flex justify-center items-center h-40">
          <ClipLoader size={35} color="#58A399" />
        </div> // 혹은 null 또는 스피너 컴포넌트
      )}

      {missionStates.length > 0 && (
        <>
          {incompleteMissions.length > 0 && (
            <div>
              <h2
                className="
            text-center sm:text-left
            text-md sm:text-xl px-3 py-3
            font-semibold text-[#146C94] mb-2"
              >
                오늘 미완료된 항목
              </h2>
              <InCompleteMissionsBox
                incompleteMissions={incompleteMissions}
                renderMissionItem={renderMissionItem}
              />
            </div>
          )}
          {completedMissions.length > 0 && (
            <div>
              <h2
                className="text-center sm:text-left
            text-md sm:text-xl px-3 py-3
            font-semibold text-[#146C94] mb-2"
              >
                오늘 완료된 항목
              </h2>
              <CompleteMissionsBox
                completedMissions={completedMissions}
                renderMissionItem={renderMissionItem}
              />
            </div>
          )}
        </>
      )}

      <div className="flex flex-col items-center gap-y-3 justify-center mt-4">
        {props.areAllMissionsCompleted() && (
          <p className="text-sm text-gray-500 font-medium">
            오늘 할 미션을 모두 완료했습니다.
          </p>
        )}
        <button
          onClick={handleSave}
          disabled={props.areAllMissionsCompleted() || areCheckedStatesEqual()}
          className={`font-semibold py-2 px-6 rounded-lg shadow transition ${
            props.areAllMissionsCompleted() || areCheckedStatesEqual()
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#7FC5E0] text-white hover:bg-[#5CA7C8] active:bg-[#4A8FBF] cursor-pointer"
          }`}
        >
          저장
        </button>
      </div>
    </div>
  );
}

export default MissionBoard;
