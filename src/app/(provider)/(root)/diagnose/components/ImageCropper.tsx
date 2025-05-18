import getCroppedImg from "@/utils/cropImage";
import React, { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop"; // Area 타입 import

const ImageCropper = ({
  imageSrc,
  onCropComplete,
  onCloseModal,
}: {
  imageSrc: string;
  onCropComplete: (croppedFile: File) => void;
  onCloseModal: () => void;
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  const onCropCompleteInternal = useCallback(
    (_: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCrop = async () => {
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
    const croppedFile = new File([croppedBlob], "cropped-image.jpeg", {
      type: "image/jpeg",
    });
    onCropComplete(croppedFile);
  };

  return (
    <div className="w-full ">
      <div style={{ position: "relative", width: "100%", height: 400 }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropCompleteInternal}
        />
      </div>
      <div className="lex items-center justify-between mt-3 gap-x-5 sm:gap-x-10">
        <button
          className="w-full bg-[#5CA7C8] text-white px-4 py-2 font-bold rounded-lg cursor-pointer 
        hover:bg-blue-300
        focus:bg-blue-500 transition
        "
          onClick={handleCrop}
        >
          크롭 완료
        </button>
        <button
          onClick={onCloseModal}
          className="w-full bg-[#f25c5c] text-white px-4 py-2 font-bold rounded-lg cursor-pointer 
               hover:bg-red-400
               focus:bg-[#e76565] transition
               "
        >
          편집 취소
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
