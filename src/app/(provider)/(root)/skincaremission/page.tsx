"use client";

import { fetchDailyMissions } from "@/api/skinCareMission";
import GeneralModal from "@/components/Modal/GeneralModal";
import { DailyMission } from "@/types/types";
import { useEffect, useState } from "react";
import MissionCreateCheckNotice from "./components/MissionCreateCheckNotice";
import MissionBoead from "./components/MissionBoead";

export default function Page() {
  const [missions, setMissions] = useState<DailyMission[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getMissions = async () => {
      try {
        const data = await fetchDailyMissions();
        setMissions(data);

        console.log(data);
        if (data.length === 0) {
          setIsModalOpen(true); // 미션 없을 때 모달 오픈
        }
      } catch (error: any) {
        setIsModalOpen(true); // 에러 발생 시 모달 오픈
      }
    };

    getMissions();
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
        스킨케어 미션 페이지
      </div>
      <div className="rounded-2xl shadow-md px-10 py-5 border-0 bg-white">
        스킨케어 미션 페이지
      </div>
    </div>
  );
}
