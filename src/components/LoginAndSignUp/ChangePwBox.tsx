"use client";

import { useEffect, useState } from "react";
import Input from "./Input";
import { checkPassword, updatePassword } from "@/api/auth/index"; // 위에서 만든 메소드 import

type Props = {
  onCLickClose: () => void;
};

export default function ChangePwBox(props: Props) {
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newCheckPassword, setNewCheckPassword] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");
  const [newPasswordMatch, setnewPasswordMatch] = useState<boolean | null>(
    null
  );
  const [newPwMessage, setNewPwMessage] = useState<string>("");

  console.log(passwordMatch);

  const handleCheckPassword = async () => {
    const isMatch = await checkPassword(currentPassword);
    setPasswordMatch(isMatch);
    setMessage(
      isMatch ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다."
    );
  };

  //새 비밀번호 확인 검사 함수
  const onNewPWCheck = () => {
    if (newPassword !== newCheckPassword) {
      setnewPasswordMatch(false);
      setNewPwMessage("비밀번호가 일치하지 않습니다.");
      setNewCheckPassword("");
      return;
    }
    setnewPasswordMatch(true);
    setNewPwMessage("비밀번호가 일치합니다.");
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
    alert("비밀번호가 성공적으로 변경되었습니다.");
    setPasswordMatch(null);
    props.onCLickClose();
  };

  useEffect(() => {}, [message]);

  useEffect(() => {}, [newPwMessage]);

  return (
    <div className="w-full flex flex-col bg-[#eae8edeb] items-center justify-center rounded-2xl gap-y-3 p-3 py-7">
      <h3 className="text-[#7FC5E0] text-2xl font-bold">비밀번호 변경</h3>
      <div className="w-full flex flex-col gap-y-2">
        <p className="ml-1">현재 비밀번호</p>
        <Input
          type="password"
          placeholder="비밀번호"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          onBlur={handleCheckPassword}
          className="border-none"
        />
        {passwordMatch !== null && (
          <div className="w-full flex justify-center">
            <p
              className={`text-sm ${
                passwordMatch ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          </div>
        )}
      </div>
      {passwordMatch && (
        <div className="w-full flex flex-col gap-y-2">
          <p>새 비밀번호</p>
          <Input
            type="password"
            placeholder="비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border-none"
          />
          <p>새 비밀번호 확인</p>
          <Input
            type="password"
            placeholder="비밀번호"
            value={newCheckPassword}
            onChange={(e) => setNewCheckPassword(e.target.value)}
            className="border-none"
            onBlur={onNewPWCheck}
          />
          {newPasswordMatch !== null && (
            <div className="w-full flex justify-center">
              <p
                className={`text-sm ${
                  newPasswordMatch ? "text-green-500" : "text-red-500"
                }`}
              >
                {newPwMessage}
              </p>
            </div>
          )}
        </div>
      )}
      {/* <div className="w-full flex flex-col gap-y-2">
        <p>새 비밀번호</p>
        <Input
          type="password"
          placeholder="비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border-none"
        />
      </div> */}
      <div className="flex flex-row gap-x-3 pt-3">
        <button
          className="bg-white text-black text-[15px] px-3 py-0.5 rounded-lg font-semibold cursor-pointer"
          onClick={() => {
            props.onCLickClose();
          }}
        >
          취소
        </button>
        {newPasswordMatch && (
          <button
            onClick={handleUpdatePassword}
            className="bg-blue-400 text-white text-[15px] px-3 py-2 rounded-lg font-semibold cursor-pointer"
          >
            변경
          </button>
        )}
      </div>
    </div>
  );
}
