"use client";

import { useState } from "react";
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
import { ClipLoader } from "react-spinners";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

type SortType = "latest" | "liked" | "commented";

const PAGE_SIZE = 10;

export default function Page() {
  const [sortType, setSortType] = useState<SortType>("latest");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pathname = usePathname();

  const {
    data: latestData,
    isError: isLatestError,
    isLoading: isLatestLoading,
    error: latestError,
  } = useQuery({
    queryKey: ["postsList-latest", currentPage],
    queryFn: async () => await getLatestPosts(PAGE_SIZE, currentPage),
  });

  const {
    data: likedData,
    isError: isLikedError,
    isLoading: isLikedLoading,
    error: likedError,
  } = useQuery({
    queryKey: ["postsList-likes", currentPage],
    queryFn: async () => await getMostLikedPosts(PAGE_SIZE, currentPage),
  });

  const {
    data: commentedData,
    isError: isCommentedError,
    isLoading: isCommentedLoading,
    error: commentedError,
  } = useQuery({
    queryKey: ["postsList-comments", currentPage],
    queryFn: async () => await getMostCommentedPosts(PAGE_SIZE, currentPage),
  });

  // 현재 sortType에 따라 쿼리 데이터 선택
  let posts: FullPost[] = [];
  let totalPostsCount = 0;
  let isLoading = false;
  let error: unknown = null;

  switch (sortType) {
    case "latest":
      posts = latestData?.posts || [];
      totalPostsCount = latestData?.totalPostsCount || 0;
      isLoading = isLatestLoading;
      error = latestError;
      break;
    case "liked":
      posts = likedData?.posts || [];
      totalPostsCount = likedData?.totalPostsCount || 0;
      isLoading = isLikedLoading;
      error = likedError;
      break;
    case "commented":
      posts = commentedData?.posts || [];
      totalPostsCount = commentedData?.totalPostsCount || 0;
      isLoading = isCommentedLoading;
      error = commentedError;
      break;
  }

  return (
    <div
      className="w-full flex flex-col justify-center
    p-4 rounded-xl mt-3
    bg-white shadow-md
    sm:px-10 sm:py-4"
    >
      <MainFeed />

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <ClipLoader color="#EC4899" size={40} />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          {error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다."}
        </div>
      ) : (
        <>
          <PostsList
            posts={posts}
            setSortTypeLatest={() => {
              setCurrentPage(1);
              setSortType("latest");
            }}
            setSortTypeLiked={() => {
              setCurrentPage(1);
              setSortType("liked");
            }}
            setSortTypeCommented={() => {
              setCurrentPage(1);
              setSortType("commented");
            }}
          />
          <Pagination
            currentPage={currentPage}
            totalPostsCount={totalPostsCount}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
