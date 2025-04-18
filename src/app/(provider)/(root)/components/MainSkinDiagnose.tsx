"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function MainSkinDiagnose() {
  const router = useRouter();

  return (
    <div
      className="
    w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto
    px-20 py-15 flex justify-center items-center gap-x-15"
    >
      <div>
        <Image
          className="rounded-2xl sm:hidden md:block"
          src="/images/MainSkinDiagnose.png"
          alt="의심짛환아이콘콘"
          width={350}
          height={250}
        />
      </div>
      <div className="flex flex-col gap-y-4 items-center">
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
            router.push("/skindiagnose");
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
