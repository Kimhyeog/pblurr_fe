"use client";

import { FullPost } from "@/types/community/type";
import Image from "next/image";
import AdminCMPostLikeButton from "./AdminCMPostLikeButton";
import { useAuth } from "@/app/hooks/useAuth";
import { useEffect, useState } from "react";

interface AdminPostContentsProps {
  post: FullPost;
  routerCallback: () => void;
}

function AdminPostContents({ post, routerCallback }: AdminPostContentsProps) {
  const { id, title, userId, userName, images, content, createAt, likes } =
    post;

  const { isLoggedIn, myId } = useAuth();
  const [isLiked, setIsLiked] = useState(false);

  const adMinPostofLike = (userId: string) => {
    if (isLoggedIn) {
      const index = post.likes.indexOf(userId);

      if (index === -1) {
        // userId가 없으면 추가
        post.likes.push(userId);
        setIsLiked(true);
      } else {
        // userId가 있으면 제거
        post.likes.splice(index, 1);
        setIsLiked(false);
      }
      return;
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  const onPressLikeBtn = () => {
    if (myId) {
      adMinPostofLike(myId);
    }
  };

  useEffect(() => {
    const checkIsLike = () => {
      const index = post.likes.indexOf(userId);
      if (index === -1) {
        // userId가 없으면 추가
        setIsLiked(false);
      } else {
        // userId가 있으면 제거
        setIsLiked(true);
      }
    };

    checkIsLike();
  }, []);
  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center my-2">
        <h2 className="flex-1 text-2xl font-bold text-gray-800 mb-4">
          {title}
        </h2>
        <div className="flex items-center gap-x-4">
          <span className="text-xs text-gray">|</span>
          <button
            className="bg-white text-gray-400 boder-x-1 px-5 py-2 hover:underline rounded-xl text-sm transition"
            onClick={routerCallback}
          >
            목록
          </button>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-500 mb-6">
        <span>
          작성자: <span className="font-medium text-gray-700">{userName}</span>
        </span>
        <span>작성일: {new Date(createAt).toLocaleString()}</span>
      </div>

      <div className="flex flex-row lg:flex-row gap-x-3 my-2 overflow-auto">
        {images.length > 0
          ? images.map((img, idx) => (
              <Image
                key={idx}
                width={400}
                height={300}
                src={img}
                alt={`post-image-${idx}`}
                className="w-full rounded-xl"
                placeholder="empty"
              />
            ))
          : null}
      </div>
      <div className="text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
        {content}
      </div>

      <div className="flex items-center gap-4 mb-8">
        <AdminCMPostLikeButton
          postLikesLength={post.likes.length}
          onLikeToggle={onPressLikeBtn}
          isLiked={isLiked}
        />
      </div>
    </div>
  );
}

export default AdminPostContents;
