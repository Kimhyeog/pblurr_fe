"use client";

import { getPostById, togglePostLike } from "@/api/community/posts.api";

interface PostLikeButtonProps {
  postId: number;
  likes_length: number;
}

// 임시 로그인 상태 확인 함수 (예시용)
const getAccessToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken"); // 또는 쿠키/Context 등
  }
  return null;
};

function PostLikeButton(props: PostLikeButtonProps) {
  const { postId, likes_length } = props;
  const handleLikeClick = async () => {
    const token = getAccessToken();
    if (!token) {
      alert("로그인 해야합니다.");
      return;
    }

    try {
      const message = await togglePostLike(postId!);
      alert(message);
      // 최신 상태 반영 (옵션)
    } catch (err: any) {
      alert(err.response?.data?.message || "좋아요 처리 중 오류 발생");
    }
  };

  return (
    <button
      onClick={handleLikeClick}
      className="mt-4 px-4 py-2 bg-pink-400 text-white rounded"
    >
      ❤️ 좋아요 ({likes_length})
    </button>
  );
}

export default PostLikeButton;
