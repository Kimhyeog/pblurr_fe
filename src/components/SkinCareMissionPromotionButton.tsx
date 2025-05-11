// components/FranticButton.tsx
"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FranticButton() {
  const controls = useAnimation();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const loopAnimation = async () => {
      while (mounted) {
        await controls.start({
          rotate: [-5, 5, -5, 5, 0],
          scale: [1, 1.1, 1],
          transition: { duration: 1, ease: "easeInOut" },
        });
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    };

    loopAnimation();

    return () => {
      mounted = false;
    };
  }, [controls]);

  return (
    <motion.button
      onClick={() => {
        router.push("/community");
      }}
      animate={controls}
      whileHover={{ scale: 1.15 }}
      className="font-bold text-sm text-gray-500 hover:underline cursor-pointer"
    >
      👉 커뮤니티
    </motion.button>
  );
}
