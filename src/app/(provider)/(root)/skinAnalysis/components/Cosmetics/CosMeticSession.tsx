"use client";

import { getCosmeticRecommendations } from "@/api/skinDiagnose/cosmetic";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ProductRecommendation } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import WepCosMeticProducts from "./WepCosMeticProducts";
import MobileCosMeticProducts from "./MobileCosMeticProducts";

type Props = {
  wrinkleScore: number;
  pigmentationScore: number;
  poreScore: number;
};

function CosMeticSession({
  wrinkleScore,
  pigmentationScore,
  poreScore,
}: Props) {
  const {
    data: cosmetics,
    isLoading,
    isError,
    error,
  } = useQuery<ProductRecommendation[]>({
    queryKey: ["cosmetics"],
    queryFn: () =>
      getCosmeticRecommendations(wrinkleScore, pigmentationScore, poreScore),
    retry: 0,
    staleTime: 1000 * 60 * 5,
    enabled:
      wrinkleScore !== undefined &&
      pigmentationScore !== undefined &&
      poreScore !== undefined,
  });

  if (isLoading)
    return (
      <div className="w-full max-w-[1920px] mx-auto min-h-screen flex items-center justify-center bg-[#7FC5E0]">
        <LoadingSpinner />
      </div>
    );

  if (isError) {
    if (error instanceof Error) {
      return <div>에러 내용 : {error.message}</div>;
    }
    return <div>알 수 없는 에러</div>;
  }

  if (!cosmetics) return null;

  return (
    <>
      {/* PC (lg 이상) 전용 */}
      <div className="hidden lg:block">
        <WepCosMeticProducts cosmetics={cosmetics} />
      </div>

      {/* 모바일 및 태블릿 (lg 미만) 전용 */}
      <div className="block lg:hidden">
        <MobileCosMeticProducts cosmetics={cosmetics} />
      </div>
    </>
  );
}

export default CosMeticSession;
