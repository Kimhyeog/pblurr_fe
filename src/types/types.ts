// 회원 타입입
export interface User {
  userName: string;
  userId: string;
  userPassword: string;
  userBirthday: string;
  userGender: string;
  createAt: string; // 추가된 속성
  updateAt: string; // 추가된 속성
}

export interface GetUserInfo {
  userName: string;
  userId: string;
  userBirthday: string;
  userGender: string;
  createAt: string; // 추가된 속성
  updateAt: string; // 추가된 속성
}

/**
 * 피부 질환 진단 API 호출 결과 타입 정의
 */
export interface DiagnosisResult {
  disease: string; // 진단된 피부 질환 이름
  probability: number; // 진단된 질환일 확률 (0~100%)
  treatment: string; // 권장 치료법
  source: string; // 진단 결과의 출처 (참고 문헌 또는 기관)
  imageUrl: string; // 분석된 이미지 URL
}

// 피부질환 상세 정보
export interface DetailDieaseInfo {
  disease: string;
  imageUrls: string[];
  definition: string;
  cause: string;
  symptom: string;
  source: string;
}

/**
 * 병원 추천 API 호출 결과 타입 정의
 */
export interface HospitalRecommendation {
  location: string; // 검색한 지역
  hospital1: string; // 추천 병원 1
  hospital1Link: string; // 추천 병원 1 링크
  hospital2: string; // 추천 병원 2
  hospital2Link: string; // 추천 병원 2 링크
  hospital3: string; // 추천 병원 3
  hospital3Link: string; // 추천 병원 3 링크
}

//화장품품
// 인덱스 서명을 사용하여 동적 키를 허용
export interface ProductItem {
  brand: string;
  product: string;
  productImage: string;
  productPrice: number;
  productLink: string; // productLink는 string 타입으로 명확히 정의
}

export interface ProductRecommendation {
  category: string;
  score: "high" | "low";
  products: ProductItem[];
  // 아래와 같이 `productLink`와 같은 필드를 명확하게 정의
  productLink?: string; // 필요한 경우 명시적으로 선언
  // 동적으로 추가되는 다른 속성들
  [key: string]: string | number | ProductItem[] | undefined;
}

// 분석 결과 조회
export interface SkinAnalysisResult {
  imageUrls: string[];
  skinAge: number;
  foreheadWrinkle: number;
  foreheadPigmentation: number;
  glabellaWrinkle: number;
  lefteyeWrinkle: number;
  righteyeWrinkle: number;
  leftcheekPigmentation: number;
  leftcheekPore: number;
  rightcheekPigmentation: number;
  rightcheekPore: number;
  lipDryness: number;
  jawlineSagging: number;
  totalWrinkle: number;
  totalPigmentation: number;
  totalPore: number;
  createdAt: string;
}

// 기존 SkinAnalysisResult는 그대로 유지하고

// 피부 분석 결과 날짜 목록 조회 응답 타입
export interface SkinAnalysisDateListResponse {
  date: string[];
}

// 피부 분석 결과 비교 응답 타입
export interface SkinAnalysisCompareResponse {
  result1: SkinAnalysisResult;
  result2: SkinAnalysisResult;
  result1Average: number;
  result2Average: number;
}

//스킨 케어 미션

export interface DailyMission {
  mission: string;
  checked: boolean;
}

// 스킨 케어 미션 점수

export interface MissionScore {
  startDate: string; // 시작 날짜 (예: "2025-04-20")
  endDate: string; // 종료 날짜 (예: "2025-04-22")
  totalScore: number;
  averageScore: number; // 평균 점수 (0 이상 정수)
}

//스킨 케어의 미션 1,2,3등 점수 계정 3명

export interface TopUser {
  userId: string;
  totalScore: number;
}

export interface MissionTop3Response {
  topUsers: TopUser[];
}
