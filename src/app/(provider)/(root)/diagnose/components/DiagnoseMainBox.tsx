import DieasesBox from "./DieasesBox";

function DiagnoseMainBox() {
  return (
    <div className=" bg-white p-6 rounded-2xl">
      <div className=" flex flex-col items-center px-8 py-5  bg-white border-4 border-[#5CA7C8] rounded-3xl shadow-xl text-center ">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#5CA7C8] relative mb-4">
          간편하게 받아보는 <br className="visible sm:hidden" />
          AI 피부 질환 진단
          <span className="block w-full mx-auto border-b-4 border-[#5CA7C8] mt-2"></span>
          {/* 수정&& */}
        </h1>

        <div className="w-full bg-[#e6f6fc] rounded-3xl p-5 sm:p-6 shadow-[0_4px_12px_rgba(92,167,200,0.3)] flex flex-col items-center gap-2 border-2 border-[#5CA7C8]">
          <p className="text-center text-lg sm:text-xl text-gray-700 leading-relaxed">
            사진 한 장이면 충분해요! <span className="text-2xl">📸</span>
          </p>
          <p className="text-center text-lg sm:text-xl text-gray-700 leading-relaxed">
            전체 피부 질환의 약{" "}
            <span className="font-bold text-[#5CA7C8]">70~80%</span>를 차지하는
          </p>
          <p className="text-center text-lg sm:text-xl text-gray-700 leading-relaxed">
            9가지 주요 피부 질환을
          </p>
          <p className="text-center text-lg sm:text-xl text-gray-700 leading-relaxed">
            AI가 약 <span className="font-bold text-[#5CA7C8]">85%</span>의
            정확도로
          </p>
          <p className="text-center text-lg sm:text-xl text-gray-700 leading-relaxed">
            빠르고 정확하게 분석해드립니다.
          </p>
          <p className="text-center text-lg sm:text-xl text-gray-700 leading-relaxed">
            복잡한 절차 없이, 몇 초 만에 내 피부를 진단해보세요!
          </p>
          <p className="text-center text-lg sm:text-xl text-gray-700 leading-relaxed">
            전문 의료 데이터를 기반으로 신뢰할 수 있는 진단 결과를 제공합니다.
          </p>
        </div>

        {/* 주요 질환 안내 박스 */}
        <div className="mt-4">
          <DieasesBox />
        </div>
      </div>
    </div>
  );
}

export default DiagnoseMainBox;
