"use client";

import { motion } from "framer-motion";

function DiagnoseResultInfo() {
  return (
    <motion.div
      className="p-6 rounded-xl bg-[#f0f9fc] shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-bold text-[#5CA7C8] mb-4">
        피부 타입 진단 결과 안내
      </h2>

      <div className="space-y-4 text-gray-700">
        {/* 결과1 */}
        <section className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#5CA7C8]">
          <h3 className="text-lg font-semibold text-[#5CA7C8]">
            AI가 분석한 피부 나이
          </h3>
          <p className="mt-2">
            업로드한 3장의 얼굴 사진을 바탕으로,{" "}
            <strong>AI가 추정한 피부 나이</strong>를 알려드려요! 실제 나이와
            비교해보며 피부 건강을 체크해보세요.
          </p>
          <div>피부 나이 분석 결과 사진 예시</div>
        </section>

        {/* 결과2 */}
        <section className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#5CA7C8]">
          <h3 className="text-lg font-semibold text-[#5CA7C8]">
            부위별 피부 상태 점수
          </h3>
          <p className="mt-2">
            얼굴의 총 <strong>11개 부위</strong>에 대해 AI가 주름, 색소침착,
            모공, 건조함 등을 정밀하게 분석하여 점수화합니다.
          </p>
          <ul className="list-disc list-inside mt-2 text-sm text-gray-600 space-y-1">
            <li>이마 / 미간 / 눈가 / 볼 / 입술 / 턱선 등</li>
            <li>항목 예시: 이마 주름, 눈가 주름, 색소침착, 모공 크기 등</li>
          </ul>
          <div>피부 나이 분석 결과 사진 예시</div>
        </section>

        {/* 결과3 */}
        <section className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#5CA7C8]">
          <h3 className="text-lg font-semibold text-[#5CA7C8]">
            종합 피부 점수 제공
          </h3>
          <p className="mt-2">
            부위별 데이터를 종합하여 <strong>주름, 색소침착, 모공</strong>에
            대한 평균 점수를 제공합니다.
          </p>
          <ul className="list-disc list-inside mt-2 text-sm text-gray-600 space-y-1">
            <li>totalWrinkle: 전체 주름 점수</li>
            <li>totalPigmentation: 전체 색소침착 점수</li>
            <li>totalPore: 전체 모공 점수</li>
          </ul>
          <div>종합 피부 점수 제공 사진 예시</div>
        </section>

        {/* 결과4 */}
        <section className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#5CA7C8]">
          <h3 className="text-lg font-semibold text-[#5CA7C8]">
            맞춤 화장품 추천
          </h3>
          <p className="mt-2">
            종합 점수를 기반으로,{" "}
            <strong>주름, 색소침착, 모공 개선에 도움되는 화장품</strong>을
            추천해드려요.
          </p>
          <div>화장품 추천 사진 예시</div>
        </section>

        {/* 결과5 */}
        <section className="bg-[#e6f7fd] p-4 rounded-lg shadow-sm border-l-4 border-[#e85959]">
          <h3 className="text-lg font-semibold text-[#e85959]">
            스킨케어 미션 제공
          </h3>
          <p className="mt-2">
            점수 데이터와 함께, <strong>입술 건조함과 턱선 처짐</strong> 개선을
            위한 <strong>개인 맞춤형 스킨케어 미션</strong>도 제공됩니다!
          </p>
          <p className="text-sm mt-1 text-gray-600">
            미션을 따라 하면서 꾸준히 피부 개선을 체험해보세요 💡
          </p>
          <div>스킨케어 미션 사진 예시</div>
        </section>
      </div>
    </motion.div>
  );
}

export default DiagnoseResultInfo;
