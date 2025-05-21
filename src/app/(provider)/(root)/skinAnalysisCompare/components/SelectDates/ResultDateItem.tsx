import { SkinAnalysisResult } from "@/types/types";
import { motion } from "framer-motion";
import clsx from "clsx";

interface ResultDateItemProps {
  result: SkinAnalysisResult;
  averageScore: number;
  type: "result1" | "result2";
  setHoveredResult: React.Dispatch<
    React.SetStateAction<"result1" | "result2" | null>
  >;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function ResultDateItem({
  result,
  averageScore,
  type,
  setHoveredResult,
}: ResultDateItemProps) {
  const isResult1 = type === "result1";

  return (
    <motion.div
      onMouseEnter={() => setHoveredResult(type)}
      onMouseLeave={() => setHoveredResult(null)}
      initial={false}
      whileHover={{
        scale: 1.05,
        boxShadow: isResult1
          ? "0px 0px 15px rgba(62, 172, 219, 0.5)"
          : "0px 0px 15px rgba(223, 86, 162, 0.5)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={clsx(
        "w-auto flex flex-col p-2 border-3 rounded-2xl text-center cursor-pointer transition-colors duration-200",
        isResult1
          ? "bg-white border-[#3eacdb] text-[#5CA7C8] items-center sm:items-end"
          : "bg-white border-[#df56a2] text-[#F9A8D4] items-center sm:items-start"
      )}
    >
      <p className={clsx("font-bold text-lg", isResult1 && "text-[#5CA7C8]")}>
        {formatDate(result.createdAt)}
        <br />
        <span className={clsx("w-full font-medium")}>평균 점수</span>
      </p>
      <span
        className={clsx(
          "w-full font-extrabold text-xl mt-1",
          isResult1 ? "text-[#3C9FCA]" : ""
        )}
      >
        {averageScore}
      </span>
    </motion.div>
  );
}
