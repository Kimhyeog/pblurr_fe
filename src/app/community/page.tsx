import MainFeed from "./components/Feed/MainFeed";

export default function Page() {
  return (
    <div className="w-full flex flex-col justify-center bg-[#FFFFFF] px-10 py-4 ">
      {/* 실시간 인기글 */}

      <MainFeed />

      {/* 피부 타입별 */}
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4">피부 타입별</h2>
        <div className="flex gap-4 overflow-x-auto mb-4">
          {[
            "수분 관리",
            "여드름",
            "클렌징 관리",
            "피부팩",
            "각질",
            "피부 영양제",
          ].map((label) => (
            <div
              key={label}
              className="flex-shrink-0 w-24 h-32 bg-gray-300 rounded text-center text-sm pt-2"
            >
              {label}
            </div>
          ))}
        </div>

        {/* 검색창 */}
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-full max-w-md">
          <span className="text-pink-500 mr-2">🔍</span>
          <input
            type="text"
            placeholder="관심있는 피부지식을 검색해보세요."
            className="w-full outline-none bg-transparent"
          />
        </div>
      </section>

      {/* 실시간 인기 게시글 */}
      <aside className="w-60 bg-gray-200 rounded p-4 text-sm">
        <h3 className="font-semibold mb-2">실시간 인기 게시글</h3>
        <ol className="list-decimal list-inside space-y-1">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <li key={n} className="text-gray-600">
              게시글 제목 {n}
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}
