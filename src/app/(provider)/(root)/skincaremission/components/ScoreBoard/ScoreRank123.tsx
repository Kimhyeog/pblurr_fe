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
    <div className="w-full flex flex-col sm:flex-row items-center justify-evenly bg-white border-4 border-[#5CA7C8] p-4 sm:p-6 rounded-xl shadow-xl gap-5 ">
      <div>
        <h2 className="text-md sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-sky-700">
          🏆 미션 총 점수 상위 3명
        </h2>
        <div className="flex justify-center items-end gap-3 sm:gap-4">
          {topUsers.map((user, index) => (
            <motion.div
              key={user.userId}
              className={`w-20 sm:w-24 
                      ${
                        index === 0
                          ? "h-32 sm:h-40"
                          : index === 1
                          ? "h-28 sm:h-32"
                          : "h-24 sm:h-28"
                      } 
                        ${rankColors[index]} 
                        rounded-t-xl flex flex-col justify-end items-center text-white shadow-lg`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <span className="text-sm sm:text-lg font-semibold mt-2">
                {index + 1}등
              </span>
              <span className="text-xs sm:text-sm mb-1 sm:mb-2">
                {user.userId}
              </span>
              <span className="text-[10px] sm:text-xs mb-3 sm:mb-4">
                총 점수: {user.totalScore}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      {/* <motion.div
        className="ml-4 sm:ml-8 p-3 sm:p-4 rounded-lg bg-sky-50 border border-sky-200 shadow-inner  text-gray-700"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h3 className="font-semibold text-sky-600 mb-2 text-md">
          총점 계산 방식
        </h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            하루 최대 미션{" "}
            <span className="font-semibold text-gray-900">5개</span>
          </li>
          <li>
            예시 기록:{" "}
            <span className="font-mono text-sm">[5, 4, 3, 0, 2]</span>
          </li>
          <li>
            총점 = 5 + 4 + 3 + 0 + 2 ={" "}
            <span className="font-bold text-amber-500">14</span>
          </li>
          <li>날짜 수 = 5, 최대 점수 = 25</li>
          <li>
            평균 비율 = <span className="font-mono">14 / 25 = 0.56</span>
          </li>
          <li>
            평균 점수 = <span className="font-bold text-green-600">56점</span>
          </li>
        </ul>
      </motion.div> */}
    </div>
  );
}

export default ScoreRankBox;
