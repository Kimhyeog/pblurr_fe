import { SkinAnalysisResult } from "@/types/types";

type SkinAnalysisResultByRegion = {
  images: string[];
  skinAge: number;
  createdAt: string;

  forehead: {
    wrinkle: number;
    pigmentation: number;
  };
  glabella: {
    wrinkle: number;
  };
  eyes: {
    left: { wrinkle: number };
    right: { wrinkle: number };
  };
  cheeks: {
    left: { pigmentation: number; pore: number };
    right: { pigmentation: number; pore: number };
  };
  lips: {
    dryness: number;
  };
  jawline: {
    sagging: number;
  };
  total: {
    wrinkle: number;
    pigmentation: number;
    pore: number;
  };
};

const mockSkinAnalysisByRegion: SkinAnalysisResultByRegion = {
  images: [
    "https://jermany17-backend1234-s3.s3.ap-northeast-2.amazonaws.com/skin-analysis/leejm5050/e3706bbb-fc24-4189-8d61-d31a9045ea7e/front.jpg",
    "https://jermany17-backend1234-s3.s3.ap-northeast-2.amazonaws.com/skin-analysis/leejm5050/e3706bbb-fc24-4189-8d61-d31a9045ea7e/left.jpg",
    "https://jermany17-backend1234-s3.s3.ap-northeast-2.amazonaws.com/skin-analysis/leejm5050/e3706bbb-fc24-4189-8d61-d31a9045ea7e/right.jpg",
  ],
  skinAge: 20,
  createdAt: "2025-04-08T00:56:56.385683",
  forehead: {
    wrinkle: 6,
    pigmentation: 4,
  },
  glabella: {
    wrinkle: 3,
  },
  eyes: {
    left: {
      wrinkle: 3,
    },
    right: {
      wrinkle: 3,
    },
  },
  cheeks: {
    left: {
      pigmentation: 4,
      pore: 4,
    },
    right: {
      pigmentation: 4,
      pore: 4,
    },
  },
  lips: {
    dryness: 3,
  },
  jawline: {
    sagging: 3,
  },
  total: {
    wrinkle: 15,
    pigmentation: 12,
    pore: 8,
  },
};

// 정상적인 피부 미용 분석 결과 예시
export const mockSkinAnalysisResult: SkinAnalysisResult = {
  imageUrls: [
    "/images/left-face.png",
    "/images/front-face.png",
    "/images/right-face.png",
  ],
  skinAge: 30,
  foreheadWrinkle: 6,
  foreheadPigmentation: 3,
  glabellaWrinkle: 4,
  lefteyeWrinkle: 3,
  righteyeWrinkle: 4,
  leftcheekPigmentation: 2,
  leftcheekPore: 4,
  rightcheekPigmentation: 3,
  rightcheekPore: 5,
  lipDryness: 1,
  jawlineSagging: 2,
  totalWrinkle: 15,
  totalPigmentation: 8,
  totalPore: 6,
  createdAt: "2025-04-26T15:00:00Z",
};

// 피부 미용 데이터가 없는 경우 (skinAge: -1)
export const mockEmptySkinAnalysisResult: SkinAnalysisResult = {
  imageUrls: [
    "/images/left-face.png",
    "/images/front-face.png",
    "/images/right-face.png",
  ],
  skinAge: -1,
  foreheadWrinkle: 0,
  foreheadPigmentation: 0,
  glabellaWrinkle: 0,
  lefteyeWrinkle: 0,
  righteyeWrinkle: 0,
  leftcheekPigmentation: 0,
  leftcheekPore: 0,
  rightcheekPigmentation: 0,
  rightcheekPore: 0,
  lipDryness: 0,
  jawlineSagging: 0,
  totalWrinkle: 0,
  totalPigmentation: 0,
  totalPore: 0,
  createdAt: "2025-04-26T15:00:00Z",
};
