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
