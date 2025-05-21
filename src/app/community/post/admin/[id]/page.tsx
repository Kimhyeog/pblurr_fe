// src/app/community/post/admin/[id]/page.tsx

"use client";

import AdminPostContents from "@/app/community/components/posts/Admin/AdminPostContents";
import { mockAdminPosts } from "@/data/mainFeeds";
import { notFound, useParams, useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const postId = parseInt(params?.id as string, 10); // ← id는 라우트 파라미터 이름과 일치해야 함
  const post = mockAdminPosts.find((p) => p.id === postId);

  if (!post) return notFound(); // 명시적으로 종료

  return (
    <div className="w-full bg-[#FFFFFF] px-3 py-4">
      <div className="flex flex-col justify-center px-4 py-10 bg-white shadow-lg rounded-2xl">
        <AdminPostContents
          post={post}
          routerCallback={() => router.push("/community")}
        />
      </div>
    </div>
  );
}
