"use client";

import { createPost } from "@/api/community/posts.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Page() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutationCreatePost = useMutation({
    mutationFn: createPost,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["SinglePost", res.id] });
      Swal.fire("작성 완료", "게시물이 작성되었습니다.", "success").then(() => {
        router.push(`/community/post/${res.id}`); //이거 post.id를 넣어야 하는데 방법을 모르겠음
      });
      // 예: router.push(`/posts/${data.id}`) 등 리디렉션 가능
    },
    onError: (error) => {
      if (error instanceof Error) {
        Swal.fire("오류", `게시글 생성 실패 : ${error.message}`, "error");
      } else {
        Swal.fire("오류", `알 수 없는 에러`, "error");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutationCreatePost.mutate({ title, content, images });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  return (
    <div
      className="w-full mx-auto bg-[#FFFFFF] 
  px-5 lg:px-20 
  py-5"
    >
      <div className="">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">게시물 작성</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              제목
            </label>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-md font-bold text-gray-700 mb-2">
              내용
            </label>
            <textarea
              placeholder="내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 h-48 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div className="mb-8">
            <label className="block text-md font-bold text-gray-700 mb-2">
              이미지 업로드
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-pink-50 file:text-pink-500
          hover:file:bg-pink-100"
            />
          </div>

          <div className="flex gap-x-1 sm:gap-4">
            <button
              onClick={handleSubmit} //여기 어떻게 함?
              type="submit"
              className="bg-pink-500 text-white px-6 py-2 rounded-xl text-sm hover:bg-pink-600 transition"
              disabled={mutationCreatePost.isPending}
            >
              {mutationCreatePost.isPending ? "작성 중..." : "작성하기"}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 px-6 py-2 rounded-xl text-sm transition"
            >
              🔙 돌아가기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
