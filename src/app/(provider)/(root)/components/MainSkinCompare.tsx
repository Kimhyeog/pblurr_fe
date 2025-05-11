"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
// import DiagnoseImg from "public/images/MainDiagnose.png";

function MainSkinCompare() {
  const router = useRouter();

  return (
    <div
      className="
        w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 
        mx-auto flex flex-col sm:flex-row
    px-20 py-15  justify-center items-center gap-x-15 bg-white
      "
    >
      <div className="flex flex-col gap-y-4 items-center">
        <h1 className="text-2xl font-extrabold">분석 기록 비교</h1>
        <div>
          <p className="text-sm sm:text-md text-center whitespace-nowrap">
            {`"`}피부르르{`"`}는 당신의 피부 기록들을 비교하면서,
            <br />
            당신의 추악한 과거들을 들쳐볼 수 있습니다.
          </p>
        </div>
        <button
          onClick={() => {
            router.push("/skinAnalysisCompare");
          }}
          className="bg-[#7FC5E0] text-white px-4 py-2 font-bold rounded-lg
              hover:bg-[#5CA7C8] active:bg-[#4A8FBF] transition cursor-pointer
              text-md sm:text-lg 
              "
        >
          비교하기
        </button>
      </div>
      <div>
        <Image
          className="rounded-2xl hidden md:visible md:block border-3 border-[#5CA7C8]"
          src="/images/MainDiagnose.png"
          alt="의심 질환 아이콘"
          width={350}
          height={250}
        />
      </div>
    </div>
  );
}

export default MainSkinCompare;
