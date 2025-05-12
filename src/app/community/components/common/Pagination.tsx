interface PaginationProps {
  currentPage: number;
  totalPostsCount: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPostsCount,
  setCurrentPage,
}: PaginationProps) {
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (totalPostsCount == 10) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {/* 이전 버튼 */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50`}
      >
        &lt; {/* < 기호 표시 */}
      </button>

      <p className="px-3 text-lg font-bold">{currentPage}</p>
      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        disabled={totalPostsCount < 10}
        className={`px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50`}
      >
        &gt; {/* > 기호 표시 */}
      </button>
    </div>
  );
}
