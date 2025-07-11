"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaClock, FaExclamationTriangle } from "react-icons/fa";

interface Props {
  startDate: string; // e.g., "2025-05-05"
  endDate: string; // e.g., "2025-05-06"
}

function DeadLine({ startDate, endDate }: Props) {
  const formattedStartDate = `${startDate}T00:00:00`;
  const formattedEndDate = `${endDate}T23:59:59`;

  const [remainingTime, setRemainingTime] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const updateRemaining = () => {
      const now = new Date();
      const end = new Date(formattedEndDate);
      const diffMs = end.getTime() - now.getTime();

      if (diffMs <= 0) {
        setRemainingTime("마감되었습니다.");
        setIsUrgent(false);
        return;
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      setRemainingTime(`남은 시간: ${hours}시간 ${minutes}분 ${seconds}초`);
      setIsUrgent(diffMs <= 1000 * 60 * 60); // 1시간 이내면 urgent
    };

    updateRemaining();
    const interval = setInterval(updateRemaining, 1000);
    return () => clearInterval(interval);
  }, [formattedEndDate]);

  return (
    <div
      className="w-full flex flex-col sm:flex-row items-center justify-center
             sm:items-center sm:justify-between
             px-6 py-3 bg-white rounded-xl border border-[#B2EBF2] shadow-md text-center space-y-2 sm:space-y-0"
    >
      <div className="flex items-center gap-2 text-base font-semibold text-[#0288D1] mb-1">
        <FaClock className="text-[#0288D1]" />
        <span className="text-lg">미션 기간</span>
      </div>

      {isUrgent ? (
        <motion.div
          className="flex  text-md items-center gap-2 text-red-600 font-bold text-sm bg-red-50 border border-red-300 px-3 py-2 rounded-lg"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <FaExclamationTriangle className="text-red-500" />
          <span>{remainingTime}</span>
        </motion.div>
      ) : (
        <div className="text-sm font-medium text-md text-gray-600 px-3 py-1 rounded-lg border border-sky-200 bg-sky-50 shadow-sm">
          {remainingTime}
        </div>
      )}
    </div>
  );
}

export default DeadLine;
