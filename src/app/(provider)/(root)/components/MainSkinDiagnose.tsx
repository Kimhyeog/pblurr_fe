"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function MainSkinDiagnose() {
  const router = useRouter();

  return (
    <div
      className="
        w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 
        mx-auto flex flex-col sm:flex-row
    px-20 py-15  justify-center items-center gap-x-15 
      "
    >
      <div>
        <Image
          className="rounded-3xl hidden md:visible md:block border-3 border-[#5CA7C8]
          "
          src="/images/PhotosThatLeadToAnalysis.png"
          alt="의심짛환아이콘"
          width={370}
          height={300}
        />
      </div>
      <div className="flex flex-col gap-y-4 justify-center items-center sm:mr-0">
        <h1 className="text-2xl font-extrabold">피부 미용 분석</h1>
        <div>
          <p className="text-md text-center whitespace-nowrap">
            {`"`}피부르르{`"`}는 당신의 얼굴 사진을 업로드하면,
            <br />
            부위별 피부 미용 점수를 간편하게 분석할 수 있습니다.
          </p>
        </div>
        <button
          onClick={() => {
            router.push("/skinAnalysis");
          }}
          className="bg-[#7FC5E0] text-white px-4 py-2 font-bold rounded-lg text-lg
              hover:bg-[#5CA7C8] active:bg-[#4A8FBF] transition cursor-pointer"
        >
          분석하기
        </button>
      </div>
    </div>
  );
}

export default MainSkinDiagnose;
