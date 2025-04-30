import React from "react";

interface SkinDiseaseNoticeProps {
  onClose: () => void;
}

const SkinDiseaseNotice: React.FC<SkinDiseaseNoticeProps> = ({ onClose }) => {
  return (
    <section className="bg-white border-5 border-[#7FC5E0]  rounded-2xl p-6  mx-auto text-center shadow-lg">
      <div className="flex justify-center items-center mb-4 text-[#7FC5E0] text-3xl">
        🩺
      </div>
      <h3 className="text-xl font-bold text-[#007EA7] mb-4">피부 질환 안내</h3>

      <ul className="space-y-4 text-sm text-gray-700 list-none text-center max-w-xs mx-auto">
        <li>
          <strong className="text-[#007EA7]">밝은 조명</strong>에서 촬영된,{" "}
          <strong className="text-[#007EA7]">초점이 선명한</strong> 사진
        </li>
        <li>
          <strong className="text-[#007EA7]">환부가 화면 중앙</strong>에
          위치하고
          <br />
          화면을 가득 채운 사진
        </li>
        <li>
          <strong className="text-[#007EA7]">환부가 가려지지 않은</strong> 사진
        </li>
        <li>
          <strong className="text-[#007EA7]">단색 배경</strong>의 사진
        </li>
      </ul>

      <button
        onClick={onClose}
        className="mt-6 w-full py-2 rounded-lg bg-[#7FC5E0] text-white font-semibold hover:bg-[#6BB6CE] transition-colors"
      >
        확인
      </button>
    </section>
  );
};

export default SkinDiseaseNotice;
