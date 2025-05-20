"use client";

import { useState } from "react";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Input from "@/components/LoginAndSignUp/Input";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";

export default function Page() {
  const [userId, setUserId] = useState("");
  const [success, setSuccess] = useState<boolean | null>(null);
  const [userPassword, setUserPassword] = useState("");
  const [failReasonMessage, setFailReasonMessage] = useState("");
  const router = useRouter();

  const mutationLogin = useMutation({
    mutationFn: ({
      userId,
      userPassword,
    }: {
      userId: string;
      userPassword: string;
    }) => login(userId, userPassword),
    onSuccess: (res) => {
      const { success, message } = res;
      // 성공 처리
      if (typeof message !== "undefined") {
        setSuccess(success);
        setFailReasonMessage(message);
      }

      if (success) {
        router.push("/community"); // ✅ 여기서 이동 처리
      }
    },
    onError: (error) => {
      if (!(error instanceof Error)) {
        Swal.fire("오류", "로그인 실패 : 알 수 없는 오류", "error");
      }
    },
  });
  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = () => {
    if (!userId.trim() || !userPassword.trim()) {
      Swal.fire("오류", "아이디와 비밀번호를 입력하시오.", "error");
      return;
    }

    mutationLogin.mutate({ userId, userPassword });
  };

  return (
    <motion.div
      className="w-full min-h-screen flex flex-col justify-center items-center
      px-4 sm:px-4 md:px-10
      "
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
    
    flex flex-col justify-center items-center 
    bg-white rounded-3xl shadow-lg
    w-[350px]
    sm:max-w-screen-sm
    md:max-w-screen-md
    
    
    mx-5 sm:mx-10 md:mx-15
    
    px-20
    py-20
  "
      >
        <div className="flex flex-col items-center justify-center ">
          <Link href={"/community"}>
            <Image
              src="/images/피부르르_가로_로그인로고.png"
              alt="로그인 로고"
              width={400}
              height={200}
              layout="intrinsic"
              className="mb-4 w-full min-w-[280px] sm:min-w-[300px]"
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
                className="font-bold text-pink-600 hover:underline
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

          <p
            className={`text-sm ${
              success ? "text-green-500" : "text-red-500"
            } pl-3`}
          >
            {!success && `${failReasonMessage}`}
          </p>

          <button
            onClick={handleLogin}
            className="
        w-full bg-pink-400 text-white font-bold 
        text-base sm:text-lg p-2 rounded-lg 
        hover:bg-pink-600 active:bg-pink-700 transition cursor-pointer
        
      "
          >
            로그인
          </button>
        </div>
      </div>
    </motion.div>
  );
}
