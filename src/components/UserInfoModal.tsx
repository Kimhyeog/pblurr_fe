"use client";

import { User } from "@/types/types";
import { useEffect, useState } from "react";
import ChangePwBox from "./LoginAndSignUp/ChangePwBox";
import { checkPassword, deleteUser } from "@/api/auth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"; //Modal import

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
  const router = useRouter();
  // MyPage 모달 닫기 버튼 핸들러
  const handleCancel = () => {
    setPwInputOpen(false); // `false`로 변경해야 ChangePwBox가 사라지고 버튼이 다시 보임
  };

  const handleClick = async (): Promise<void> => {
    const { value: currentPassword, isDismissed } = await Swal.fire({
      title: "비밀번호 입력",
      input: "password",
      inputPlaceholder: "비밀번호를 입력하세요",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      inputAttributes: {
        autocapitalize: "off",
        autocorrect: "off",
      },
    });

    if (isDismissed) return; // 취소 버튼을 누르면 아무 동작 없이 종료

    if (!currentPassword) {
      Swal.fire("오류", "회원 탈퇴에 실패하였습니다.", "error");
      return;
    }

    const isMatch = await checkPassword(currentPassword);

    if (isMatch) {
      const { isConfirmed } = await Swal.fire({
        title: "정말 탈퇴하시겠습니까?",
        text: "탈퇴 후 복구할 수 없습니다.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "탈퇴하기",
        cancelButtonText: "취소",
      });

      if (isConfirmed) {
        const success = await deleteUser();
        if (success) {
          Swal.fire("탈퇴 완료", "회원 탈퇴가 완료되었습니다.", "success");
          router.push("/login");
        } else {
          Swal.fire("오류", "회원 탈퇴에 실패하였습니다.", "error");
        }
      }
    } else {
      Swal.fire("오류", "비밀번호가 일치하지 않습니다.", "error");
    }
  };

  // 모달 열닫 상태 State의 useEffect
  useEffect(() => {}, [pwInputOpen]);

  if (!isOpen) return null; // isOpen이 false일 때는 모달을 렌더링하지 않음

  return (
    <div
      className="absolute right-30 top-full mt-2 w-lg mx-auto bg-white rounded-2xl border-[1px] border-gray-300 shadow-md p-6
        flex flex-col gap-y-2
      "
      style={{ zIndex: 10 }}
    >
      <h3 className="text-xl font-bold mb-4">
        {userInformation.userName}님 회원 정보
      </h3>

      <div className="mb-2 flex flex-col gap-y-2">
        <p className="text-gray-500 text-md">출생년도</p>
        <span className="text-black font-medium text-lg">
          {userInformation.userBirthday}
        </span>
      </div>

      <div className="mb-2 flex flex-col gap-y-2">
        <p className="text-gray-500 text-md">아이디</p>
        <span className="text-black font-medium text-lg">
          {userInformation.userId}
        </span>
      </div>

      <div className="mb-4 flex flex-col gap-y-2">
        <p className="text-gray-500 text-md text-md">비밀번호</p>
        <div className="flex flex-row gap-x-2">
          {/* 비밀번호 변경 */}
          {pwInputOpen === false ? (
            <button
              onClick={() => setPwInputOpen(true)}
              className="bg-blue-400 text-white text-lg px-3 py-0.5 rounded-lg font-semibold cursor-pointer"
            >
              변경
            </button>
          ) : (
            <ChangePwBox onCLickClose={handleCancel} />
          )}
        </div>
      </div>
      <div className="mb-2 flex flex-col gap-y-2">
        <p className="text-gray-500 text-md">성별</p>
        <span className="text-black font-medium text-lg">
          {userInformation.userGender === "male" ? "남자" : "여자"}
        </span>
      </div>
      <div className="mb-2 flex flex-col gap-y-2">
        <p className="text-gray-500 text-md">가입시기</p>
        <span className="text-black font-medium text-lg">
          {new Date(userInformation.createAt).toLocaleDateString()}
        </span>
      </div>
      <div></div>
      <div className="flex flex-row gap-x-3">
        <button
          onClick={onClose}
          className="w-full bg-blue-400 text-white py-2 rounded-lg font-semibold cursor-pointer"
        >
          닫기
        </button>
        <button
          onClick={handleClick}
          className="w-full bg-red-400 text-white py-2 rounded-lg font-semibold cursor-pointer"
        >
          탈퇴하기
        </button>
      </div>
    </div>
  );
}
