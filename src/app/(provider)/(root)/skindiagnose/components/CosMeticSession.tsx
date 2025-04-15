"use client";

import { getCosmeticRecommendations } from "@/api/skinDiagnose";
import { ProductRecommendation } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import CosMeticCategorieBox from "./CosMeticCategorieBox";

type Props = {
  wrinkleScore: number;
  pigmentationScore: number;
  poreScore: number;
};

function CosMeticSession(props: Props) {
  const [recommendations, setRecommendations] = useState<
    ProductRecommendation[] | null
  >(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 추천 화장품 데이터 요청
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);

      try {
        const wrinkleScore = props.wrinkleScore; // 예시로 점수 설정
        const pigmentationScore = props.pigmentationScore; // 예시로 점수 설정
        const poreScore = props.poreScore; // 예시로 점수 설정

        const data = await getCosmeticRecommendations(
          wrinkleScore,
          pigmentationScore,
          poreScore
        );
        setRecommendations(data);
      } catch (err) {
        setError("추천 제품을 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div>
      <h1>화장품 추천</h1>
      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {recommendations && (
        <div>
          {recommendations.map((recommendation, index) => (
            <CosMeticCategorieBox key={index} recommendation={recommendation} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CosMeticSession;
