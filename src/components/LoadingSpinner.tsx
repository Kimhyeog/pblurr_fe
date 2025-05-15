import { ClipLoader } from "react-spinners";

function LoadingSpinner() {
  return (
    <div
      className="
    rounded-2xl flex flex-col gap-y-4 items-center
     w-full min-h-50 border-0 bg-white
    fjustify-center text-gray-500 "
    >
      <ClipLoader className="sm:mx-50 sm:my-50" color="#5CA7C8" size={40} />
    </div>
  );
}

export default LoadingSpinner;
