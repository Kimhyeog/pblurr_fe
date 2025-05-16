//src/components/UserInfoModal.tsx

"use client";

import { GetUserInfo, User } from "@/types/types";
import { useEffect, useState } from "react";
import ChangePwBox from "./LoginAndSignUp/ChangePwBox";
import { checkPassword, deleteUser } from "@/api/auth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { AnimatePresence, motion } from "framer-motion";

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userInformation: GetUserInfo;
}

export default function UserInfoModal({
  isOpen,
  onClose,
  userInformation,
}: UserInfoModalProps) {
  const [pwInputOpen, setPwInputOpen] = useState(false);
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 640); // sm 기준
  };

  useEffect(() => {
    handleResize(); // 최초 확인
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCancel = () => {
    setPwInputOpen(false);
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

    if (isDismissed) return;

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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="
    absolute top-full mt-2 left-1/2 -translate-x-1/2
    bg-white rounded-2xl border border-gray-300 shadow-md p-4
    w-[300px] sm:w-[400px]
    z-30
  "
          >
            <h3 className="text-base sm:text-lg md:text-xl font-bold mb-4">
              {userInformation.userName}님 회원 정보
            </h3>

            <div className="mb-2 flex flex-col gap-y-1 sm:gap-y-2">
              <p className="text-gray-500 text-sm sm:text-md">생년월일</p>
              <span className="text-black font-medium text-sm sm:text-base md:text-lg">
                {userInformation.userBirthday}
              </span>
            </div>

            <div className="mb-2 flex flex-col gap-y-1 sm:gap-y-2">
              <p className="text-gray-500 text-sm sm:text-md">아이디</p>
              <span className="text-black font-medium text-sm sm:text-base md:text-lg">
                {userInformation.userId}
              </span>
            </div>

            <div className="mb-4 flex flex-col gap-y-1 sm:gap-y-2">
              <p className="text-gray-500 text-sm sm:text-md">비밀번호</p>
              <div className="flex flex-row gap-x-2">
                {pwInputOpen ? (
                  <ChangePwBox onCLickClose={handleCancel} />
                ) : (
                  <button
                    onClick={() => setPwInputOpen(true)}
                    className="bg-blue-400 text-white text-xs sm:text-sm md:text-base px-3 py-1 rounded-lg font-semibold cursor-pointer"
                  >
                    변경
                  </button>
                )}
              </div>
            </div>

            <div className="mb-2 flex flex-col gap-y-1 sm:gap-y-2">
              <p className="text-gray-500 text-sm sm:text-md">성별</p>
              <span className="text-black font-medium text-sm sm:text-base md:text-lg">
                {userInformation.userGender === "male" ? "남자" : "여자"}
              </span>
            </div>

            <div className="mb-2 flex flex-col gap-y-1 sm:gap-y-2">
              <p className="text-gray-500 text-sm sm:text-md">가입시기</p>
              <span className="text-black font-medium text-sm sm:text-base md:text-lg">
                {new Date(userInformation.createAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <button
                onClick={onClose}
                className="w-full bg-blue-400 text-white py-2 rounded-lg font-semibold cursor-pointer text-sm sm:text-base"
              >
                닫기
              </button>
              <button
                onClick={handleClick}
                className="w-full bg-red-400 text-white py-2 rounded-lg font-semibold cursor-pointer text-sm sm:text-base"
              >
                탈퇴하기
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
