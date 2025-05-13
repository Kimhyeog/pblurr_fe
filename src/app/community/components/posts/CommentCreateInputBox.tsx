function CommentCreateInputBox() {
  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
      <input
        type="textarea"
        placeholder="댓글을 입력하세요."
        className="border-2 border-gray-200 w-full outline-none p-2"
      />
    </div>
  );
}

export default CommentCreateInputBox;
