// src/app/hooks/useAuth.ts
import { useQuery } from "@tanstack/react-query";
import { checkLoginStatus, getUserInfo } from "@/api/auth";
import { GetUserInfo } from "@/types/types";

/**
 * 로그인 상태와 사용자 정보를 반환하는 커스텀 훅
 */
export const useAuth = () => {
  const { data: isLoggedIn, isLoading: isLoginLoading } = useQuery({
    queryKey: ["loginState"],
    queryFn: checkLoginStatus,
  });

  const { data: userInfo, isLoading: isUserInfoLoading } =
    useQuery<GetUserInfo | null>({
      queryKey: ["userInfo"],
      queryFn: getUserInfo,
      enabled: !!isLoggedIn, // 로그인 상태일 때만 호출
    });

  const myId = userInfo?.userId ?? null;

  return {
    isLoggedIn: !!isLoggedIn,
    myId,
    userInfo,
    isLoading: isLoginLoading || isUserInfoLoading,
  };
};
