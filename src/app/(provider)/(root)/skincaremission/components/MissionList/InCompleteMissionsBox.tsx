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
    <div>
      <h2 className="text-md font-semibold text-[#146C94] mb-2">
        오늘 미완료된 항목
      </h2>
      <ul className="space-y-4 mb-6">
        {incompleteMissions.map((mission) => renderMissionItem(mission))}
      </ul>
    </div>
  );
}

export default InCompleteMissionsBox;
