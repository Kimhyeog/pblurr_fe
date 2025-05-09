"use client";

import LeftMainBox from "./LeftMainBox";
import RightMainBox from "./RightBox";

function MainFeed() {
  return (
    <section className="w-full my-10">
      <div className="w-full lg:h-1/5 flex flex-col lg:flex-row gap-4">
        {/* Left: Main Feed */}
        <div className="w-full lg:w-4/5">
          <h2 className="text-2xl font-bold mb-4">올해의 추천 피드</h2>
          <LeftMainBox />
        </div>

        {/* Right: Side Feed (숨김 처리) */}
        <div className="hidden lg:block w-full lg:w-1/5">
          <h2 className="text-xl font-bold mb-4">오늘의 인기글</h2>
          <RightMainBox />
        </div>
      </div>
    </section>
  );
}

export default MainFeed;
