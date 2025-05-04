"use client";

import { fetchDailyMissions, fetchMissionScore } from "@/api/skinCareMission";
import GeneralModal from "@/components/Modal/GeneralModal";
import { DailyMission, MissionScore } from "@/types/types";
import { useEffect, useState } from "react";
import MissionCreateCheckNotice from "./components/MissionCreateCheckNotice";
import MissionBoead from "./components/MissionBoead";
import ScoreBoard from "./components/ScoreBoard";

export default function Page() {
  // 미션 항목들 State 변수
  const [missions, setMissions] = useState<DailyMission[]>([]);

  //미션 유무에 따른 모달창 열닫 State 변수
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 미션 점수 State 변수
  const [missionScore, setMissionScore] = useState<MissionScore | null>(null);

  useEffect(() => {
    const getMissionsAndScore = async () => {
      try {
        const [missionData, scoreData] = await Promise.all([
          fetchDailyMissions(),
          fetchMissionScore(),
        ]);
        setMissions(missionData);
        setMissionScore(scoreData);

        if (missionData.length === 0) {
          setIsModalOpen(true);
        }
      } catch (error: any) {
        setIsModalOpen(true); // 에러 발생 시 모달 오픈
      }
    };

    getMissionsAndScore();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto min-h-screen mt-5 flex flex-col gap-y-3">
      <GeneralModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <MissionCreateCheckNotice onClose={handleCloseModal} />
      </GeneralModal>

      <div className="rounded-2xl shadow-md px-10 py-5 border-0 bg-white">
        <MissionBoead dailyMissionList={missions} setMissions={setMissions} />
      </div>

      <div className="rounded-2xl shadow-md px-10 py-5 border-0 bg-white">
        <ScoreBoard missionScore={missionScore} />
      </div>
    </div>
  );
}
