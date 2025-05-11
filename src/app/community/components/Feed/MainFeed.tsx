"use client";

import LeftMainBox from "./LeftMainBox";
import RightMainBox from "./RightBox";

function MainFeed() {
  return (
    <section className="w-full my-10">
      <div
        className="
      w-full 
      h-[400px]   // ✅ 고정 높이 설정
      grid 
      grid-cols-1 
      lg:grid-cols-[5fr_2fr] 
      gap-4
      items-stretch
    "
      >
        {/* Left: Main Feed */}
        <div className="w-full h-full flex flex-col ">
          <h2 className="text-2xl font-bold mb-4">올해의 추천 피드</h2>
          <div className="flex-grow">
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
