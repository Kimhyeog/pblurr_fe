import dayjs from "dayjs";
import { useAuth } from "@/app/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment, updateComment } from "@/api/community/posts.api";
import { useState } from "react";
import Swal from "sweetalert2";
import CommentCreateInputBox from "./CommentCreateInputBox";
interface Props {
  userId: string;
  userName: string;
  content: string;
  createAt: string;
  commentId: number;
  isLoggedIn: boolean;
}

function SingleCommentItem(props: Props) {
  const { userName, content, createAt, userId, commentId, isLoggedIn } = props;
  const formattedCreateAt = dayjs(createAt).format("YYYY . MM . DD");
  const { myId } = useAuth();
  const [updateContent, setUpdateComment] = useState("");
  const [updateInputToggle, setUpdateInputToggle] = useState(false);
  const queryClient = useQueryClient();

  const mutattionUpdateComment = useMutation({
    mutationFn: () => updateComment(commentId, updateContent),
    onSuccess: () => {
      setUpdateInputToggle(false);
      setUpdateComment(content);
      queryClient.invalidateQueries({ queryKey: ["singlePost"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        Swal.fire("오류", error.message, "error");
      } else {
        Swal.fire("오류", "댓글 수정의 알 수 없는 에러", "error");
      }
    },
  });

  const mutationDeleteComment = useMutation({
    mutationFn: () => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["singlePost"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        Swal.fire("오류", error.message, "error");
      } else {
        Swal.fire("오류", "댓글 삭제의 알 수 없는 에러", "error");
      }
    },
  });

  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <p className="flex text-sm mt-2 sm:mt-0 text-gray-800 font-semibold items-center">
          {userName}
        </p>
        <div className="flex items-center">
          {myId === userId ? (
            <div className="flex flex-wrap items-center sm:gap-x-2">
              <button
                onClick={() => setUpdateInputToggle(true)}
                className="text-gray-400  boder-x-1 px-5 py-2 hover:underline rounded-xl text-sm transition"
              >
                수정
              </button>
              <span className="text-xs text-gray">|</span>
              <button
                onClick={() => mutationDeleteComment.mutate()}
                className="text-gray-400 boder-x-1 px-5 py-2 hover:underline rounded-xl text-sm transition"
              >
                삭제
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {!updateInputToggle ? (
        <p className="p-1 text-sm text-gray-600 my-2">{content}</p>
      ) : (
        <CommentCreateInputBox
          content={updateContent}
          setContent={setUpdateComment}
          mutate={mutattionUpdateComment.mutate}
          isLoggedIn={isLoggedIn}
        />
      )}
      <p className="p-1 text-xs text-gray-400">{formattedCreateAt}</p>
    </div>
  );
}

export default SingleCommentItem;
