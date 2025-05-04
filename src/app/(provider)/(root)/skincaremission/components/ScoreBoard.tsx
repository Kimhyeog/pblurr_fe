import { MissionScore } from "@/types/types";

interface Props {
  missionScore: MissionScore | null;
}

function ScoreBoard(props: Props) {
  const { missionScore } = props;

  return (
    <div className="w-full">
      {missionScore ? (
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">미션 평균 점수</h2>
          <p>
            기간: {missionScore.startDate} ~ {missionScore.endDate}
          </p>
          <p className="text-3xl font-bold text-blue-500 mt-2">
            {missionScore.averageScore}점
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          점수 데이터를 불러오는 중입니다...
        </p>
      )}
    </div>
  );
}

export default ScoreBoard;
