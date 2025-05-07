// src/api/skinCareMission/index.ts

import { DailyMission, MissionScore } from "@/types/types";
import axios from "axios";

const BASE_URL = "https://capstone-backend-1234-ab6179e289b1.herokuapp.com";

// 스킨 케어 미션 GET API 함수수

export const fetchDailyMissions = async (): Promise<DailyMission[]> => {
  try {
    const response = await axios.get<DailyMission[]>(
      `${BASE_URL}/care-mission/daily`,
      {
        withCredentials: true, // 인증이 필요한 경우 쿠키 포함
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("미션을 불러오는 중 문제가 발생했습니다.");
    }
  }
};

// 스킨 케어 미션 생성 API
export const createSkinCareMission = async (): Promise<string> => {
  try {
    const response = await axios.post<{ message: string }>(
      `${BASE_URL}/care-mission/create`,
      {},
      {
        withCredentials: true, // 인증 쿠키 포함
      }
    );
    return response.data.message;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("미션 생성 중 문제가 발생했습니다.");
    }
  }
};

// 스킨 케어 미션 현황 업데이트 API
export const saveTodayMissionCheck = async (
  missions: boolean[]
): Promise<string> => {
  try {
    const body = {
      mission1: missions[0],
      mission2: missions[1],
      mission3: missions[2],
      mission4: missions[3],
      mission5: missions[4],
    };

    const response = await axios.post<{ message: string }>(
      `${BASE_URL}/care-mission/daily/check`,
      body,
      {
        withCredentials: true, // 인증 필요 시 쿠키 포함
      }
    );
    return response.data.message;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("미션 체크 저장 중 문제가 발생했습니다.");
    }
  }
};

// 스킨 케어 미션을 기반으로 한 미션 점수 책정 API

export const fetchMissionScore = async (): Promise<MissionScore> => {
  try {
    const response = await axios.get<MissionScore>(
      `${BASE_URL}/care-mission/score`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("미션 점수를 불러오는 중 문제가 발생했습니다.");
    }
  }
};

// src/api/skinCareMission/index.ts

import { MissionTop3Response } from "@/types/types";

export const fetchTop3MissionScores =
  async (): Promise<MissionTop3Response> => {
    try {
      const response = await axios.get<MissionTop3Response>(
        `${BASE_URL}/care-mission/top3`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(
          "상위 3명의 미션 점수를 불러오는 중 문제가 발생했습니다."
        );
      }
    }
  };
