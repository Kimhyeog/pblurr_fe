import { Comment } from "@/types/community/type";
import CommentCreateInputBox from "./CommentCreateInputBox";

interface SinglePostCommentsBoxProps {
  isLoggedIn: boolean;
  comments: Comment[];
}

function SinglePostCommentsBox(props: SinglePostCommentsBoxProps) {
  const { comments, isLoggedIn } = props;

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">댓글</h3>
      {/* 댓글 작성 div */}
      <CommentCreateInputBox />
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-800 font-semibold">
              {comment.userName}
            </p>
            <p className="text-sm text-gray-600 mt-1">{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SinglePostCommentsBox;
