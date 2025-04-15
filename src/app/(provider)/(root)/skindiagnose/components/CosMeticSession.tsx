"use client";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { getCosmeticRecommendations } from "@/api/skinDiagnose";
import { ProductRecommendation } from "@/types/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  wrinkleScore: number;
  pigmentationScore: number;
  poreScore: number;
};

function CosMeticSession(props: Props) {
  const [recommendations, setRecommendations] = useState<
    ProductRecommendation[] | null
  >(null);
  const [selectedTab, setSelectedTab] = useState<ProductRecommendation | null>(
    null
  );
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const x = useMotionValue(0);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getCosmeticRecommendations(
          props.wrinkleScore,
          props.pigmentationScore,
          props.poreScore
        );
        setRecommendations(data);
        if (data.length > 0) {
          setSelectedTab(data[0]);
          setVisibleIndex(0);
        }
      } catch (err) {
        setError("추천 제품을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [props]);

  const showNext = () => {
    setDirection("next");
    if (selectedTab && visibleIndex < selectedTab.products.length - 1) {
      setVisibleIndex((prev) => prev + 1);
    }
  };

  const showPrev = () => {
    setDirection("prev");
    if (visibleIndex > 0) {
      setVisibleIndex((prev) => prev - 1);
    }
  };

  const variants = {
    hidden: (direction: "next" | "prev") => ({
      x: direction === "next" ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: (direction: "next" | "prev") => ({
      x: direction === "next" ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 },
    }),
  };

  if (loading) return <p className="text-center">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!recommendations || recommendations.length === 0 || !selectedTab)
    return null;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 카테고리 탭 */}
      <ul className="flex gap-4 mb-6 justify-center">
        {recommendations.map((item) => (
          <li
            key={item.category}
            className={`cursor-pointer px-4 py-2 border-b-2 ${
              item === selectedTab
                ? "border-black font-bold"
                : "border-transparent"
            }`}
            onClick={() => {
              setSelectedTab(item);
              setVisibleIndex(0);
            }}
          >
            {item.category}
            {item === selectedTab && (
              <motion.div
                className="underline"
                layoutId="underline"
                style={{ height: "2px", backgroundColor: "black" }}
              />
            )}
          </li>
        ))}
      </ul>

      {/* 슬라이더 */}
      <div className="relative">
        <motion.div className="relative h-[300px] flex items-center justify-center overflow-hidden">
          <AnimatePresence custom={direction}>
            {selectedTab.products.length > 0 && (
              <motion.div
                key={selectedTab.products[visibleIndex].productLink}
                className="absolute w-[250px] h-[300px] p-4 border rounded-2xl flex flex-col items-center text-center bg-white"
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={direction}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -100) showNext();
                  else if (info.offset.x > 100) showPrev();
                }}
              >
                <Link
                  href={selectedTab.products[visibleIndex].productLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <Image
                    src={selectedTab.products[visibleIndex].productImage}
                    alt={selectedTab.products[visibleIndex].product}
                    width={120}
                    height={120}
                    className="rounded-lg mb-2"
                  />
                  <p>브랜드: {selectedTab.products[visibleIndex].brand}</p>
                  <p>제품명: {selectedTab.products[visibleIndex].product}</p>
                  <p>
                    가격:{" "}
                    {selectedTab.products[
                      visibleIndex
                    ].productPrice.toLocaleString()}
                    원
                  </p>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Prev/Next 버튼 */}
        <div className="flex justify-between mt-4">
          <button
            onClick={showPrev}
            disabled={visibleIndex === 0}
            className="px-3 py-1 border rounded disabled:opacity-30"
          >
            ◀ Prev
          </button>
          <button
            onClick={showNext}
            disabled={visibleIndex === selectedTab.products.length - 1}
            className="px-3 py-1 border rounded disabled:opacity-30"
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>
  );
}

export default CosMeticSession;
