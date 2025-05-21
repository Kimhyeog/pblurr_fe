"use client";

import { FullPost } from "@/types/community/type";
import CMPostLikeButton from "../common/CMPostLikeButton";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/api/community/posts.api";
import Swal from "sweetalert2";
import Image from "next/image";
import { FaUser } from "react-icons/fa";

interface SinglePostContentsProps {
  isLoggedIn: boolean;
  post: FullPost;
  likeCount: number;
  setLikeCount: (count: number) => void;
  routerCallback: () => void;
}

function SinglePostContents({
  post,
  likeCount,
  isLoggedIn,
  setLikeCount,
  routerCallback,
}: SinglePostContentsProps) {
  const { id, title, userId, userName, images, content, createAt, likes } =
    post;

  const { myId, isLoading } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutationPostDelete = useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["singlePost"] });

      Swal.fire("성공", "게시글 삭제 완료되었습니다", "success").then(() => {
        router.push("/community");
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        Swal.fire("오류", `게시글 삭제 실패 : ${error.message}`, "error");
      } else {
        Swal.fire("오류", `알 수 없는 에러`, "error");
      }
    },
  });

  return (
    <div className="w-full flex flex-col">
      <div className="visible sm:hidden flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <FaUser size={20} /> {userName}
        </div>
        <div className="visible sm:hidden flex items-center">
          {myId === userId && (
            <div className="flex items-center">
              <button
                onClick={() => router.push(`/community/post/${id}/updating`)}
                className="bg-white text-gray-400  boder-x-1 px-5 py-2 hover:underline rounded-xl text-sm transition"
              >
                수정
              </button>
              <span className="text-xs text-gray">|</span>
              <button
                onClick={() => mutationPostDelete.mutate()}
                className="bg-white text-gray-400 boder-x-1 px-5 py-2 hover:underline rounded-xl text-sm transition"
              >
                삭제
              </button>
            </div>
          )}
          <span className="text-xs text-gray">|</span>
          <button
            className="bg-white text-gray-400 boder-x-1 px-5 py-2 hover:underline rounded-xl text-sm transition"
            onClick={routerCallback}
          >
            목록
          </button>
        </div>
      </div>
      <div className="flex items-center my-2">
        <h2 className="flex-1 text-lg sm:text-2xl font-bold text-gray-800 mb-4">
          {title}
        </h2>
        <div className="hidden sm:visible sm:flex items-center gap-x-4">
          {myId === userId && (
            <div className="">
              <button
                onClick={() => router.push(`/community/post/${id}/updating`)}
                className="bg-white text-gray-400  boder-x-1 px-5 py-2 hover:underline rounded-xl text-sm transition"
              >
                수정하기
              </button>
              <span className="text-xs text-gray">|</span>
              <button
                onClick={() => mutationPostDelete.mutate()}
                className="bg-white text-gray-400 boder-x-1 px-5 py-2 hover:underline rounded-xl text-sm transition"
              >
                삭제하기
              </button>
            </div>
          )}
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
        <span className="hidden sm:visible">
          작성자: <span className="font-medium text-gray-700">{userName}</span>
        </span>
        <span>작성일: {new Date(createAt).toLocaleString()}</span>
      </div>

      <div className="flex flex-col sm:flex-row lg:flex-row gap-x-3 my-2 overflow-auto">
        {images.length > 0 &&
          images.map((img, idx) => (
            <div
              key={idx}
              className="relative w-[300px] h-[300px] flex justify-center items-center rounded-xl bg-gray-400 my-2 overflow-hidden group"
            >
              <Image
                src={img}
                alt={`post-image-${idx}`}
                fill
                className="rounded-xl object-contain group-hover:object-cover transition-all duration-300"
                placeholder="empty"
              />
            </div>
          ))}
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
      </div>
    </div>
  );
}

export default SinglePostContents;
