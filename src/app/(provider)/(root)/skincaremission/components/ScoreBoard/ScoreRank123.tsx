// src/app/(provider)/(root)/skincaremission/components/ScoreBoard/ScoreRank123.tsx

"use client";

import { fetchTop3MissionScores } from "@/api/skinCareMission";
import { TopUser } from "@/types/types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ScoreRankBox() {
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getTopUsers = async () => {
      try {
        const data = await fetchTop3MissionScores();
        setTopUsers(data.topUsers);
      } catch (err: any) {
        setError(err.message);
      }
    };

    getTopUsers();
  }, []);

  if (error) return <div>오류 발생: {error}</div>;

  const rankColors = ["bg-yellow-400", "bg-gray-300", "bg-amber-700"]; // 금, 은, 동
  const rankHeights = ["h-40", "h-32", "h-24"]; // 1등이 가장 높음

  return (
    <div className="w-full h-full bg-white border-4 border-[#5CA7C8] p-6 rounded-xl shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-sky-700">
        🏆 미션 점수 상위 3명
      </h2>
      <div className="flex justify-center items-end gap-4">
        {topUsers.map((user, index) => (
          <motion.div
            key={user.userId}
            className={`w-24 ${rankHeights[index]} ${rankColors[index]} rounded-t-xl flex flex-col justify-end items-center text-white shadow-lg`}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <span className="text-lg font-semibold mt-2">{index + 1}등</span>
            <span className="text-sm mb-2">{user.userId}</span>
            <span className="text-xs mb-4">점수: {user.totalScore}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ScoreRankBox;
