import { DailyMission } from "@/types/types";
import { ReactNode } from "react";

interface Props {
  incompleteMissions: (DailyMission & { index: number })[];
  renderMissionItem: (mission: DailyMission & { index: number }) => ReactNode;
}

function InCompleteMissionsBox({
  incompleteMissions,
  renderMissionItem,
}: Props) {
  return (
    <div className="px-6 py-5 bg-white rounded-xl border border-[#B2EBF2] shadow-md">
      <ul className="flex flex-col gap-y-2 space-y-4">
        {incompleteMissions.map((mission) => renderMissionItem(mission))}
      </ul>
    </div>
  );
}

export default InCompleteMissionsBox;
