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
        피부 미용 분석 결과 안내
      </h2>

      <div className="space-y-4 text-gray-700">
        {/* 결과1 */}
        <section className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#5CA7C8]">
          <h3 className="text-lg font-semibold text-[#5CA7C8]">
            AI가 분석한 피부 나이
          </h3>
          <p className="mt-2">
            업로드한 3장의 얼굴 사진을 바탕으로,{" "}
            <span className="font-bold text-[#5CA7C8]">
              AI가 추정한 피부 나이
            </span>
            를 알려드려요! 실제 나이와 비교해보며 피부 건강을 체크해보세요.
          </p>
        </section>

        {/* 결과2 */}
        <section className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#5CA7C8]">
          <h3 className="text-lg font-semibold text-[#5CA7C8]">
            부위별 피부 상태 점수
          </h3>
          <p className="mt-2">
            얼굴의 총{" "}
            <span className="font-bold text-[#5CA7C8]">11개 부위</span>에 대해
            AI가 주름, 색소침착, 모공, 건조함 등을 정밀하게 분석하여
            점수화합니다.
          </p>
          <ul className="list-disc list-inside mt-2 text-sm text-gray-600 space-y-1">
            <li>
              <span className="font-bold text-[#5CA7C8]">이마</span> /{" "}
              <span className="font-bold text-[#5CA7C8]">미간</span> /{" "}
              <span className="font-bold text-[#5CA7C8]">눈가</span> /{" "}
              <span className="font-bold text-[#5CA7C8]">볼</span> /{" "}
              <span className="font-bold text-[#5CA7C8]">입술</span> /{" "}
              <span className="font-bold text-[#5CA7C8]">턱선</span> 등
            </li>
            <li>항목 예시: 이마 주름, 눈가 주름, 색소침착, 모공 크기 등</li>
          </ul>
        </section>

        {/* 결과3 */}
        <section className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#5CA7C8]">
          <h3 className="text-lg font-semibold text-[#5CA7C8]">
            종합 피부 점수 제공
          </h3>
          <p className="mt-2">
            부위별 데이터를 종합하여{" "}
            <span className="font-bold text-[#5CA7C8]">주름</span>,{" "}
            <span className="font-bold text-[#5CA7C8]">색소침착</span>,{" "}
            <span className="font-bold text-[#5CA7C8]">모공</span>에 대한 평균
            점수를 제공합니다.
          </p>
          <ul className="list-disc list-inside mt-2 text-sm text-gray-600 space-y-1">
            <li>
              전체 <span className="font-bold text-[#5CA7C8]">주름 점수</span>
            </li>
            <li>
              전체{" "}
              <span className="font-bold text-[#5CA7C8]">색소침착 점수</span>
            </li>
            <li>
              전체 <span className="font-bold text-[#5CA7C8]">모공 점수</span>
            </li>
          </ul>
        </section>

        {/* 결과4 */}
        <section className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#5CA7C8]">
          <h3 className="text-lg font-semibold text-[#5CA7C8]">
            맞춤 화장품 추천
          </h3>
          <p className="mt-2">
            통합 점수를 기반으로,{" "}
            <span className="font-bold text-[#5CA7C8]">주름</span>,{" "}
            <span className="font-bold text-[#5CA7C8]">색소침착</span>,{" "}
            <span className="font-bold text-[#5CA7C8]">
              모공 개선에 도움되는 화장품
            </span>
            을 추천해드려요.
          </p>
        </section>

        {/* 결과5 */}
        <section className="bg-[#e6f7fd] p-4 rounded-lg shadow-sm border-l-4 border-[#e85959]">
          <h3 className="text-lg font-semibold text-[#e85959]">
            스킨케어 미션 제공
          </h3>
          <p className="mt-2">
            <span className="font-bold text-[#e85959]">통합 점수</span> ,{" "}
            <span className="font-bold text-[#e85959]">입술 건조함</span> ,{" "}
            <span className="font-bold text-[#e85959]">턱선 처짐</span>을
            고려하여 피부개선을 위한{" "}
            <span className="font-bold text-[#e85959]">
              개인 맞춤형 스킨케어 미션
            </span>
            도 제공됩니다!
          </p>
          <p className="text-sm mt-1 text-gray-600">
            미션을 따라 하면서 꾸준히 피부 개선을 체험해보세요 💡
          </p>
        </section>
      </div>
    </motion.div>
  );
}

export default DiagnoseResultInfo;
