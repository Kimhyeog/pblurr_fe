"use client";

import { motion } from "framer-motion";
import { getCosmeticRecommendations } from "@/api/skinDiagnose/cosmetic";
import { ProductRecommendation } from "@/types/types";
import { useEffect, useState, useRef } from "react";
import CosMeticItem from "./CosMeticItem";

type Props = {
  wrinkleScore: number;
  pigmentationScore: number;
  poreScore: number;
};

function CosMeticSession(props: Props) {
  const [recommendations, setRecommendations] = useState<
    ProductRecommendation[] | null
  >(null);
  const [visibleIndexes, setVisibleIndexes] = useState<{
    [key: string]: number;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

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
          const initialIndexes: { [key: string]: number } = {};
          data.forEach((item) => {
            initialIndexes[item.category] = 0;
          });
          setVisibleIndexes(initialIndexes);
        }
      } catch (err) {
        setError("추천 제품을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [props]);

  useEffect(() => {
    const entries = Object.entries(carouselRefs.current);
    const timeouts: { [key: string]: NodeJS.Timeout } = {};

    entries.forEach(([category, el]) => {
      if (!el) return;

      const onWheel = (e: WheelEvent) => {
        e.preventDefault();

        if (timeouts[category]) return; // 쿨타임 중이면 무시

        if (e.deltaY > 0) {
          showNext(category);
        } else if (e.deltaY < 0) {
          showPrev(category);
        }

        // 쿨타임 설정 (250ms)
        timeouts[category] = setTimeout(() => {
          delete timeouts[category];
        }, 250);
      };

      el.addEventListener("wheel", onWheel, { passive: false });

      // ✅ cleanup은 전체 effect return 안에 한 번만!
      return () => {
        el.removeEventListener("wheel", onWheel);
      };
    });
  }, [recommendations]);

  const showNext = (category: string) => {
    if (!recommendations) return;
    setVisibleIndexes((prev) => {
      const max =
        recommendations.find((r) => r.category === category)?.products.length ||
        0;
      const current = prev[category] || 0;
      return {
        ...prev,
        [category]: current < max - 1 ? current + 1 : current,
      };
    });
  };

  const showPrev = (category: string) => {
    if (!recommendations) return;
    setVisibleIndexes((prev) => {
      const current = prev[category] || 0;
      return {
        ...prev,
        [category]: current > 0 ? current - 1 : current,
      };
    });
  };

  const getScale = (position: number) => {
    switch (Math.abs(position)) {
      case 0:
        return 1.2;
      case 1:
        return 1;
      case 2:
        return 0.8;
      default:
        return 0;
    }
  };

  if (loading) return <p className="text-center">로딩 중...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="w-full px-4 max-w-4xl mx-auto flex flex-col gap-y-10">
      {recommendations.map((item) => {
        const index = visibleIndexes[item.category] || 0;
        const visibleProducts = item.products.slice(
          Math.max(index - 2, 0),
          Math.min(index + 3, item.products.length)
        );
        return (
          <div
            key={item.category}
            className="border-4 rounded-3xl border-[#7FC5E0] bg-[#E3F2FD] shadow-md"
          >
            {/* 캐러셀 영역 */}
            <motion.div
              className="relative h-[400px] w-full flex items-center justify-center overflow-hidden"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(event, info) => {
                const threshold = 100;
                if (info.offset.x > threshold) {
                  showPrev(item.category);
                } else if (info.offset.x < -threshold) {
                  showNext(item.category);
                }
              }}
              onWheel={(e) => {
                if (e.deltaY < 0) {
                  showNext(item.category);
                } else if (e.deltaY > 0) {
                  showPrev(item.category);
                }
              }}
              ref={(el) => {
                carouselRefs.current[item.category] = el;
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {visibleProducts.map((product, i) => {
                  const position = i - (index > 1 ? 2 : index);
                  const zIndex = 10 - Math.abs(position);
                  const isCenter = position === 0;

                  return (
                    <motion.div
                      key={product.productLink}
                      className="absolute"
                      initial={{ opacity: 0, scale: 0.5, x: 0 }}
                      animate={{
                        opacity: 1,
                        scale: getScale(position),
                        x: position * 150,
                        y: isCenter ? 30 : 70,
                        zIndex: zIndex,
                      }}
                      whileHover={{ scale: 1.25 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 30,
                      }}
                      style={{
                        width: 200,
                        height: 300,
                        zIndex,
                        margin: "0 8px",
                      }}
                    >
                      <CosMeticItem product={product} isCenter={isCenter} />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

export default CosMeticSession;
