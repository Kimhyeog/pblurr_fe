import dayjs from "dayjs";
import { useAuth } from "@/app/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "@/api/community/posts.api";
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

  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex flex-row items-center gap-x-2">
          <p className="text-sm text-gray-800 font-semibold">{userName}</p>
          {myId === userId ? (
            <div className="flex items-center gap-x-2">
              <button
                onClick={() => setUpdateInputToggle(true)}
                className="text-sm px-2 py-1 bg-gray-300 rounded-lg text-white font-semibold"
              >
                수정
              </button>
              <button className="text-sm px-2 py-1 bg-gray-300 rounded-lg text-white font-semibold">
                삭제
              </button>
            </div>
          ) : null}
        </div>
        <p className="text-xs pb-3 text-gray-400">{formattedCreateAt}</p>
      </div>
      {!updateInputToggle ? (
        <p className="p-2 text-sm text-gray-600 mt-1">{content}</p>
      ) : (
        <CommentCreateInputBox
          content={updateContent}
          setContent={setUpdateComment}
          mutate={mutattionUpdateComment.mutate}
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  );
}

export default SingleCommentItem;
