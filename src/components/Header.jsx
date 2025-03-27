"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; // Image 컴포넌트 임포트
import { checkLoginStatus } from "@/api/auth";

export default function Header() {
  const [isLoginState, setIsLoginState] = useState(false);

  // 로그인 상태를 확인하는 함수
  const fetchLoginState = async () => {
    try {
      const response = await checkLoginStatus();
      if (response.isLoggedIn) {
        console.log("로그인 성공");
        setIsLoginState(true); // 로그인 상태일 경우 true로 설정
      } else {
        console.log("로그인 실패");
        setIsLoginState(false); // 로그인되지 않은 상태일 경우 false로 설정
      }
    } catch (error) {
      console.error("로그인 상태 확인 중 오류가 발생했습니다.", error);
      setIsLoginState(false); // 오류가 발생하면 로그인되지 않은 상태로 설정
    }
  };

  // 컴포넌트가 마운트될 때 로그인 상태를 확인
  useEffect(() => {
    fetchLoginState();
  }, []);

  return (
    <div className="w-full bg-white shadow-md px-10 py-4 flex justify-between items-center">
      <div>
        {/* 이미지 경로는 /public을 제외한 경로로 지정 */}
        <Image
          src="/images/loginLogo.png" // public 폴더 기준 경로
          alt="로그인 로고"
          width={250} // 원하는 width
          height={100} // 원하는 height
        />
      </div>
      {isLoginState ? (
        <div className="flex items-center gap-5">
          <p className="text-gray-700 font-medium">김형준님</p>
          <button
            className="
                bg-[#7FC5E0]
                text-white
                px-4
                py-2
                font-bold
                rounded-lg
                hover:bg-[#5CA7C8]
                active:bg-[#4A8FBF]
                transition
                cursor-pointer
              "
          >
            로그아웃
          </button>
        </div>
      ) : (
        <button
          className="
              bg-[#7FC5E0]
              text-white
              font-bold
              px-4
              py-2
              rounded-lg
              hover:bg-[#5CA7C8]
              active:bg-[#4A8FBF]
              transition
              cursor-pointer
            "
        >
          로그인
        </button>
      )}
    </div>
  );
}
