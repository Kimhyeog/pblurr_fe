"use client";

import LeftMainBox from "./LeftMainBox";
import RightMainBox from "./RightBox";

function MainFeed() {
  return (
    <section className=" w-full my-0 sm:my-10">
      <div
        className="
        bg-white shadow-md
      w-full 
      h-auto
      sm:h-[400px]   // ✅ 고정 높이 설정
      grid-cols-1 
      flex flex-col
      lg:grid 
      lg:grid-cols-[5fr_2fr] 
      gap-2
      sm:gap-4
      items-stretch
    "
      >
        {/* Left: Main Feed */}
        <div className="w-full sh-full flex flex-col">
          <h2 className="text-center sm:text-left text-xl sm:text-2xl font-bold mb-4">
            피부르르의 추천 피드
          </h2>
          <div className="w-full flex-grow">
            <LeftMainBox />
          </div>
        </div>

        {/* Right: Side Feed (숨김 처리) */}
        <div className="hidden lg:flex flex-col w-full max-h-[440px]">
          <h2 className="text-xl font-bold mb-6">오늘의 인기글</h2>
          <div className="flex-grow overflow-hidden">
            <RightMainBox />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainFeed;
