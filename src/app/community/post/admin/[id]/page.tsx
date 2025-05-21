"use client";

import AdminPostContents from "@/app/community/components/posts/Admin/AdminPostContents";
import { mockAdminPosts } from "@/data/mainFeeds";
import { notFound, useRouter } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  const router = useRouter();
  const postId = parseInt(params.id, 10);
  const post = mockAdminPosts.find((p) => p.id === postId);

  if (!post) {
    notFound(); // 없는 게시글이면 404
  }



  return (
    <div className="w-full   bg-[#FFFFFF] px-3 py-4">
      <div className="flex flex-col justify-center px-4 py-10 bg-white shadow-lg rounded-2xl">
        <AdminPostContents
          post={post}
          routerCallback={() => router.push("/community")}
        />
      </div>
    </div>
  );
}
