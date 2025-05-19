"use client";

import { FullPost } from "@/types/community/type";
import CMPostLikeButton from "../common/CMPostLikeButton";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/api/community/posts.api";
import Swal from "sweetalert2";

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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

      <div className="flex justify-between text-sm text-gray-500 mb-6">
        <span>
          작성자: <span className="font-medium text-gray-700">{userName}</span>
        </span>
        <span>작성일: {new Date(createAt).toLocaleString()}</span>
      </div>

      <div className="flex flex-col">
        {images.length > 0 ? (
          <div
            className="w-full h-60 bg-cover bg-center flex items-center justify-center text-white"
            style={{ backgroundImage: `url(${post.images[0]})` }}
          />
        ) : null}
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
        {myId === userId && (
          <div className="flex items-center gap-x-4">
            <button
              onClick={() => router.push(`/community/post/${id}/updating`)}
              className="bg-white border border-pink-500 text-pink-500 hover:bg-pink-50 px-5 py-2 rounded-xl text-sm transition"
            >
              수정하기
            </button>
            <button
              onClick={() => mutationPostDelete.mutate()}
              className="bg-white border border-pink-500 text-pink-500 hover:bg-pink-50 px-5 py-2 rounded-xl text-sm transition"
            >
              삭제하기
            </button>
          </div>
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
