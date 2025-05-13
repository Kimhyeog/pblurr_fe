import { Comment } from "@/types/community/type";

interface SinglePostCommentsBoxProps {
  comments: Comment[];
}

function SinglePostCommentsBox(props: SinglePostCommentsBoxProps) {
  const { comments } = props;

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">댓글</h3>
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
