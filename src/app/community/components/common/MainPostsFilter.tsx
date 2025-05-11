interface MainPostsFilterProps {
  setSortTypeLatest: (sortLatest: string) => void;
  setSortTypeLiked: (sortLiked: string) => void;
  setSortTypeCommented: (sortCommented: string) => void;
}

function MainPostsFilter(props: MainPostsFilterProps) {
  const { setSortTypeLatest, setSortTypeLiked, setSortTypeCommented } = props;

  return (
    <div className="flex space-x-4 mb-4">
      <button
        onClick={() => setSortTypeLatest("latest")}
        className="px-4 py-2 whitespace-nowrap rounded-2xl border"
      >
        최신 순
      </button>
      <button
        onClick={() => setSortTypeLiked("liked")}
        className="px-4 py-2 whitespace-nowrap rounded-2xl border"
      >
        좋아요 순
      </button>
      <button
        onClick={() => setSortTypeCommented("commented")}
        className="px-4 py-2 whitespace-nowrap rounded-2xl border"
      >
        댓글 순
      </button>
    </div>
  );
}

export default MainPostsFilter;
