import { FaHeart, FaRegHeart } from "react-icons/fa";

interface AdminCMPostLikeButtonProps {
  postLikesLength: number;
  onLikeToggle: () => void;
  isLiked: boolean;
}

function AdminCMPostLikeButton({
  postLikesLength,
  onLikeToggle,
  isLiked,
}: AdminCMPostLikeButtonProps) {
  return (
    <button
      onClick={onLikeToggle}
      className="flex items-center gap-x-3 bg-white border border-pink-500 text-pink-500 hover:bg-pink-50 px-5 py-2 rounded-xl text-sm transition"
    >
      <span className="text-lg">
        {isLiked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      </span>{" "}
      좋아요 ({postLikesLength})
    </button>
  );
}

export default AdminCMPostLikeButton;
