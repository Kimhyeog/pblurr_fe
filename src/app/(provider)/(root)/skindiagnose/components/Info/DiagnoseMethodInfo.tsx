"use client";

import { motion } from "framer-motion";
import Image from "next/image";

function DiagnoseMethodInfo() {
  const imgSize = 30;
  return (
    <motion.div
      className="p-6 rounded-xl bg-[#f0f9fc] shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-bold text-[#5CA7C8] mb-4">
        피부 타입 진단 방법 안내
      </h2>

      <div className="space-y-4 text-gray-700">
        <section className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#5CA7C8]">
          <h3 className="text-lg font-semibold text-[#5CA7C8]">
            사진 업로드 방법
          </h3>
          <p className="mt-2">
            좌측 30도, 정면, 우측 30도의 순서로{" "}
            <strong>총 3장의 얼굴 사진</strong>을 업로드해주세요. 각도에 맞춰
            사진을 정확하게 촬영하면 분석 정확도가 높아집니다!
          </p>
        </section>

        <section className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[#e85959]">
          <h3 className="text-lg font-semibold text-[#e85959]">
            촬영 시 주의사항
          </h3>
          <p className="mt-2">
            밝은 환경에서 촬영해주세요. 해상도 기준은 아직 정확히 결정되지
            않았지만,
            <strong> 일정 수준 이상의 선명도</strong>가 필요합니다.
          </p>
        </section>

        <section className="bg-[#e6f7fd] p-4 rounded-lg shadow-sm text-center">
          <h3 className="text-lg font-semibold text-[#5CA7C8] mb-2">
            예시 이미지
          </h3>
          <div className="flex justify-center gap-x-10 items-center">
            <div>
              <Image
                src="/images/left-face.png" // 프로젝트 내 public 폴더에 넣어주세요
                alt="좌 30도 얼굴"
                width={`${60 + imgSize}`}
                height={`${60 + imgSize}`}
                className="rounded-full shadow"
              />
              <p className="mt-2 text-xl text-gray-500">좌 30도</p>
            </div>
            <div>→</div>
            <div>
              <Image
                src="/images/front-face.png"
                alt="정면 얼굴"
                width={`${90 + imgSize}`}
                height={`${90 + imgSize}`}
                className="rounded-full shadow"
              />
              <p className="mt-2 text-xl text-gray-500">정면</p>
            </div>
            <div>→</div>
            <div>
              <Image
                src="/images/right-face.png"
                alt="우 30도 얼굴"
                width={`${60 + imgSize}`}
                height={`${60 + imgSize}`}
                className="rounded-full shadow"
              />
              <p className="mt-2 text-xl text-gray-500">우 30도</p>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}

export default DiagnoseMethodInfo;
