"use client";

import { useState } from "react";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";

export default function Page() {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const router = useRouter();

  // 로그인 버튼 클릭 시 실행되는 함수
  const handleLogin = async () => {
    if (!userId || !userPassword) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    const success = await login(userId, userPassword);

    if (success) {
      alert("로그인 성공!");
      router.push("/"); // 로그인 성공 후 홈으로 이동
    } else {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">로그인</h2>
      <input
        type="text"
        placeholder="아이디"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        로그인
      </button>
    </div>
  );
}
