"use client";

import { useEffect, useState } from "react";
import MainFeed from "./components/Feed/MainFeed";
import { FullPost } from "@/types/community/type";
import dayjs from "dayjs";
import {
  getLatestPosts,
  getMostCommentedPosts,
  getMostLikedPosts,
} from "@/api/community/posts.api";
import MainPostsFilter from "./components/common/MainPostsFilter";

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
      <aside className="w-full bg-gray-100 rounded p-4 text-sm">
        <h3 className="font-semibold mb-2">실시간 인기 게시글</h3>
        <table className="w-full text-left border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">작성자명</th>
              <th className="p-2 border">제목</th>
              <th className="p-2 border">작성일</th>
              <th className="p-2 border">좋아요 수</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t">
                <td className="p-2 border">{post.userId}</td>
                <td className="p-2 border">{post.userName}</td>
                <td className="p-2 border">{post.title}</td>
                <td className="p-2 border">
                  {dayjs(post.createAt).format("YYYY-MM-DD")}
                </td>
                <td className="p-2 border">{post.likes.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </aside>
    </div>
  );
}
