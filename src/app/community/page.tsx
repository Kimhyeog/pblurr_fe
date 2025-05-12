"use client";

import { useEffect, useState } from "react";
import MainFeed from "./components/Feed/MainFeed";
import { FullPost } from "@/types/community/type";
import {
  getLatestPosts,
  getMostCommentedPosts,
  getMostLikedPosts,
} from "@/api/community/posts.api";
import MainPostsFilter from "./components/common/MainPostsFilter";
import PostsList from "./components/posts/PostsList";

type SortType = "latest" | "liked" | "commented";

export default function Page() {
  const [posts, setPosts] = useState<FullPost[]>([]);
  const [sortType, setSortType] = useState<SortType>("latest");

  const fetchPosts = async (type: SortType) => {
    let data: FullPost[] = [];
    switch (type) {
      case "latest":
        data = await getLatestPosts(10, 1);
        break;
      case "liked":
        data = await getMostLikedPosts(10, 1);
        break;
      case "commented":
        data = await getMostCommentedPosts(10, 1);
        break;
    }
    setPosts(data);
  };
  useEffect(() => {
    fetchPosts(sortType);
  }, [sortType]);

  return (
    <div className="w-full flex flex-col justify-center bg-[#FFFFFF] px-10 py-4 ">
      {/* 실시간 인기글 */}

      <MainFeed />

      {/* 피부 타입별 */}
      <section className="w-full flex items-center my-10">
        {/* 순서 Nav */}
        <MainPostsFilter
          setSortTypeLatest={() => setSortType("latest")}
          setSortTypeLiked={() => setSortType("liked")}
          setSortTypeCommented={() => setSortType("commented")}
        />

        {/* 검색창 */}
        <div className="flex items-center border border-gray-300 rounded-full w-full px-4 py-2 mb-4">
          <span className="text-pink-500 mr-2">🔍</span>
          <input
            type="text"
            placeholder="관심있는 피부지식을 검색해보세요."
            className="w-full outline-none bg-transparent"
          />
        </div>
      </section>

      {/* 실시간 인기 게시글 */}
      <PostsList posts={posts} />
    </div>
  );
}
