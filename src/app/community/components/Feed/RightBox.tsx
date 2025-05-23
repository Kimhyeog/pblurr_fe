"use client";

import { useEffect, useState } from "react";
import { getMostLikedPostsPreview } from "@/api/community/posts.api";
import { MostLikedPostPreview } from "@/types/post.dto/types";

function RightMainBox() {
  const [posts, setPosts] = useState<MostLikedPostPreview[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getMostLikedPostsPreview(3, 1); // size=3, page=0
        setPosts(data);
      } catch (error) {
        console.error("인기 게시물 조회 실패:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-3 bg-gray-100 rounded relative min-h-[150px] shadow-sm"
        >
          {post.images.length > 0 ? (
            <div
              className="absolute inset-0 opacity-10 bg-cover bg-center rounded"
              style={{ backgroundImage: `url(${post.images[0]})` }}
            />
          ) : null}
          <div className="relative z-10">
            <div className="font-semibold text-sm truncate">
              제목 : {post.title}
            </div>
            <div className="text-xs text-gray-600">작성자 : {post.userId}</div>
            <div className="text-xs text-gray-500">
              좋아요 {post.likesCount}개
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RightMainBox;
