"use client";

import { useState } from "react";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Input from "@/components/LoginAndSignUp/Input";

export default function Page() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginCheck, setLoginCheck] = useState<boolean | null>(null);
  const [failReasonMessage, setFailReasonMessage] = useState("");
  const router = useRouter();

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = async () => {
    if (!userId || !userPassword) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    const { success, message } = await login(userId, userPassword);

    setLoginCheck(success);
    console.log(success);
    setFailReasonMessage(message);

    if (success) {
      alert("로그인 성공!");
      router.push("/"); // 로그인 성공 후 홈으로 이동
    }
  };

  return (
    <div className="max-w-md m-auto h-screen p-6 flex-col justify-center items-center bg-white">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/images/loginLogo.png"
          alt="로그인 로고"
          width={700}
          height={300}
        />
        <div className="flex flex-row items-center mb-5">
          <p>회원이 아니신가요?</p>
          <nav className="text-[#7FC5E0] px-3 py-1 rounded-md">
            <Link href="/signup" className="hover:underline">
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
          className="w-full bg-[#7FC5E0] text-white p-2 rounded-lg hover:bg-[#5CA7C8] action:bg-[#4A8FBF]"
        >
          로그인
        </button>
      </div>
    </div>
  );
}
