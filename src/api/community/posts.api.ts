// src/api/community/posts.api.ts

import axios from "axios";
import { FullPost } from "@/types/community/type";
import { MostLikedPostPreview } from "@/types/post.dto/types";

const BASE_URL = "https://capstone-backend-1234-ab6179e289b1.herokuapp.com";

/**
 * 메인 페이지 인기글 미리보기 (Preview용)
 */
export const getMostLikedPostsPreview = async (
  size: number,
  page: number
): Promise<MostLikedPostPreview[]> => {
  const response = await axios.get(
    `${BASE_URL}/posts/read-most-liked?size=${size}&page=${page}`
  );
  const fullPosts: FullPost[] = response.data;

  // 필요한 필드만 추려서 변환
  const previews: MostLikedPostPreview[] = fullPosts.map((post) => ({
    id: post.id,
    title: post.title,
    userId: post.userId,
    images: post.images,
    likesCount: post.likes.length,
  }));

  return previews;
};

/**
 * 좋아요 수 기준 게시물 전체 조회 (Full 데이터)
 */
export const getMostLikedPosts = async (
  size: number,
  page: number
): Promise<{ posts: FullPost[]; totalPostsCount: number }> => {
  const response = await axios.get(
    `${BASE_URL}/posts/read-most-liked?size=${size}&page=${page}`
  );
  const data = response.data;
  // 예시로 posts와 totalPostsCount를 반환
  return { posts: data, totalPostsCount: data.length }; // 실제 totalPostsCount 값을 API에서 제공해야 할 경우 변경
};

/**
 * 최신 게시물 조회 (Full 데이터)
 */
export const getLatestPosts = async (
  size: number,
  page: number
): Promise<{ posts: FullPost[]; totalPostsCount: number }> => {
  const response = await axios.get(
    `${BASE_URL}/posts/read-latest?size=${size}&page=${page}`
  );
  const data = response.data;
  return { posts: data, totalPostsCount: data.length }; // 예시로 posts와 totalPostsCount를 반환
};
/**
 * 댓글 수 기준 게시물 전체 조회 (Full 데이터)
 */
export const getMostCommentedPosts = async (
  size: number,
  page: number
): Promise<{ posts: FullPost[]; totalPostsCount: number }> => {
  const response = await axios.get(
    `${BASE_URL}/posts/read-most-commented?size=${size}&page=${page}`
  );
  const data = response.data;
  return { posts: data, totalPostsCount: data.length }; // 예시로 posts와 totalPostsCount를 반환
};

/** 게시물 단일 조회 API */
export const getPostById = async (postId: string): Promise<FullPost> => {
  const response = await axios.get<FullPost>(
    `${BASE_URL}/posts/read-one/${postId}`
  );
  return response.data;
};

/** 게시물 좋아요 토글 API (등록/취소) */
export const togglePostLike = async (postId: number): Promise<string> => {
  const response = await axios.post(
    `${BASE_URL}/posts/like/${postId}`,
    {}, // body 없음
    { withCredentials: true }
  );
  return response.data.message; // "좋아요를 눌렀습니다." 또는 "좋아요를 취소했습니다."
};

/** 좋아요 여부 확인 API */
export const hasUserLikedPost = async (postId: number): Promise<boolean> => {
  try {
    const response = await axios.get<{ check: boolean }>(
      `${BASE_URL}/posts/like-check/${postId}`,
      { withCredentials: true }
    );
    return response.data.check;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.warn("해당 게시물을 찾을 수 없습니다.");
    } else {
      console.error("좋아요 여부 확인 중 오류 발생:", error);
    }
    return false;
  }
};

//게시물 생성 API

export const createPost = async ({
  title,
  content,
  images,
}: {
  title: string;
  content: string;
  images?: File[]; // optional
}) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (images && images.length > 0) {
      images.forEach((image) => {
        formData.append("files", image); // key: files (복수로 반복)
      });
    }

    const res = await axios.post(`${BASE_URL}/posts/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    if (res.status !== 200) throw new Error("게시물 작성 실패");

    return res.data; // { id: number }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || error.message || "Network Error";

      throw new Error(message);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("알 수 없는 에러");
    }
  }
};

//게시물 수정 API

export interface UpdatePostType {
  postId: string;
  title: string;
  content: string;
}

export const updatePost = async ({
  postId,
  title,
  content,
}: UpdatePostType) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/posts/update/${postId}`,
      //body
      {
        title,
        content,
      },
      {
        withCredentials: true,
      }
    );
    if (res.status !== 200) throw new Error("게시물 수정 실패");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || error.message || "Network Error";

      throw new Error(message);
    } else if (error instanceof Error) throw new Error(error.message);
    else throw new Error("알 수 없는 에러");
  }
};

//게시물 삭제 API
export const deletePost = async (postId: number) => {
  try {
    const res = await axios.delete(`${BASE_URL}/posts/delete/${postId}`, {
      withCredentials: true,
    });

    if (res.status !== 200) throw new Error("게시물 삭제 실패");

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || error.message || "Network Error";
      throw new Error(message);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("알 수 없는 에러");
    }
  }
};

//댓글 작성 API
export const createComment = async (postId: string, content: string) => {
  const response = await axios.post(
    `${BASE_URL}/comments/create/${postId}`,
    { content },
    { withCredentials: true }
  );
  return response.data;
};

/**
 * 댓글 수정 API
 */
export const updateComment = async (commentId: number, content: string) => {
  const response = await axios.put(
    `${BASE_URL}/comments/update/${commentId}`,
    { content },
    { withCredentials: true }
  );
  return response.data;
};

/**
 * 댓글 삭제 API
 */
export const deleteComment = async (commentId: number) => {
  const response = await axios.delete(
    `${BASE_URL}/comments/delete/${commentId}`,
    { withCredentials: true }
  );
  return response.data;
};
