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
import { ClipLoader } from "react-spinners";
import { usePathname } from "next/navigation";

type SortType = "latest" | "liked" | "commented";

export default function Page() {
  const [posts, setPosts] = useState<FullPost[]>([]);
  const [sortType, setSortType] = useState<SortType>("latest");
  const [totalPostsCount, setTotalPostsCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();

  const fetchPosts = async (type: SortType, page: number) => {
    setIsLoading(true);
    setError(null);

    try {
      let data: FullPost[] = [];
      let totalCount = 0;

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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(sortType, currentPage);
  }, [sortType, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full flex flex-col justify-center bg-[#FFFFFF] px-10 py-4">
      <MainFeed />
      <section className="w-full flex items-center my-10">
        <MainPostsFilter
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
      </section>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <ClipLoader color="#EC4899" size={40} />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <PostsList posts={posts} />
          <Pagination
            currentPage={currentPage}
            totalPostsCount={totalPostsCount}
            setCurrentPage={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
