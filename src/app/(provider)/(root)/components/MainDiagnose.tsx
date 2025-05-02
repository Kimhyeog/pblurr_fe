"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
// import DiagnoseImg from "public/images/MainDiagnose.png";

function MainDiagnose() {
  const router = useRouter();

  return (
    <div
      className="
        w-full 
        sm:max-w-screen-sm 
        md:max-w-screen-md 
        lg:max-w-screen-lg 
        mx-auto flex flex-col sm:flex-row bg-white
        px-15 py-10 sm:px-20 sm:py-15 
        justify-center items-center 
        gap-x-15
      "
    >
      <div className="flex flex-col gap-y-4 items-center">
        <h1 className="text-2xl font-extrabold">피부 질환 진단</h1>
        <div>
          <p
            className="
          text-center whitespace-nowrap
          text-sm sm:text-md"
          >
            {`"`}피부르르{`"`}는 당신의 피부 질환 의심 사진을 업로드하면,
            <br />
            피부 질환 확률을 간편하게 진단할 수 있습니다.
          </p>
        </div>
        <button
          onClick={() => {
            router.push("/diagnose");
          }}
          className="bg-[#7FC5E0] text-white px-4 py-2 font-bold rounded-lg 
          hover:bg-[#5CA7C8] active:bg-[#4A8FBF] transition cursor-pointer
          text-md sm:text-lg 
          "
        >
          진단하기
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

export default MainDiagnose;
