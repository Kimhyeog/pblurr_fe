"use client";

import { useState } from "react";
import Input from "./Input";
import { checkPassword, updatePassword } from "@/api/auth/index"; // 위에서 만든 메소드 import

type Props = {
  setPwInputOpen: (bool: boolean) => void;
};

export default function ChangePwBox(props: Props) {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleCancel = () => {
    props.setPwInputOpen(false); // 부모 컴포넌트의 상태를 false로 변경
  };
  const handleCheckPassword = async () => {
    const isMatch = await checkPassword(currentPassword);
    setPasswordMatch(isMatch);
    setMessage(
      isMatch ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다."
    );
  };

  // 비밀번호 변경 함수
  const handleUpdatePassword = async () => {
    if (passwordMatch === false) {
      setMessage(
        "현재 비밀번호가 일치하지 않으므로 비밀번호를 변경할 수 없습니다."
      );
      return;
    }

    const success = await updatePassword(currentPassword, newPassword);
    setMessage(
      success
        ? "비밀번호가 성공적으로 변경되었습니다."
        : "비밀번호 변경에 실패했습니다."
    );
  };

  return (
    <div>
      <h3>비밀번호 변경</h3>
      <p>현재 비밀번호</p>
      <Input
        type="password"
        placeholder="비밀번호"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        onBlur={handleCheckPassword}
        className="border-none"
      />
      <p>새 비밀번호</p>
      <Input
        type="password"
        placeholder="비밀번호"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="border-none"
      />
      <div>
        <button onClick={handleCancel}>취소</button>
        <button onClick={handleUpdatePassword}>변경</button>
      </div>
    </div>
  );
}
