"use client";

import MainDiagnose from "./components/MainDiagnose";
import MainSkinCompare from "./components/MainSkinCompare";
import { motion } from "framer-motion";
import MainSkinAnalysis from "./components/MainSkinAnalysis";
import MainSkinCareMission from "./components/MainSkinCareMission";

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
    <div className="w-full flex flex-col justify-center">
      <motion.ul variants={list} initial="hidden" animate="visible">
        <motion.li variants={item}>
          <MainDiagnose />
        </motion.li>
        <motion.li variants={item}>
          <MainSkinAnalysis />
        </motion.li>
        <motion.li variants={item}>
          <MainSkinCompare />
        </motion.li>

        <motion.li variants={item}>
          <MainSkinCareMission />
        </motion.li>
      </motion.ul>
    </div>
  );
}
