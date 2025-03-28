"use client"; // Ensure this is the top line to ensure client-side rendering

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter ,
import { signup, checkUserId } from "@/api/auth";

//nextJS에서 useRouter 사용시, /navigation (O)

export default function Page() {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userBirthday, setUserBirthday] = useState("");
  const [userGender, setUserGender] = useState("male");
  const [isIdAvailable, setIsIdAvailable] = useState<boolean | null>(null);

  const router = useRouter(); // useRouter hook

  // 아이디 중복 확인 함수
  const handleCheckUserId = async () => {
    if (!userId.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }

    const available = await checkUserId(userId);
    if (available) {
      setIsIdAvailable(true);
      alert("사용 가능한 아이디입니다.");
    } else {
      setIsIdAvailable(false);
      alert("이미 사용 중인 아이디입니다.");
    }
  };

  // 회원가입 함수
  const handleSignup = async () => {
    if (!userName || !userId || !userPassword || !userBirthday) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    if (isIdAvailable === false) {
      alert("이미 사용 중인 아이디입니다.");
      return;
    }

    const success = await signup({
      userName,
      userId,
      userPassword,
      userBirthday,
      userGender,
    });

    if (success) {
      alert("회원가입이 완료되었습니다!");
      router.push("/login"); // 로그인 페이지로 이동
    } else {
      alert("회원가입 실패. 다시 시도해주세요.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">회원가입</h2>
      <input
        type="text"
        placeholder="이름"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
            setIsIdAvailable(null); // 아이디 변경 시 중복 확인 초기화
          }}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleCheckUserId}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          중복 확인
        </button>
      </div>
      {isIdAvailable !== null && (
        <p
          className={`text-sm ${
            isIdAvailable ? "text-green-500" : "text-red-500"
          }`}
        >
          {isIdAvailable
            ? "사용 가능한 아이디입니다."
            : "이미 사용 중인 아이디입니다."}
        </p>
      )}
      <input
        type="password"
        placeholder="비밀번호"
        value={userPassword}
        onChange={(e) => setUserPassword(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="date"
        value={userBirthday}
        onChange={(e) => setUserBirthday(e.target.value)}
        className="w-full p-2 border rounded mb-2"
      />
      <select
        value={userGender}
        onChange={(e) => setUserGender(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="male">남성</option>
        <option value="female">여성</option>
      </select>
      <button
        onClick={handleSignup}
        className="w-full bg-green-500 text-white p-2 rounded"
      >
        회원가입
      </button>
    </div>
  );
}
