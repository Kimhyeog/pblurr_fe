import { SkinAnalysisResult } from "@/types/types";
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
