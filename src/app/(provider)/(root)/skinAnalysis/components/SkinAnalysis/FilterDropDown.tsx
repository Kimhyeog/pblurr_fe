// components/molecules/FilterDropdown.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  options: string[];
  onSelect: (selected: string) => void;
}

/**
 * FilterDropdown 컴포넌트
 *
 * 특정 조건에 따라 리스트를 필터링할 수 있도록 하는 드롭다운 컴포넌트입니다.
 * 버튼을 클릭하면 옵션 목록이 표시되며, 선택한 옵션은 상위 컴포넌트에 전달됩니다.
 *
 * 사용 예: 견적서 상태(전체, 확정 견적 등)를 필터링할 때 활용됩니다.
 *
 * @param {string[]} options - 드롭다운에 표시할 옵션 목록 (예: ['전체', '확정 견적서'])
 * @param {(selected: string) => void} onSelect - 사용자가 옵션을 선택했을 때 실행할 콜백 함수
 *
 * @example
 * <FilterDropdown
 *   options={['전체', '확정 견적서']}
 *   onSelect={(selected) => console.log('선택된 옵션:', selected)}
 * />
 */

const FilterDropdown = ({ options, onSelect }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left text-[14px] lg:text-[18px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-[127px] lg:w-[190px] 
      h-[36px] lg:h-[64px] 
      px-[10px] lg:px-6
      py-[6px] lg:py-4 text-[#1890FF] 
      bg-[#F5FAFF] 
      border border-[#1B92FF] rounded-lg lg:rounded-2xl shadow-sm"
      >
        {selected}
        <ChevronDown className="w-4 h-4 text-[#1890FF]" />
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-[328px] rounded-4 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="block w-full text-left px-6 py-4 hover:bg-gray-100"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
