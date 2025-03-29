import React from "react";

interface InputProps {
  type: string;
  placeholder?: string; // 다른 type Input일 수 있으므로, optional로
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // 추가
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  className,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur} // 추가
      className={`text-[#A3A7AF] bg-[#F1F3F6] w-full p-2 border-none rounded mb-0 px-3 focus:outline-none ${className}`}
    />
  );
};

export default Input;
