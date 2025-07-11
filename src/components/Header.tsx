"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { checkLoginStatus, logout, getUserInfo } from "@/api/auth";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import UserInfoModal from "./UserInfoModal";
import { GetUserInfo, User } from "@/types/types";
import Swal from "sweetalert2";
import SkinCareMissionPromotionButton from "./SkinCareMissionPromotionButton";

export default function Header() {
  const [isLoginState, setIsLoginState] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<GetUserInfo | null>(null);
  const pathname = usePathname(); // ✅ 현재 경로 확인
  // 로그인 상태 확인 함수
  const fetchLoginState = async () => {
    try {
      const isLoggedIn = await checkLoginStatus();

      if (!isLoggedIn) {
        // 현재 경로가 '/'가 아니라면 로그인 페이지로 리디렉션
        if (pathname === "/" || pathname === "/test") return;
        else {
          Swal.fire("로그인이 필요합니다.", "", "info").then(() => {
            router.push("/login");
          });
        }
        return; // 로그인 안 됐으므로 아래 코드 실행 안 함
      }

      const response = await getUserInfo();
      if (response) {
        setUserInfo(response);
        setUserName(response.userName);
      }
      setIsLoginState(true);
    } catch (error) {
      console.error("로그인 상태 확인 중 오류 발생:", error);
      setIsLoginState(false);
    }
  };

  // 로그아웃 함수
  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      setIsLoginState(false);
      router.push("/login"); // 로그아웃 후 로그인 페이지로 이동
    } else {
      alert("로그아웃 실패!");
    }
  };

  // 로그인 버튼 클릭 시 이동
  const onClickLogin = (): void => {
    router.push("/login");
  };

  const handleModalOpen = () => {
    setIsUserInfoModalOpen(true); // 모달 열기
  };

  const handleModalClose = () => {
    setIsUserInfoModalOpen(false); // 모달 닫기
  };

  // 컴포넌트가 마운트될 때 로그인 상태 확인
  useEffect(() => {
    fetchLoginState();
  }, [pathname]);

  return (
    <>
      <div
        className="
    max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto
    bg-white shadow-md px-10 py-4 
    flex flex-col justify-center items-center
    md:flex-row md:justify-between
  "
      >
        <div>
          <Link href="/">
            <Image
              src="/images/loginLogo.png"
              alt="로그인 로고"
              width={250}
              height={100}
              className=" sm:min-w-[300px]"
            />
          </Link>
        </div>
        <div className="flex items-center gap-x-5">
          <SkinCareMissionPromotionButton />
          {isLoginState ? (
            // 열맞춤 수정&&
            <div className="flex items-center gap-5 relative">
              <div className="flex flex-row gap-x-3">
                <p
                  onClick={handleModalOpen}
                  className="font-bold  text-sm text-gray-700 hover:underline cursor-pointer"
                >
                  {userName}
                </p>
                <span>님</span>
              </div>
              <button
                onClick={handleLogout}
                className="
              bg-[#7FC5E0] text-white font-bold rounded-lg
              hover:bg-[#5CA7C8] active:bg-[#4A8FBF] transition cursor-pointer
              px-4 py-2
               text-sm sm:text-lg
              "
              >
                로그아웃
              </button>
              {/* UserInfoModal이 열릴 때만 렌더링 */}
              {/* ✅ 모달 위치 기준을 이 div로 제한 */}
              {isUserInfoModalOpen && (
                <UserInfoModal
                  userInformation={userInfo!}
                  isOpen={isUserInfoModalOpen}
                  onClose={handleModalClose}
                />
              )}
            </div>
          ) : (
            <button
              onClick={onClickLogin}
              className="bg-[#7FC5E0] text-white font-bold  rounded-lg
          hover:bg-[#5CA7C8] active:bg-[#4A8FBF] transition cursor-pointer
          px-6 py-2
          text-sm sm:text-lg
          "
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </>
  );
}
