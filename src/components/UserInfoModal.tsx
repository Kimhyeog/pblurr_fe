"use client";

import { User } from "@/types/types";
import { useState } from "react";
import ChangePwBox from "./LoginAndSignUp/changePwBox";

// UserInfoModal.tsx
interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userInformation: User;
}

export default function UserInfoModal({
  isOpen,
  onClose,
  userInformation,
}: UserInfoModalProps) {
  const [pwInputOpen, setPwInputOpen] = useState(false);
  if (!isOpen) return null; // isOpen이 false일 때는 모달을 렌더링하지 않음
  return (
    <div
      className="absolute right-30 top-full mt-2 w-lg mx-auto bg-white rounded-lg shadow-md p-6
        flex flex-col gap-y-2
      "
      style={{ zIndex: 10 }}
    >
      <h3 className="text-xl font-bold mb-4">
        {userInformation.userName}님 회원 정보
      </h3>

      <div className="mb-2 flex flex-col gap-y-2">
        <p className="text-gray-500 text-sm">출생년도</p>
        <span className="text-black font-medium">
          {userInformation.userBirthday}
        </span>
      </div>

      <div className="mb-2 flex flex-col gap-y-2">
        <p className="text-gray-500 text-sm">아이디</p>
        <span className="text-black font-medium">{userInformation.userId}</span>
      </div>

      <div className="mb-4 flex flex-col gap-y-2">
        <p className="text-gray-500 text-sm">비밀번호</p>
        <div className="flex flex-row gap-x-2">
          {/* 비밀번호 변경 */}
          {pwInputOpen ? (
            <button
              onClick={() => setPwInputOpen(false)}
              className="bg-blue-400 text-white text-sm px-3 py-0.5 rounded-lg font-semibold cursor-pointer"
            >
              변경
            </button>
          ) : (
            <ChangePwBox setPwInputOpen={setPwInputOpen} />
          )}
        </div>
      </div>
      <div className="mb-2 flex flex-col gap-y-2">
        <p className="text-gray-500 text-sm">성별</p>
        <span className="text-black font-medium">
          {userInformation.userGender}
        </span>
      </div>
      <div className="mb-2 flex flex-col gap-y-2">
        <p className="text-gray-500 text-sm">가입시기</p>
        <span className="text-black font-medium">
          {new Date(userInformation.createAt).toLocaleDateString()}
        </span>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-blue-400 text-white py-2 rounded-lg font-semibold cursor-pointer"
      >
        닫기
      </button>
    </div>
  );
}
