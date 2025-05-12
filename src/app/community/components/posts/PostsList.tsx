import { FullPost } from "@/types/community/type";
import Link from "next/link";
import dayjs from "dayjs";

interface PostsListProps {
  posts: FullPost[];
}

function PostsList(props: PostsListProps) {
  const { posts } = props;
  return (
    <div className="w-full bg-gray-100 rounded p-4 text-sm">
      <h3 className="font-semibold mb-4">실시간 인기 게시글</h3>
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
