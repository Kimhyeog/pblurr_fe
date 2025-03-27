import axios from "axios";

const BASE_URL = "https://capstone-backend-1234-ab6179e289b1.herokuapp.com";

// 로그인 여부 확인 함수
const checkLoginStatus = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/check-login`, {
      withCredentials: true, // 쿠키를 포함한 요청
    });

    if (response.status === 200) {
      // 로그인 상태일 때 처리
      console.log(response.data.message); // "로그인된 사용자입니다."
      return response.data.isLoggedIn;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        // 로그인되지 않은 상태일 때 처리
        console.log("로그인되지 않은 사용자입니다.");
        return false;
      }
    }
    // 기타 오류 처리
    console.error("API 요청 중 오류가 발생했습니다.", error);
    return false;
  }
};

export { checkLoginStatus };
