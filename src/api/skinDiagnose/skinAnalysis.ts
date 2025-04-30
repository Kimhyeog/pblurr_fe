import {
  SkinAnalysisCompareResponse,
  SkinAnalysisDateListResponse,
  SkinAnalysisResult,
} from "@/types/types";
import axios from "axios";

const BASE_URL = "https://capstone-backend-1234-ab6179e289b1.herokuapp.com";

// 피부 분석 요청
export const submitSkinAnalysis = async (
  formData: FormData
): Promise<string> => {
  try {
    const response = await axios.post<{ analysisId: string }>(
      `${BASE_URL}/skin-analysis/submit`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data.analysisId;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      const message = error.response.data.message;
      throw new Error(message); // 호출하는 쪽에서 메시지 사용 가능하도록 throw
    }
    throw new Error("피부 분석 요청 중 오류가 발생했습니다.");
  }
};

export const getSkinAnalysisResult = async (
  analysisId: string
): Promise<SkinAnalysisResult> => {
  const response = await axios.get<SkinAnalysisResult>(
    `${BASE_URL}/skin-analysis/${analysisId}`,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// 피부 분석 결과 날짜 목록 조회
export const getSkinAnalysisDateList = async (): Promise<string[]> => {
  try {
    const response = await axios.get<SkinAnalysisDateListResponse>(
      `${BASE_URL}/skin-analysis/date`,
      {
        withCredentials: true,
      }
    );
    return response.data.date;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      const message = error.response.data.message;
      throw new Error(message);
    }
    throw new Error("피부 분석 날짜 목록 조회 중 오류가 발생했습니다.");
  }
};

// 피부 분석 결과 비교 조회
export const compareSkinAnalysisResults = async (
  date1: string,
  date2: string
): Promise<SkinAnalysisCompareResponse> => {
  try {
    const response = await axios.get<SkinAnalysisCompareResponse>(
      `${BASE_URL}/skin-analysis/compare`,
      {
        params: { date1, date2 },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error("피부 분석 결과 비교 중 오류가 발생했습니다.");
  }
};
