"use client";

import { useState } from "react";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Input from "@/components/LoginAndSignUp/Input";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

export default function Page() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState<boolean | null>(null);
  const [failReasonMessage, setFailReasonMessage] = useState("");
  const router = useRouter();

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = async () => {
    if (!userId || !userPassword) {
      Swal.fire("오류", "아이디와 비밀번호를 입력하시오.", "error");
      return;
    }

    const { success, message } = await login(userId, userPassword);

    setLoginCheck(success);
    console.log(success);
    setFailReasonMessage(message);

    if (success) {
      router.push("/"); // 로그인 성공 후 홈으로 이동
    }
  };

  return (
    <motion.div
      className="box"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div
        className="
    w-[80%]
        mx-auto mt-[40%] md:mt-[20%] 
    flex flex-col justify-center items-center 
    bg-white rounded-3xl shadow-lg
    
    
    md:max-w-screen-sm
    lg:max-w-screen-sm
    xl:max-w-screen-sm
    px-20
    py-20
  "
      >
        <div className="flex flex-col items-center justify-center w-full">
          <Link href={"/"}>
            <Image
              src="/images/loginLogo.png"
              alt="로그인 로고"
              width={400}
              height={200}
              layout="intrinsic"
              className="mb-4 w-full min-w-[300px]"
            />
          </Link>
          <div
            className="flex flex-col md:flex-row items-center mb-5 text-sm sm:text-base md:text-lg
          
        "
          >
            <p className="whitespace-nowrap">회원이 아니신가요?</p>
            <nav className="text-[#7FC5E0] px-2 sm:px-3 py-1 rounded-md">
              <Link
                href="/signup"
                className="font-bold text-[#7FC5E0] hover:underline
              whitespace-nowrap"
              >
                회원가입
              </Link>
            </nav>
          </div>
        </div>

        <div
          className="flex flex-col gap-y-3 
        w-[270px]
        "
        >
          <Input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="text-sm sm:text-base px-3 py-2 border border-gray-300 rounded-lg w-full"
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className="text-sm sm:text-base px-3 py-2 border border-gray-300 rounded-lg w-full"
          />
          {loginCheck !== null && (
            <p
              className={`text-sm ${
                loginCheck ? "text-green-500" : "text-red-500"
              } pl-3`}
            >
              {!loginCheck && `${failReasonMessage}`}
            </p>
          )}
          <button
            onClick={handleLogin}
            className="
        w-full bg-[#7FC5E0] text-white font-bold 
        text-base sm:text-lg p-2 rounded-lg 
        hover:bg-[#5CA7C8] active:bg-[#4A8FBF] transition
        
      "
          >
            로그인
          </button>
        </div>
      </div>
    </motion.div>
  );
}
