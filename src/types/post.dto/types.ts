export interface MostLikedPostPreview {
  id: number;
  title: string;
  userId: string;
  images: string[];
  likesCount: number;
}

export interface PostUpdateGetUserInfo {
  userId: string;
  // 필요한 필드 추가
}
