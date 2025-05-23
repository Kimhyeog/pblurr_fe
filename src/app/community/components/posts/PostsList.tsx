import { FullPost } from "@/types/community/type";
import Link from "next/link";
import dayjs from "dayjs";
import { useAuth } from "@/app/hooks/useAuth";
import MainPostsFilter from "../common/MainPostsFilter";
import FilterDropdown from "../common/MobileFilter";
import MobileMainPostsFilter from "../common/MobileFilter";

interface PostsListProps {
  setSortTypeLatest: (sortLatest: string) => void;
  setSortTypeLiked: (sortLiked: string) => void;
  setSortTypeCommented: (sortCommented: string) => void;
  posts: FullPost[];
}

function PostsList(props: PostsListProps) {
  const { isLoggedIn } = useAuth();
  const { posts, setSortTypeCommented, setSortTypeLatest, setSortTypeLiked } =
    props;
  return (
    <div className="w-full border-3 bg-pink-50 border-pink-200 rounded-2xl p-2 py-4 sm:px-4 text-sm mt-5">
      <div className="w-full flex justify-between items-center px-3 mb-4">
        <div className="flex-1 flex items-center gap-x-5">
          <h3 className="whitespace-nowrap text-md sm:text-lg font-semibold text-pink-700">
            전체 글
          </h3>
        </div>
        <div>
          <div className="flex items-center gap-x-1 sm:gap-x-3">
            {isLoggedIn ? (
              <Link
                className="text-sm sm:text-lg px-4 py-1 bg-pink-400 hover:bg-pink-500 rounded-lg text-white font-semibold transition"
                href={"/community/post/creating"}
              >
                글쓰기
              </Link>
            ) : null}
            <MobileMainPostsFilter
              setSortTypeLatest={setSortTypeLatest}
              setSortTypeLiked={setSortTypeLiked}
              setSortTypeCommented={setSortTypeCommented}
            />
            <MainPostsFilter
              setSortTypeLatest={setSortTypeLatest}
              setSortTypeLiked={setSortTypeLiked}
              setSortTypeCommented={setSortTypeCommented}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/community/post/${post.id}`}
            className="block bg-white border border-pink-200 hover:border-pink-300 p-4 rounded-xl hover:bg-pink-50 transition"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm text-pink-800">
                {post.title}
              </span>
              <span className="hidden sm:inline text-xs text-gray-500">
                {dayjs(post.createAt).format("YYYY-MM-DD")}
              </span>
            </div>
            <div className="text-xs font-medium text-gray-500 flex flex-wrap gap-3">
              <span className="hidden sm:inline">작성자: {post.userName}</span>
              <span>
                <span className="hidden sm:inline">ID</span>
                <span className="inline sm:hidden">🧑‍🦲</span> : {post.userId}
              </span>
              <span>
                <span className="hidden sm:inline">좋아요</span>
                <span className="inline sm:hidden">♥️</span> :
                {" " + post.likes.length}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PostsList;
