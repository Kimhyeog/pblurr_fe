import { Comment } from "@/types/community/type";
import CommentCreateInputBox from "./CommentCreateInputBox";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "@/api/community/posts.api";
import Swal from "sweetalert2";
import SingleCommentItem from "./SingleCommentItem";

interface SinglePostCommentsBoxProps {
  postId: string;
  isLoggedIn: boolean;
  currentUserId: string;
  comments: Comment[];
}

function SinglePostCommentsBox(props: SinglePostCommentsBoxProps) {
  const { comments, isLoggedIn, postId } = props;

  const [content, setContent] = useState<string>("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => createComment(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["singlePost"] });
      // 댓글 창 text 초기화
      setContent("");
    },
    onError: (error) => {
      if (error instanceof Error) {
        Swal.fire("오류", error.message, "error");
      } else {
        Swal.fire("오류", "댓글 작성의 알 수 없는 에러", "error");
      }
    },
  });

  return (
    <div className="flex flex-col gap-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">댓글</h3>
      {/* 댓글 작성 div */}
      <CommentCreateInputBox
        content={content}
        setContent={setContent}
        mutate={mutation.mutate}
        isLoggedIn={isLoggedIn}
      />
      <ul className="space-y-4 flex flex-col gap-y-2">
        {comments.map((comment) => (
          <div key={comment.id} className="w-full">
            <SingleCommentItem
              commentId={comment.id}
              userId={comment.userId}
              userName={comment.userName}
              content={comment.content}
              createAt={comment.createAt}
              isLoggedIn={isLoggedIn}
            />
          </div>
        ))}
      </ul>
    </div>
  );
}

export default SinglePostCommentsBox;
