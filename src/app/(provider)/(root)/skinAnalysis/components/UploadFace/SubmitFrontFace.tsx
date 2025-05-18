import Image from "next/image";
import { useRef, useState } from "react";
import ImageCropper from "../../../diagnose/components/ImageCropper";

interface Props {
  onClose: () => void;
  onNext: () => void;
  onFileSelect: (file: File) => void;
}

function SubmitFrontFace(props: Props) {
  const [previewUrl, setPreviewUrl] = useState<string>("/images/frontFace.png");
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isCropping, setIsCropping] = useState(false); // 사진 편집 모드 토글

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setUploaded(true);
      props.onFileSelect(file); // ⬅️ 파일 전달
      setIsCropping(true);
    }
  };

  const handleReupload = () => {
    setPreviewUrl("/images/frontFace.png");
    setUploaded(false);

    fileInputRef.current!.value = "";
  };

  return (
    <div className="bg-white rounded-2xl p-4 w-full  mx-auto my-6">
      <div className="border-2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] overflow-hidden border-[#5CA7C8] rounded-xl p-2">
        <Image
          src={previewUrl}
          alt="얼굴 좌30도 가이드"
          className="w-full rounded-md"
          width={300}
          height={300}
        />
      </div>

      <p className="text-center text-[#333] font-semibold mt-4">
        얼굴 정면 사진을 업로드하세요.
      </p>

      <div className="flex justify-center gap-4 mt-4">
        {!uploaded && (
          <label className="bg-[#5CA7C8] text-white font-bold py-2 px-6 rounded-lg cursor-pointer">
            업로드
            <input
              ref={fileInputRef}
              type="file"
              name="front"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              required
            />
          </label>
        )}

        {uploaded && (
          <>
            <button
              type="button"
              onClick={handleReupload}
              className="bg-[#e85959] text-white font-bold py-2 px-4 rounded-lg"
            >
              재업로드
            </button>
            <button
              type="button"
              onClick={() => setIsCropping(true)}
              className="bg-[#6fcf97] text-white font-bold py-2 px-4 rounded-lg"
            >
              사진 편집
            </button>
          </>
        )}
      </div>

      <div className="flex justify-between mt-6 px-4">
        <button
          type="button"
          onClick={props.onClose}
          className="bg-gray-100 text-[#333] font-semibold py-2 px-6 rounded-lg border"
        >
          취소
        </button>

        <button
          type="button"
          disabled={!uploaded}
          onClick={props.onNext}
          className={`py-2 px-6 rounded-lg font-bold ${
            uploaded
              ? "bg-[#5CA7C8] text-white cursor-pointer hover:bg-blue-600 transition"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          다음
        </button>
      </div>
      {isCropping && uploaded && (
        <div className="w-full h-full rounded-xl shadow-xl fixed inset-0 z-50 bg-black bg-opacity-10 backdrop-blur-md flex items-center justify-center">
          <div className="w-full bg-white rounded-xl p-4 ">
            <ImageCropper
              imageSrc={previewUrl}
              onCloseModal={() => setIsCropping(false)}
              onCropComplete={(croppedFile) => {
                const newImageUrl = URL.createObjectURL(croppedFile);
                if (previewUrl.startsWith("blob:")) {
                  URL.revokeObjectURL(previewUrl);
                }
                setPreviewUrl(newImageUrl);
                props.onFileSelect(croppedFile);
                setIsCropping(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default SubmitFrontFace;
