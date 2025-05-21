export interface Comment {
  id: number;
  userId: string;
  userName: string;
  content: string;
  createAt: string;
}

export interface FullPost {
  id: number;
  title: string;
  userId: string;
  userName: string;
  images: string[];
  content: string;
  createAt: string;
  updateAt: string;
  likes: string[]; // 좋아요 누른 userId 목록
  comments: Comment[];
}
