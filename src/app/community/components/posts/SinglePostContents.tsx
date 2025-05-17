"use client";

import { FullPost } from "@/types/community/type";
import CMPostLikeButton from "../common/CMPostLikeButton";
import { useRouter } from "next/navigation";

interface SinglePostContentsProps {
  isLoggedIn: boolean;
  post: FullPost;
  likeCount: number;
  setLikeCount: (count: number) => void;
  routerCallback: () => void;
  currentUserId: string;
}

function SinglePostContents({
  post,
  likeCount,
  isLoggedIn,
  setLikeCount,
  routerCallback,
  currentUserId,
}: SinglePostContentsProps) {
  const { id, title, userId, userName, images, content, createAt, likes } =
    post;

  const router = useRouter();

  return (
    <div className="w-full flex flex-col">
      {/* 헤더 사진 영역 */}
      {images.length > 0 ? (
        <div
          className="w-full h-60 bg-cover bg-center flex items-center justify-center text-white"
          style={{
            backgroundImage: "url('/your-header-image.jpg')", // <- public 폴더에 이미지 넣기
          }}
        />
      ) : null}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

      <div className="flex justify-between text-sm text-gray-500 mb-6">
        <span>
          작성자: <span className="font-medium text-gray-700">{userName}</span>
        </span>
        <span>작성일: {new Date(createAt).toLocaleString()}</span>
      </div>

      <div className="text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
        {content}
      </div>

      <div className="flex items-center gap-4 mb-8">
        <CMPostLikeButton
          postId={id}
          postLikesLength={likeCount}
          onLikeToggle={setLikeCount}
          isLoggedIn={isLoggedIn}
        />
        {currentUserId === userId && (
          <button
            onClick={() => router.push(`/community/post/${id}/updating`)}
            className="bg-white border border-pink-500 text-pink-500 hover:bg-pink-50 px-5 py-2 rounded-xl text-sm transition"
          >
            수정하기
          </button>
        )}
        <button
          className="bg-white border border-pink-500 text-pink-500 hover:bg-pink-50 px-5 py-2 rounded-xl text-sm transition"
          onClick={routerCallback}
        >
          🔙 목록으로
        </button>
      </div>
    </div>
  );
}

export default SinglePostContents;
