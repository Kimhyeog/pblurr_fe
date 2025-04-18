"use client";

import MainDiagnose from "./components/MainDiagnose";
import MainSkinDiagnose from "./components/MainSkinDiagnose";
import { motion } from "framer-motion";

export default function Home() {
  const list = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full flex flex-col">
      <motion.ul variants={list} initial="hidden" animate="visible">
        <motion.li variants={item}>
          <MainDiagnose />
        </motion.li>
        <motion.li variants={item}>
          <MainSkinDiagnose />
        </motion.li>
        {/* <motion.li variants={item}>
        스킨케어미션
        </motion.li>
        <motion.li variants={item}>
        커뮤니티
        </motion.li> */}
      </motion.ul>
    </div>
  );
}
