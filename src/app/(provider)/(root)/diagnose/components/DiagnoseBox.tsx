"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { diagnoseSkinDisease, getSkinDiseaseDetail } from "@/api/diease";
import { DetailDieaseInfo, DiagnosisResult } from "@/types/types";
import Swal from "sweetalert2";

const images = [
  "/images/Characteries/백선.jpg",
  "/images/Characteries/건선.jpg",
  "/images/Characteries/기저세포암.jpg",
  "/images/Characteries/멜라닌세포.jpg",
  "/images/Characteries/사마귀.jpg",
  "/images/Characteries/아토피.jpg",
  "/images/Characteries/지루각화증.jpg",
  "/images/Characteries/흑색종.jpg",
  "/images/Characteries/습진.jpg",
];

interface Props {
  setImage: (imagesrc: string | null) => void;
  setDiagnose: (diagnose: DiagnosisResult | null) => void;
  setDetailInfo: (resultDiease: DetailDieaseInfo | null) => void;
}

function DiagnoseBox(props: Props) {
  const controls = useAnimation();
  const x = useRef(0); // 현재 위치 기억

  const [image, setImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string>("");

  const IMAGE_WIDTH = 100 + 16; // 이미지 가로 100 + gap 16px (tailwind flex gap-4 = 1rem = 16px)

  const onClickImgReUpload = () => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc); // 기존 이미지 URL 정리
    }
    setImage(null); // 이미지 초기화
    setImageSrc(""); // 이미지 URL 초기화
    props.setDiagnose(null); // 진단 결과 초기화 (필요하면)
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);

      // 기존 URL이 있다면 정리
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }

      const newImageUrl = URL.createObjectURL(file);
      setImageSrc(newImageUrl);
    }
  };

  const handleDiagnosis = async () => {
    if (!image) {
      alert("이미지를 업로드하세요.");
      return;
    }

    try {
      const result = await diagnoseSkinDisease(image);

      if (result?.disease) {
        const detail = await getSkinDiseaseDetail(result.disease);
        props.setDetailInfo(detail);
      }

      const imageSrcResult = URL.createObjectURL(image);
      setImageSrc(imageSrcResult); // 이미지 URL 설정
      props.setImage(imageSrcResult);
      props.setDiagnose(result);
    } catch (error: any) {
      Swal.fire("Error", error.message, "warning").then(() => {
        setImage(null);
      });
    }
  };

  useEffect(() => {
    console.log("imageSrc 상태 변경:", imageSrc);
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageSrc]);

  useEffect(() => {
    const interval = setInterval(() => {
      x.current -= 1; // 1px씩 이동

      // 너무 왼쪽으로 이동하면 위치 초기화
      if (x.current <= -(IMAGE_WIDTH * images.length)) {
        x.current = 0;
      }

      controls.start({
        x: x.current,
        transition: { duration: 0.03, ease: "linear" },
      });
    }, 30); // 조금 더 부드럽게 빠르게

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-blue-50 p-3 border-4 border-[#5CA7C8] rounded-3xl shadow-xl">
      {/* 움직이는 뒷배경 이미지들 */}
      <motion.div
        className="absolute top-1/2 left-0 flex gap-4 w-max"
        style={{ translateY: "-50%" }}
        animate={controls}
      >
        {images.concat(images).map((src, index) => {
          const names = [
            "백선",
            "건선",
            "기저세포암",
            "멜라닌세포모반",
            "사마귀",
            "아토피피부염",
            "지루각화증",
            "흑색종",
            "습진",
          ];
          const name = names[index % names.length];

          return (
            <div
              key={index}
              className="flex flex-col items-center gap-1 w-[150px] sm:w-[150px]"
            >
              <Image
                src={src}
                alt={`slide-${index}`}
                width={150}
                height={130}
                className="rounded-2xl object-cover shadow-2xl"
              />
              <p
                className="text-[10px] sm:text-sm text-white  
             bg-[#5CA7C8] rounded-full px-3 py-1 border-2 border-white shadow-md"
              >
                {name}
              </p>
            </div>
          );
        })}
      </motion.div>

      {/* 가운데 고정 박스 */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white rounded-2xl shadow-2xl
        
        flex items-center justify-center border-4 border-[#5CA7C8]
        w-[200px] h-[auto]
        sm:w-[300px] sm:h-[300px]
      "
      >
        {/* 이미지 업로드 */}
        {!image && (
          <div className="flex flex-col items-center justify-center relative  p-3">
            <input
              id="fileUpload"
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 
              w-[180px] h-[180px]
              md:w-[300px] md:h-[300px]
              cursor-pointer"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="fileUpload"
              className="flex items-center justify-center 
              w-[170px] h-[170px]
              sm:w-[250px] sm:h-[250px]
              border-4 border-[#939498f9] border-dotted rounded-3xl cursor-pointer"
            >
              <span className="bg-[#5CA7C8] text-white px-4 py-2 font-bold rounded-lg">
                사진 업로드
              </span>
            </label>
          </div>
        )}

        {/* 업로드된 이미지 */}
        {image && (
          <div className="flex flex-col items-center justify-center relative p-10 mt-2 gap-y-5">
            <Image
              src={imageSrc as string}
              alt="업로드된 이미지"
              width={300}
              height={300}
              className="rounded-lg"
            />
            <div
              className="w-full 
            flex flex-col gap-y-1
            sm:flex sm:flex-row justify-between"
            >
              <button
                className="bg-[#5CA7C8] text-white px-4 py-2 font-bold rounded-lg cursor-pointer 
                hover:bg-blue-300
                focus:bg-blue-500 transition
              "
                onClick={onClickImgReUpload}
              >
                재업로드
              </button>
              <button
                className="bg-[#f25c5c] text-white px-4 py-2 font-bold rounded-lg cursor-pointer 
               hover:bg-red-400
               focus:bg-[#e76565] transition
               "
                onClick={() => {
                  handleDiagnosis();
                }}
              >
                진단요청
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiagnoseBox;
