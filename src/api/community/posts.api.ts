import axios from "axios";
import { FullPost } from "@/types/community/type";
import { MostLikedPostPreview } from "@/types/post.dto/types";

const BASE_URL = "https://capstone-backend-1234-ab6179e289b1.herokuapp.com";

/**
 * 좋아요 수 기준 게시물 전체 조회 (Full 데이터)
 */
export const getMostLikedPosts = async (
  size: number,
  page: number
): Promise<FullPost[]> => {
  const response = await axios.get(
    `${BASE_URL}/posts/read-most-liked?size=${size}&page=${page}`
  );
  return response.data;
};

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
