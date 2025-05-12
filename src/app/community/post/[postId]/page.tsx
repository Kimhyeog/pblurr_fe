"use client";

import { getPostById } from "@/api/community/posts.api";
import { FullPost } from "@/types/community/type";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const postId = params?.postId as string;

  const [post, setPost] = useState<FullPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  console.log("postId:", postId); // 여기서 찍어보세요

  useEffect(() => {
    if (!postId) return;

    getPostById(postId)
      .then(setPost)
      .catch((err) => {
        setError(
          err.response?.data?.message || "알 수 없는 오류가 발생했습니다."
        );
      });
  }, [postId]);

  if (error) return <div>오류: {error}</div>;
  if (!post)
    return (
      <div className="flex justify-center items-center py-8">
        <ClipLoader color="#EC4899" size={40} />
      </div>
    );

  return (
    <div className="w-full flex flex-col justify-center bg-[#FFFFFF] px-10 py-4">
      <div className="w-full bg-[#F9FAFB] min-h-screen">
        {/* 헤더 영역 */}
        <div
          className="w-full h-60 bg-cover bg-center flex items-center justify-center text-white"
          style={{
            backgroundImage: "url('/your-header-image.jpg')", // <- public 폴더에 이미지 넣기
          }}
        ></div>

        <div className="flex justify-center px-4 py-10">
          <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {post.title}
            </h2>

            <div className="flex justify-between text-sm text-gray-500 mb-6">
              <span>
                작성자:{" "}
                <span className="font-medium text-gray-700">
                  {post.userName}
                </span>
              </span>
              <span>작성일: {new Date(post.createAt).toLocaleString()}</span>
            </div>

            <div className="text-gray-700 leading-relaxed mb-8 whitespace-pre-line">
              {post.content}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-xl text-sm transition">
                ❤️ 좋아요 ({post.likes.length})
              </button>
              <button
                className="bg-white border border-pink-500 text-pink-500 hover:bg-pink-50 px-5 py-2 rounded-xl text-sm transition"
                onClick={() => router.push("/community")}
              >
                🔙 목록으로
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">댓글</h3>
              <ul className="space-y-4">
                {post.comments.map((comment) => (
                  <li
                    key={comment.id}
                    className="bg-gray-50 rounded-lg p-4 shadow-sm"
                  >
                    <p className="text-sm text-gray-800 font-semibold">
                      {comment.userName}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {comment.content}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
