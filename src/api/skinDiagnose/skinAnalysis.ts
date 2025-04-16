import { SkinAnalysisResult } from "@/types/types";
import axios from "axios";

const BASE_URL = "https://capstone-backend-1234-ab6179e289b1.herokuapp.com";

// 피부 분석 요청
export const submitSkinAnalysis = async (
  formData: FormData
): Promise<string> => {
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
