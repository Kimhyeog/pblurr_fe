"use client";

import { getPostById } from "@/api/community/posts.api";
import { FullPost } from "@/types/community/type";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import SinglePostContents from "../../components/posts/SinglePostContents";
import SinglePostCommentsBox from "../../components/posts/SinglePostCommentsBox";
import { checkLoginStatus } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const postId = params?.postId as string;

  const [post, setPost] = useState<FullPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // ✅ 추가

  // 로그인 여부 체크
  useEffect(() => {
    const checkLogin = async () => {
      const result = await checkLoginStatus();
      setIsLoggedIn(result);
    };
    checkLogin();
  }, []);

  // 게시글 정보 불러오기
  useEffect(() => {
    if (!postId) return;

    getPostById(postId)
      .then((data) => {
        setPost(data);
        setLikeCount(data.likes.length);
      })
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
    <div className="w-full   bg-[#FFFFFF] px-3 py-4">
      <div className="flex flex-col justify-center px-4 py-10 bg-white shadow-lg rounded-2xl">
        <SinglePostContents
          isLoggedIn={isLoggedIn}
          post={post}
          likeCount={likeCount}
          setLikeCount={setLikeCount}
          routerCallback={() => router.push("/community")}
        />
        <SinglePostCommentsBox
          isLoggedIn={isLoggedIn}
          comments={post.comments}
        />
      </div>
    </div>
  );
}
