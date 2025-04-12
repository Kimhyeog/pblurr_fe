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

// 피부미용

// 화장품 타입

interface ProductRecommendation {
  category: string;
  score: string;
  brand1: string;
  product1: string;
  product1Image: string;
  product1Price: number;
  product1Link: string;
  brand2: string;
  product2: string;
  product2Image: string;
  product2Price: number;
  product2Link: string;
  brand3: string;
  product3: string;
  product3Image: string;
  product3Price: number;
  product3Link: string;
  brand4: string;
  product4: string;
  product4Image: string;
  product4Price: number;
  product4Link: string;
  brand5: string;
  product5: string;
  product5Image: string;
  product5Price: number;
  product5Link: string;
}
