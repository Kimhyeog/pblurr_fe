import { DailyMission } from "@/types/types";
import { ReactNode } from "react";

interface Props {
  completedMissions: (DailyMission & { index: number })[];
  renderMissionItem: (mission: DailyMission & { index: number }) => ReactNode;
}

function CompleteMissionsBox({ completedMissions, renderMissionItem }: Props) {
  return (
    <div className="px-6 py-5 bg-white rounded-xl border border-[#B2EBF2] shadow-md">
      <ul className="space-y-4 mb-6">
        {completedMissions.map((mission) => renderMissionItem(mission))}
      </ul>
    </div>
  );
}

export default CompleteMissionsBox;
