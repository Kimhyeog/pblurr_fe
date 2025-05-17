import { Comment } from "@/types/community/type";
import dayjs from "dayjs";

interface Props {
  userName: string;
  content: string;
  createAt: string;
}

function SingleCommentItem(props: Props) {
  const { userName, content, createAt } = props;
  const formattedCreateAt = dayjs(createAt).format("YYYY . MM . DD");
  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-800 font-semibold">{userName}</p>
        <p className="text-xs text-gray-400">{formattedCreateAt}</p>
      </div>
      <p className="text-sm text-gray-600 mt-1">{content}</p>
    </div>
  );
}

export default SingleCommentItem;
