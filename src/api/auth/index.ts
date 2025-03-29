import axios, { AxiosResponse } from "axios";

const BASE_URL = "https://capstone-backend-1234-ab6179e289b1.herokuapp.com";

/**
 * 로그인 여부 확인
 */
const checkLoginStatus = async (): Promise<boolean> => {
  try {
    const response: AxiosResponse<{ message: string; isLoggedIn: boolean }> =
      await axios.get(`${BASE_URL}/check-login`, {
        withCredentials: true,
      });

    console.log(response.data.message); // "로그인된 사용자입니다."
    return response.data.isLoggedIn;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.log("로그인되지 않은 사용자입니다.");
      return false;
    }
    console.error("API 요청 중 오류가 발생했습니다.", error);
    return false;
  }
};

/**
 * 로그인
 */
const login = async (
  userId: string,
  userPassword: string
): Promise<boolean> => {
  try {
    const response: AxiosResponse<{ message: string }> = await axios.post(
      `${BASE_URL}/login`,
      { userId, userPassword },
      { withCredentials: true }
    );

    console.log(response.data.message); // "로그인 성공"
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data.message || "로그인 실패");
    }
    return false;
  }
};

/**
 * 로그아웃
 */
const logout = async (): Promise<boolean> => {
  try {
    const response: AxiosResponse<{ message: string }> = await axios.post(
      `${BASE_URL}/logout`,
      {},
      { withCredentials: true }
    );

    console.log(response.data.message); // "로그아웃 성공."
    return true;
  } catch (error) {
    console.error("로그아웃 실패", error);
    return false;
  }
};

/**
 * 회원가입
 */
const signup = async (userData: {
  userName: string;
  userId: string;
  userPassword: string;
  userBirthday: string;
  userGender: string;
}): Promise<boolean> => {
  try {
    const response: AxiosResponse<{ message: string }> = await axios.post(
      `${BASE_URL}/signup`,
      userData
    );

    console.log(response.data.message); // "회원가입이 완료되었습니다."
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data.message || "회원가입 실패");
    }
    return false;
  }
};

/**
 * userId 중복 확인
 */
const checkUserId = async (userId: string): Promise<boolean> => {
  try {
    const response: AxiosResponse<{ message: string }> = await axios.get(
      `${BASE_URL}/check-userid`,
      {
        params: { userId },
      }
    );

    console.log(response.data.message); // "사용 가능한 아이디입니다."
    return true;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      console.log("이미 사용 중인 아이디입니다.");
    } else {
      console.error("중복 확인 중 오류 발생", error);
    }
    return false;
  }
};

// 사용자 정보 조회 함수
const getUserInfo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/userinfo`, {
      withCredentials: true, // 인증된 요청
    });

    if (response.status === 200) {
      console.log("사용자 정보:", response.data);
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        console.log("로그인이 필요합니다.");
      }
    }
    console.error("API 요청 중 오류가 발생했습니다.", error);
  }
};

/**
 * 비밀번호 확인
 */
const checkPassword = async (currentPassword: string): Promise<boolean> => {
  try {
    const response: AxiosResponse<{ message: string }> = await axios.post(
      `${BASE_URL}/check-password`,
      { currentPassword },
      { withCredentials: true }
    );
    console.log(response.data.message);
    return response.data.message === "현재 비밀번호가 일치합니다.";
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.log("로그인이 필요합니다.");
    } else {
      console.error("API 요청 중 오류가 발생했습니다.", error);
    }
    return false;
  }
};

/**
 * 비밀번호 변경
 */
const updatePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<boolean> => {
  try {
    const response: AxiosResponse<{ message: string }> = await axios.put(
      `${BASE_URL}/update-password`,
      { currentPassword, newPassword },
      { withCredentials: true }
    );
    console.log(response.data.message);
    return response.data.message === "비밀번호가 성공적으로 변경되었습니다.";
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.log("로그인이 필요합니다.");
    } else {
      console.error("API 요청 중 오류가 발생했습니다.", error);
    }
    return false;
  }
};

export {
  checkLoginStatus,
  login,
  logout,
  signup,
  checkUserId,
  getUserInfo,
  checkPassword,
  updatePassword,
};
