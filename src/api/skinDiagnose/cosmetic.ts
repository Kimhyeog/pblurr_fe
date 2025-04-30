import { ProductRecommendation, ProductItem } from "@/types/types";
import axios from "axios";

const BASE_URL = "https://capstone-backend-1234-ab6179e289b1.herokuapp.com";

/**
 * 화장품 추천 결과 요청
 * @param wrinkle 주름 점수
 * @param pigmentation 색소침착 점수
 * @param pore 모공 점수
 * @returns ProductRecommendation[] 형태의 추천 제품 리스트
 */
export const getCosmeticRecommendations = async (
  wrinkle: number,
  pigmentation: number,
  pore: number
): Promise<ProductRecommendation[]> => {
  const response = await axios.post<ProductRecommendation[]>(
    `${BASE_URL}/cosmetic-recommend`,
    {
      totalWrinkle: wrinkle,
      totalPigmentation: pigmentation,
      totalPore: pore,
    },
    {
      withCredentials: true, // 쿠키 포함 요청
    }
  );

  // 원본 응답 가공 (brand1 ~ product5 형태 → products 배열 형태로 변환)
  const rawData = response.data;

  const transformedData: ProductRecommendation[] = rawData.map((item) => {
    const products: ProductItem[] = [];

    // 동적으로 키에 접근할 때 타입을 명시적으로 처리
    for (let i = 1; i <= 5; i++) {
      const brandKey = `brand${i}` as keyof typeof item;
      const productKey = `product${i}` as keyof typeof item;
      const productImageKey = `product${i}Image` as keyof typeof item;
      const productPriceKey = `product${i}Price` as keyof typeof item;
      const productLinkKey = `product${i}Link` as keyof typeof item;

      // 타입에 맞게 처리
      products.push({
        brand: item[brandKey] as string, // brand는 string 타입
        product: item[productKey] as string, // product는 string 타입
        productImage: item[productImageKey] as string, // image는 string 타입
        productPrice: item[productPriceKey] as number, // price는 number 타입
        productLink: item[productLinkKey] as string, // link는 string 타입
      });
    }

    return {
      category: item.category as string,
      score: item.score as "high" | "low", // score는 high | low로 명확히 지정
      products,
    };
  });

  return transformedData;
};
