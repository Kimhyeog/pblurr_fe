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
