"use client"; // Ensure this is the top line to ensure client-side rendering

import { useRef, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter ,
import { signup, checkUserId } from "@/api/auth";
import Image from "next/image";
import Input from "@/components/LoginAndSignUp/Input";
import Link from "next/link";

//nextJS에서 useRouter 사용시, /navigation (O)

export default function Page() {
  const [checked, setChecked] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCheckPassword, setUserCheckPassword] = useState("");
  const [userBirthday, setUserBirthday] = useState("");
  const [userGender, setUserGender] = useState("male");
  const [isIdAvailable, setIsIdAvailable] = useState<boolean | null>(null);
  const [isPWAvailable, setIsPWAvailable] = useState<boolean | null>(null);

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
      alertShown.current = false; // 사용 가능한 경우 alertShown 초기화
    } else {
      setIsIdAvailable(false);
      if (!alertShown.current) {
        alertShown.current = true; // 이후 같은 아이디에 대해 alert 표시 안 함
      }
    }
  };

  const alertShown = useRef(false);

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

    if (!checked) {
      alert("이용약관에 동의해야합니다.");
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
    <div className="w-[500px] m-auto h-screen p-6 flex-col gap-y-20 justify-center items-center bg-white">
      <div className="flex-col items-center justify-center">
        <Link href={"/"}>
          <Image
            src="/images/loginLogo.png"
            alt="로그인 로고"
            width={700}
            height={300}
          />
        </Link>
        <div className="flex flex-col gap-y-3">
          <Input
            type="text"
            placeholder="이름"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2"
          />
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="아이디"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
                setIsIdAvailable(null); // 아이디 변경 시 중복 확인 초기화
              }}
              onBlur={handleCheckUserId}
              // 입력이 끝나면, 아이디 확인 기능
              className="flex-1 p-2 border rounded"
            />
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
          <Input
            type="password"
            placeholder="비밀번호"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <Input
            type="password"
            placeholder="비밀번호 확인"
            value={userCheckPassword}
            onChange={(e) => setUserCheckPassword(e.target.value)}
            onBlur={() => {
              if (userPassword !== userCheckPassword) setIsPWAvailable(false);
            }}
            className="w-full p-2 border rounded mb-2"
          />
          {isPWAvailable !== null && (
            <p
              className={`text-sm ${
                isPWAvailable ? "text-green-500" : "text-red-500"
              }`}
            >
              {isPWAvailable
                ? "비밀번호가 일치합니다."
                : "비밀번호가 일치하지 않습니다."}
            </p>
          )}
          <Input
            type="date"
            value={userBirthday}
            onChange={(e) => setUserBirthday(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <select
            value={userGender}
            onChange={(e) => setUserGender(e.target.value)}
            className="text-[#A3A7AF] bg-[#F1F3F6] w-full p-2 border-none rounded mb-2 px-2 focus:outline-none"
          >
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
          <label className="flex justify-center items-center text-blue-500">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => setChecked(!checked)}
              className="hidden"
            />
            <span
              className={`w-5 h-5 flex items-center justify-center border-2 rounded-md mr-2 ${
                checked ? "bg-blue-500 border-blue-500" : "border-gray-400"
              }`}
            >
              {checked && <span className="text-white text-lg">✓</span>}
            </span>
            <span className="text-lg">
              <span className="text-black">이용 약관</span> 및{" "}
              <span className="font-bold">개인정보 취급방침</span>에 동의합니다.
            </span>
          </label>
          <button
            onClick={handleSignup}
            className="w-full bg-[#7FC5E0] text-white font-bold p-2 rounded"
          >
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
}
