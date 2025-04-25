import { DetailDieaseInfo } from "@/types/types";
import axios, { AxiosResponse } from "axios";

const BASE_URL = "https://capstone-backend-1234-ab6179e289b1.herokuapp.com";

/**
 * 피부 질환 진단 API 호출
 * @param {File} image - 사용자 업로드 이미지 파일
 * @returns {Promise<{disease: string; probability: number; treatment: string; source: string; imageUrl: string;} | null>}
 */
const diagnoseSkinDisease = async (image: File) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response: AxiosResponse<{
      disease: string;
      probability: number;
      treatment: string;
      source: string;
      imageUrl: string;
    }> = await axios.post(`${BASE_URL}/skin-diagnosis`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error(
        error.response.data?.message || "알 수 없는 오류가 발생했습니다."
      );
    }
    throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
};

/**
 * 병원 추천 API 호출
 * @param {string} location - 검색할 지역 (예: "강동구")
 * @returns {Promise<{ location: string; hospital1: string; hospital1Link: string; hospital2: string; hospital2Link: string; hospital3: string; hospital3Link: string;} | null>}
 */
const getHospitalRecommendations = async (location: string) => {
  try {
    const response: AxiosResponse<{
      location: string;
      hospital1: string;
      hospital1Link: string;
      hospital2: string;
      hospital2Link: string;
      hospital3: string;
      hospital3Link: string;
    }> = await axios.get(`${BASE_URL}/hospital`, {
      params: { location },
      withCredentials: true,
    });

    console.log("병원 추천 결과:", response.data);
    return response.data;
  } catch (error) {
    console.error("병원 추천 API 호출 중 오류 발생:", error);
    return null;
  }
};

/**
 * 피부 질환 상세 정보 조회 API 호출
 * @param {string} disease - 질환 이름
 * @returns {Promise<{
 *   disease: string;
 *   imageUrls: string[];
 *   definition: string;
 *   cause: string;
 *   symptom: string;
 *   source: string;
 * } | null>}
 */
const getSkinDiseaseDetail = async (disease: string) => {
  try {
    const response: AxiosResponse<DetailDieaseInfo> = await axios.get(
      `${BASE_URL}/skin-diagnosis/detail`,
      {
        params: { disease },
        withCredentials: true,
      }
    );

    console.log("질환 상세 정보:", response.data);
    return response.data;
  } catch (error) {
    console.error("피부 질환 상세 정보 API 호출 중 오류 발생:", error);
    return null;
  }
};

export {
  diagnoseSkinDisease,
  getHospitalRecommendations,
  getSkinDiseaseDetail,
};
