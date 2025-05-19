import { FullPost } from "@/types/community/type";
import Link from "next/link";
import dayjs from "dayjs";
import { useAuth } from "@/app/hooks/useAuth";

interface PostsListProps {
  posts: FullPost[];
}

function PostsList(props: PostsListProps) {
  const { isLoggedIn } = useAuth();
  const { posts } = props;
  return (
    <div className="w-full bg-gray-100 rounded p-4 text-sm">
      <div className="w-full flex justify-between items-center px-3 mb-4">
        <h3 className="font-semibold ">실시간 인기 게시글</h3>
        {isLoggedIn ? (
          <Link
            className="text-md px-2 py-1 bg-gray-300 rounded-lg text-white font-semibold"
            href={"/community/post/creating"}
            onClick={() => {}}
          >
            글쓰기
          </Link>
        ) : null}
      </div>
      <div className="space-y-2">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/community/post/${post.id}`}
            className="block bg-white border border-gray-300 p-3 rounded-xl hover:bg-gray-50 transition"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-sm text-gray-700">
                {post.title}
              </span>
              <span className="text-xs text-gray-500">
                {dayjs(post.createAt).format("YYYY-MM-DD")}
              </span>
            </div>
            <div className="text-xs text-gray-600 flex flex-wrap gap-3">
              <span>작성자: {post.userName}</span>
              <span>ID: {post.userId}</span>
              <span>좋아요: {post.likes.length}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PostsList;
