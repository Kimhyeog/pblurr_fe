"use client";

import { getPostById } from "@/api/community/posts.api";
import { FullPost } from "@/types/community/type";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import SinglePostContents from "../../components/posts/SinglePostContents";
import SinglePostCommentsBox from "../../components/posts/SinglePostCommentsBox";
import { checkLoginStatus, getUserInfo } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import { GetUserInfo } from "@/types/types";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const postId = params?.postId as string;

  const [likeCount, setLikeCount] = useState(0);
  const [currentUserId, setCurrentUserId] = useState("");

  // 로그인 여부 체크
  const {
    data: isLoggedIn,
    isLoading: isLoginLoading,
    isError: isLoginError,
  } = useQuery({
    queryKey: ["loginStatus"],
    queryFn: checkLoginStatus,
  });

  // 게시글 정보 불러오기
  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
    error: postError,
  } = useQuery<FullPost>({
    queryKey: ["singlePost", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });

  //사용자 정보 조회
  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    isError: isUserInfoError,
  } = useQuery<GetUserInfo | null>({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    enabled: !!isLoggedIn, // 로그인된 경우에만 요청
  });

  //userInfo로 좋아요 수 설정
  useEffect(() => {
    if (post) {
      setLikeCount(post.likes.length);
    }
  }, [post]);

  // userInfo로 currentUserId 설정
  useEffect(() => {
    if (userInfo && userInfo.userId) {
      setCurrentUserId(userInfo.userId);
    } else {
      setCurrentUserId("");
    }
  }, [userInfo]);

  if (isPostError) {
    if (postError instanceof Error) {
      return <div>에러 : {postError.message}</div>;
    }
    return <div>알 수 없는 에러</div>;
  }
  if (isPostLoading)
    return (
      <div className="flex justify-center items-center py-8">
        <ClipLoader color="#EC4899" size={40} />
      </div>
    );

  return (
    <div className="w-full   bg-[#FFFFFF] px-3 py-4">
      {post && (
        <div className="flex flex-col justify-center px-4 py-10 bg-white shadow-lg rounded-2xl">
          <SinglePostContents
            isLoggedIn={isLoggedIn ?? false}
            post={post}
            likeCount={likeCount}
            setLikeCount={setLikeCount}
            routerCallback={() => router.push("/community")}
            currentUserId={currentUserId}
          />
          <SinglePostCommentsBox
            postId={postId}
            isLoggedIn={isLoggedIn ?? false}
            comments={post.comments}
            currentUserId={currentUserId}
          />
        </div>
      )}
    </div>
  );
}
