"use client";

import { checkPassword, login } from "@/api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Input from "@/components/LoginAndSignUp/Input";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const {
    data: passwordCheck,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["password-check"],
    queryFn: () => checkPassword(userPassword),
    retry: 0,
    enabled: !!userPassword,
  });

  const mutation = useMutation({
    mutationFn: () => login(userId, userPassword),
    onSuccess: async () => {
      // 여기가 중요했다 시발거
      await queryClient.invalidateQueries({ queryKey: ["loginState"] });
      await queryClient.invalidateQueries({ queryKey: ["userInfo"] });

      Swal.fire("성공", "로그인이 완료되었습니다.", "success").then(() => {
        router.push("/community");
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        Swal.fire("오류", `로그인 실패 : ${error.message}`, "error");
      } else {
        Swal.fire("오류", `알 수 없는 에러`, "error");
      }
    },
  });

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
              src="/images/loginLogo.png"
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
            <nav className="text-pink-600 px-2 sm:px-3 py-1 rounded-md">
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
          {passwordCheck !== null && (
            <p
              className={`text-sm ${
                passwordCheck ? "text-green-500" : "text-red-500"
              } pl-3`}
            >
              {!passwordCheck && `${error?.message}`}
            </p>
          )}
          <button
            onClick={() => mutation.mutate()}
            className="
        w-full bg-pink-500 text-white font-bold 
        text-base sm:text-lg p-2 rounded-lg 
        hover:bg-pink-600 active:bg-pink-700 transition
        
      "
          >
            로그인
          </button>
        </div>
      </div>
    </motion.div>
  );
}
