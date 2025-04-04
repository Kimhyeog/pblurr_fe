"use client";

import { useState } from "react";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Input from "@/components/LoginAndSignUp/Input";
import Swal from "sweetalert2";

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
    <div className="bg-red max-w-[45%] m-auto mt-[40%] p-10 flex-col justify-center items-center bg-white rounded-3xl">
      <div className="flex flex-col items-center   justify-center">
        <Image
          src="/images/loginLogo.png"
          alt="로그인 로고"
          width={1000}
          height={700}
        />
        <div className="flex flex-row items-center mb-5">
          <p className="text-[20px]">회원이 아니신가요?</p>
          <nav className="text-[#7FC5E0] px-3 py-1 rounded-md">
            <Link
              href="/signup"
              className="text-[20px] font-bold text-[#7FC5E0] hover:underline"
            >
              회원가입
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex flex-col gap-y-3">
        <Input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border-none"
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          className="border-none"
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
          className="w-full m bg-[#7FC5E0] text-white font-bold text-[20px] p-2 rounded-lg hover:bg-[#5CA7C8] action:bg-[#4A8FBF]"
        >
          로그인
        </button>
      </div>
    </div>
  );
}
