"use client";

import { getPostById, updatePost } from "@/api/community/posts.api";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Page() {
  const queryClient = useQueryClient();
  const params = useParams();
  const router = useRouter();
  const postId = params?.postId as string;

  const {
    data: post,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["singlePost", postId],
    queryFn: () => getPostById(postId),
    staleTime: 1000 * 60 * 5,
    retry: 0,
    enabled: !!postId,
  });

  const mutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["singlePost", postId] })
        .then(() => {
          Swal.fire("수정 완료").then(() => {
            router.back();
          });
        });
    },
    onError: (error) => {
      if (error instanceof Error) {
        Swal.fire("오류", error.message, "error");
      } else {
        Swal.fire("오류", "알 수 없는 에러", "error");
      }
    },
  });

  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content ?? "");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleUpdate = () => {
    mutation.mutate({ postId, title, content });
  };

  if (isLoading)
    return (
      <div className="max-w-screen-md mx-auto min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  if (isError) {
    if (error instanceof Error) {
      alert(`에러 내용 : ${error.message}`);
    }
    return <div className="text-center text-red-500">에러가 발생했습니다.</div>;
  }

  return (
    <div
      className="w-full mx-auto bg-[#FFFFFF] 
     px-10 lg:px-20 
     py-5"
    >
      <div className="">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">게시물 수정</h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            제목
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            내용
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 h-48 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleUpdate}
            className="bg-pink-500 text-white px-6 py-2 rounded-xl text-sm hover:bg-pink-600 transition"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "수정 중..." : "수정하기"}
          </button>

          <button
            onClick={() => router.back()}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2 rounded-xl text-sm transition"
          >
            🔙 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
