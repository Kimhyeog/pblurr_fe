"use client";

import { useEffect, useState } from "react";
import { checkLoginStatus } from "@/api/auth";
import { togglePostLike, hasUserLikedPost } from "@/api/community/posts.api";
import Swal from "sweetalert2";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface CMPostLikeButtonProps {
  postId: number;
  postLikesLength: number;
  onLikeToggle: (newLikeCount: number) => void;
}

function CMPostLikeButton({
  postId,
  postLikesLength,
  onLikeToggle,
}: CMPostLikeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // 초기 렌더링 시 좋아요 여부 확인
  useEffect(() => {
    const fetchLikeStatus = async () => {
      const isLoggedIn = await checkLoginStatus();
      if (!isLoggedIn) return;

      try {
        const liked = await hasUserLikedPost(postId);
        setIsLiked(liked);
      } catch (error) {
        console.error("좋아요 여부 확인 중 오류:", error);
      }
    };

    fetchLikeStatus();
  }, [postId]);

  const handleClick = async () => {
    setIsLoading(true);

    const isLoggedIn = await checkLoginStatus();
    if (!isLoggedIn) {
      Swal.fire("경고", "좋아요를 누르려면, 회원이여야 합니다.", "warning");
      setIsLoading(false);
      return;
    }

    try {
      const message = await togglePostLike(postId);
      const liked = message.includes("눌렀습니다");

      setIsLiked(liked);
      const newLikeCount = liked ? postLikesLength + 1 : postLikesLength - 1;
      onLikeToggle(newLikeCount);
    } catch (error) {
      console.error("좋아요 요청 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="flex items-center gap-x-3 bg-white border border-pink-500 text-pink-500 hover:bg-pink-50 px-5 py-2 rounded-xl text-sm transition"
    >
      <span className="text-lg">
        {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      </span>{" "}
      좋아요 ({postLikesLength})
    </button>
  );
}

export default CMPostLikeButton;
