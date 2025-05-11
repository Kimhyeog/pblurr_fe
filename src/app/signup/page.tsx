"use client"; // Ensure this is the top line to ensure client-side rendering

import { useRef, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter ,
import { signup, checkUserId } from "@/api/auth";
import Image from "next/image";
import Input from "@/components/LoginAndSignUp/Input";
import Link from "next/link";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

//nextJS에서 useRouter 사용시, /navigation (O)

export default function Page() {
  const [checked, setChecked] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCheckPassword, setUserCheckPassword] = useState("");
  const [userBirthday, setUserBirthday] = useState("1996-12-10");
  const [userGender, setUserGender] = useState("male");
  const [isIdAvailable, setIsIdAvailable] = useState<boolean | null>(null);
  const [isPWAvailable, setIsPWAvailable] = useState<boolean | null>(null);
  const [pwMessage, setPwMessage] = useState("");

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

  // 비밀번호 확인 검사 함수
  const onNewPWCheck = () => {
    if (userPassword !== userCheckPassword) {
      setIsPWAvailable(false);
      setPwMessage("비밀번호가 일치하지 않습니다.");
      setUserCheckPassword("");
      return;
    }
    setIsPWAvailable(true);
    setPwMessage("비밀번호가 일치합니다.");
  };

  // 회원가입 함수
  const handleSignup = async () => {
    if (!userName || !userId || !userPassword || !userBirthday) {
      Swal.fire("오류", "모든 정보를 입력해주세요.", "error");
      return;
    }

    if (!checked) {
      Swal.fire("오류", "개인 정보에 동의하셔야 합니다.", "error");
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
      Swal.fire("회원가입이 완료되었습니다!");

      router.push("/login"); // 로그인 페이지로 이동
    } else {
      Swal.fire("오류", "회원가입 실패. 다시 시도해주세요.", "error");
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
      <div className="flex flex-col items-center justify-center h-screen rounded-3xl bg-[#E3F2FD] p-4">
        <div className="bg-white shadow-lg rounded-3xl p-6 sm:p-8 lg:p-10 w-full max-w-md sm:max-w-lg lg:max-w-xl">
          <div className="flex flex-col items-center">
            <Link href={"/"}>
              <Image
                src="/images/loginLogo.png"
                alt="로그인 로고"
                width={500}
                height={200}
                className="min-w-[300px]"
              />
            </Link>
            <div className="w-full flex flex-col gap-3 mt-4">
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
                    setIsIdAvailable(null);
                  }}
                  onBlur={handleCheckUserId}
                  className="flex-1 p-2 border rounded"
                />
              </div>
              {isIdAvailable !== null && (
                <p
                  className={`text-sm ${
                    isIdAvailable ? "text-green-500" : "text-red-500"
                  } pl-3`}
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
                className="w-full p-2 border rounded"
              />
              <Input
                type="password"
                placeholder="비밀번호 확인"
                value={userCheckPassword}
                onChange={(e) => {
                  setUserCheckPassword(e.target.value);
                  setIsPWAvailable(null);
                }}
                onBlur={onNewPWCheck}
                className="w-full p-2 border rounded"
              />
              {isPWAvailable !== null && (
                <p
                  className={`text-sm ${
                    isPWAvailable ? "text-green-500" : "text-red-500"
                  } pl-3`}
                >
                  {pwMessage}
                </p>
              )}
              {/* 수정&& */}
              <p className="text-xs">생년월일</p>
              <Input
                type="date"
                value={userBirthday}
                onChange={(e) => setUserBirthday(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="생년월일"
              />

              <select
                value={userGender}
                onChange={(e) => setUserGender(e.target.value)}
                className="w-full p-2 border-0 rounded bg-[#F1F3F6] text-gray-700 focus:border-0"
              >
                <option value="male">남성</option>
                <option value="female">여성</option>
              </select>

              <label className="flex justify-center items-center text-blue-500 mt-2">
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
                  <span className="font-bold">개인 정보 제공</span> 에
                  동의합니다.
                </span>
              </label>

              <button
                onClick={handleSignup}
                className="w-full  bg-[#7FC5E0] text-white font-bold p-3 rounded-2xl mt-4"
              >
                가입하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
