import React from "react";
import clsx from "clsx";

interface ButtonProps {
  className?: string;
  onClick: () => void;
  children: React.ReactNode;
}

function CMButton({ className = "", onClick, children }: ButtonProps) {
  const buttonClass = clsx(
    "bg-pink-400 text-white text-sm sm:text-md px-2 py-1 sm:px-3 sm:py-2 rounded-lg cursor-pointer",
    "focus:bg-pink-600 hover:bg-pink-500",
    "w-full sm:w-auto", // 모바일에서는 전체 너비, 작은 화면 이상에서는 내용에 따라 자동 너비
    "transition-all duration-300 ease-in-out",
    className
  );

  return (
    <div>
      <button className={buttonClass} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default CMButton;
