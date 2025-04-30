"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

interface Props {
  onClose: () => void;
  onNext: () => void;
  onFileSelect: (file: File) => void;
}

function SubmitLeftFace(props: Props) {
  const [previewUrl, setPreviewUrl] = useState<string>("/images/left-30.png");
  const [togglePreview, setTogglePreview] = useState<boolean>(false);
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (!uploaded) {
      interval = setInterval(() => {
        setTogglePreview((prev) => !prev);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
      setTogglePreview(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [uploaded]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setUploaded(true);
      props.onFileSelect(file);
    }
  };

  const handleReupload = () => {
    setPreviewUrl("/images/left-30.png");
    setUploaded(false);
    fileInputRef.current!.value = "";
  };

  const imageToShow = !uploaded ? "/images/left-30.png" : previewUrl;

  return (
    <div className="bg-white rounded-2xl p-4 w-full max-w-md mx-auto my-6">
      <div className="border-2 border-[#5CA7C8] rounded-xl p-2">
        <Image
          src={imageToShow}
          alt="얼굴 좌30도 가이드"
          className="w-full rounded-md"
          width={300}
          height={300}
        />
      </div>

      <p className="text-center text-[#333] font-semibold mt-4">
        얼굴 좌측 30도 사진을 업로드하세요.
      </p>

      <div className="flex justify-center gap-4 mt-4">
        {!uploaded && (
          <label className="bg-[#5CA7C8] text-white font-bold py-2 px-6 rounded-lg cursor-pointer">
            업로드
            <input
              ref={fileInputRef}
              type="file"
              name="left"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              required
            />
          </label>
        )}

        {uploaded && (
          <button
            type="button"
            onClick={handleReupload}
            className="bg-[#e85959] text-white font-bold py-2 px-4 rounded-lg"
          >
            재업로드
          </button>
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
    </div>
  );
}

export default SubmitLeftFace;
