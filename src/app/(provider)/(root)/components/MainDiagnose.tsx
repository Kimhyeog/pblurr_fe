"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
// import DiagnoseImg from "public/images/MainDiagnose.png";

function MainDiagnose() {
  const router = useRouter();

  return (
    <div className="px-20 py-15 flex justify-center items-center gap-x-15 bg-white">
      <div className="flex flex-col gap-y-4 items-center">
        <h1 className="text-2xl font-extrabold">나한테 피부질환이..?</h1>
        <div>
          <p className="text-md text-center whitespace-nowrap">
            {`"`}피부르르{`"`}는 당신의 피부 피부 사진을 업로드하면, 나의
          </p>
          <p className="text-md text-center whitespace-nowrap">
            피부 질환이 있는지 진단을 할 수 있습니다.
          </p>
        </div>
        <button
          onClick={() => {
            router.push("/diagnose");
          }}
          className="bg-[#7FC5E0] text-white px-4 py-2 font-bold rounded-lg text-lg
              hover:bg-[#5CA7C8] active:bg-[#4A8FBF] transition cursor-pointer"
        >
          진단하기
        </button>
      </div>
      <div>
        <Image
          className="rounded-2xl"
          src="/images/MainDiagnose.png"
          alt="의심짛환아이콘콘"
          width={450}
          height={250}
        />
      </div>
    </div>
  );
}

export default MainDiagnose;
