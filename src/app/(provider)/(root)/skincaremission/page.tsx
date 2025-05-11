"use client";

import { fetchDailyMissions, fetchMissionScore } from "@/api/skinCareMission";
import GeneralModal from "@/components/Modal/GeneralModal";
import { DailyMission, MissionScore } from "@/types/types";
import { useEffect, useState } from "react";
import MissionCreateCheckNotice from "./components/MissionCreateCheckNotice";
import MissionBoard from "./components/MissionList/MissionBoard";
import ScoreContainer from "./components/ScoreBoard/ScoreContainer";

export default function Page() {
  // 미션 항목들 State 변수
  const [missions, setMissions] = useState<DailyMission[]>([]);

  const [tempMissions, setTempMissions] = useState<DailyMission[]>([]); // 임시 미션 리스트 추가

  //미션 유무에 따른 모달창 열닫 State 변수
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 미션 점수 State 변수
  const [missionScore, setMissionScore] = useState<MissionScore | null>(null);

  //로딩 상태 State 변수
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMissionsAndScore = async () => {
      try {
        const [missionData, scoreData] = await Promise.all([
          fetchDailyMissions(),
          fetchMissionScore(),
        ]);
        setMissions(missionData);
        setTempMissions(missionData); // fetch된 미션을 임시 저장
        setMissionScore(scoreData);

        if (missionData.length === 0) {
          setIsModalOpen(true);
        }
      } catch (error: any) {
        setIsModalOpen(true); // 에러 발생 시 모달 오픈
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    getMissionsAndScore();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // ✅ 모든 checked가 true인지 확인하는 함수
  const areAllCheckedInitially = () => {
    return tempMissions.every((mission) => mission.checked === true);
  };

  return (
    <div className="max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto min-h-screen mt-5 flex flex-col gap-y-3">
      <GeneralModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <MissionCreateCheckNotice onClose={handleCloseModal} />
      </GeneralModal>

      <div className="w-full px-5 py-5 rounded-2xl shadow-md  bg-white">
        <MissionBoard
          missionScore={missionScore}
          dailyMissionList={missions}
          setMissions={setMissions}
          loading={loading}
          areAllMissionsCompleted={areAllCheckedInitially}
        />
      </div>

      <div className="rounded-2xl shadow-md px-5 py-5 border-0 bg-white">
        <ScoreContainer missionScore={missionScore} />
      </div>
    </div>
  );
}
