import { createSkinCareMission } from "@/api/skinCareMission";
import { useRouter } from "next/navigation";
import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import Swal from "sweetalert2";

interface MissionCreateCheckNoticeProps {
  onClose: () => void;
}

const MissionCreateCheckNotice: React.FC<MissionCreateCheckNoticeProps> = ({
  onClose,
}) => {
  const router = useRouter();

  return (
    <section className="bg-white border-6 border-[#7FC5E0] rounded-2xl p-6 w-full max-w-md m-0 flex flex-col justify-center items-center text-center shadow-lg">
      {/* 타이틀 */}
      <div className="flex justify-center items-center mb-4 text-[#7FC5E0] text-4xl">
        <FaExclamationCircle />
      </div>

      <h3 className="text-xl font-bold text-[#007EA7] mb-4">
        오늘 생성된 미션이 없습니다.
      </h3>

      <ul className="space-y-4 text-sm text-gray-700 list-none text-center max-w-xs mx-auto mb-6">
        <li>
          <span className="font-semibold text-[#007EA7]">피부 미용 분석</span>
          을 받지 않으셨다면,
          <br />
          <span className="underline decoration-[#7FC5E0]">
            분석을 먼저 진행해주세요.
          </span>
        </li>
        <li>
          이미 분석을 받으셨다면,
          <br />
          분석 결과를 기반으로 스킨케어 미션을 생성할 수 있습니다.
        </li>
      </ul>

      {/* 버튼 섹션 */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => {
            router.push("/skinAnalysis");
          }}
          className="w-full sm:w-auto px-4 py-2 bg-white border border-[#7FC5E0] text-[#007EA7] font-semibold rounded-lg hover:bg-[#f0fbff] transition"
        >
          피부 분석
        </button>
        <button
          onClick={async () => {
            try {
              const message = await createSkinCareMission();
              Swal.fire("성공", message, "success");
            } catch (error: any) {
              Swal.fire("분석 결과 없음", error.message, "warning");
            }
          }}
          className="w-full sm:w-auto px-4 py-2 bg-[#7FC5E0] text-white font-semibold rounded-lg hover:bg-[#66b2cf] transition"
        >
          미션 생성
        </button>
      </div>
    </section>
  );
};

export default MissionCreateCheckNotice;
