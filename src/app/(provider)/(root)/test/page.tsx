"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";

const images = [
  "/images/곰팡이감염.jpg",
  "/images/건선편평태선.jpg",
  "/images/기저세포암.jpg",
  "/images/멜라닌세포모반.jpg",
  "/images/사마귀전염성연속증.jpg",
  "/images/아토피피부염.jpg",
  "/images/지루각화증.jpg",
  "/images/흑색종.jpg",
  "/images/습진.jpg",
];

export default function ImageCarousel() {
  const controls = useAnimation();
  const x = useRef(0); // 현재 위치 기억

  const IMAGE_WIDTH = 100 + 16; // 이미지 가로 100 + gap 16px (tailwind flex gap-4 = 1rem = 16px)

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
    <div className="relative w-full h-[500px] overflow-hidden bg-white">
      {/* 움직이는 뒷배경 이미지들 */}
      <motion.div
        className="absolute top-1/2 left-0 flex gap-4 w-max"
        style={{ translateY: "-50%" }} // y축 중앙 정렬
        animate={controls}
      >
        {images.concat(images).map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`slide-${index}`}
            width={100}
            height={130}
            className="rounded-xl object-cover shadow-lg"
          />
        ))}
      </motion.div>

      {/* 가운데 고정 박스 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-6 bg-white rounded-2xl shadow-2xl w-[300px] h-[400px] flex items-center justify-center">
        <Image
          src="/images/facecheck.jpg"
          alt="center"
          width={250}
          height={350}
          className="rounded-lg object-contain"
        />
      </div>
    </div>
  );
}
