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
import Pagination from "./components/common/Pagination";

type SortType = "latest" | "liked" | "commented";

export default function Page() {
  const [posts, setPosts] = useState<FullPost[]>([]);
  const [sortType, setSortType] = useState<SortType>("latest");
  const [totalPostsCount, setTotalPostsCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchPosts = async (type: SortType, page: number) => {
    let data: FullPost[] = [];
    let totalCount = 0;

    try {
      switch (type) {
        case "latest":
          const latestData = await getLatestPosts(10, page);
          data = latestData.posts;
          totalCount = latestData.totalPostsCount;
          break;
        case "liked":
          const likedData = await getMostLikedPosts(10, page);
          data = likedData.posts;
          totalCount = likedData.totalPostsCount;
          break;
        case "commented":
          const commentedData = await getMostCommentedPosts(10, page);
          data = commentedData.posts;
          totalCount = commentedData.totalPostsCount;
          break;
      }

      setPosts(data);
      setTotalPostsCount(totalCount);
      setTotalPages(Math.ceil(totalCount / 10));
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage); // 페이지 변경
    }
  };

  // 페이지 변경 시마다 fetchPosts를 호출하도록 useEffect 수정
  useEffect(() => {
    fetchPosts(sortType, currentPage);
  }, [sortType, currentPage]);

  return (
    <div className="w-full flex flex-col justify-center bg-[#FFFFFF] px-10 py-4">
      <MainFeed />

      <section className="w-full flex items-center my-10">
        <MainPostsFilter
          setSortTypeLatest={() => {
            setCurrentPage(1); // 페이지를 1로 리셋
            setSortType("latest");
          }}
          setSortTypeLiked={() => {
            setCurrentPage(1); // 페이지를 1로 리셋
            setSortType("liked");
          }}
          setSortTypeCommented={() => {
            setCurrentPage(1); // 페이지를 1로 리셋
            setSortType("commented");
          }}
        />

        <div className="flex items-center border border-gray-300 rounded-full w-full px-4 py-2 mb-4">
          <span className="text-pink-500 mr-2">🔍</span>
          <input
            type="text"
            placeholder="관심있는 피부지식을 검색해보세요."
            className="w-full outline-none bg-transparent"
          />
        </div>
      </section>

      <PostsList posts={posts} />

      <div className="mt-4 text-center">
        <span>총 게시물 수: {totalPostsCount}</span>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPostsCount={totalPostsCount}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
