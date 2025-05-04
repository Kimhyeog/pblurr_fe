"use client";

import { fetchDailyMissions } from "@/api/skinCareMission";
import GeneralModal from "@/components/Modal/GeneralModal";
import { DailyMission } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SkinDiseaseNotice from "../diagnose/components/SkinDiseaseNotice";
import MissionCreateCheckNotice from "./components/MissionCreateCheckNotice";

export default function Page() {
  const [missions, setMissions] = useState<DailyMission[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getMissions = async () => {
      try {
        const data = await fetchDailyMissions();
        setMissions(data);
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
        <h1>오늘의 스킨케어 미션</h1>
        <ul>
          {missions.map((mission, index) => (
            <li key={index}>
              <input type="checkbox" checked={mission.checked} readOnly />
              {mission.mission}
            </li>
          ))}
        </ul>
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
