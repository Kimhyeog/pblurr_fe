interface Props {
  content: string;
  isLoggedIn: boolean;
  setContent: (content: string) => void;
  mutate: () => void;
}

function CommentCreateInputBox(props: Props) {
  const { content, setContent, mutate, isLoggedIn } = props;

  return (
    <div className="flex flex-row items-center gap-x-2 bg-gray-50 rounded-lg p-4 shadow-sm">
      <label className="flex-1">
        <input
          type="textarea"
          placeholder="댓글을 입력하세요."
          className="border-2 border-gray-200 w-full outline-none p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
      {isLoggedIn && (
        <div>
          <button
            onClick={mutate}
            className={`px-3 py-3  rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50`}
          >
            작성
          </button>
        </div>
      )}
    </div>
  );
}

export default CommentCreateInputBox;
