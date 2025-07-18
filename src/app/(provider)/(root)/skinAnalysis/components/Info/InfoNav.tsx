"use client";

import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import DiagnoseMethodInfo from "./DiagnoseMethodInfo";
import DiagnoseResultInfo from "./DiagnoseResultInfo";

const tabItems = [
  { label: "분석 방법", value: 0 },
  { label: "분석 결과", value: 1 },
];

function InfoNav() {
  const [diagnoseInfoValue, setDiagnoseInfoValue] = useState(0);

  const onClickDiagnoseInfoToggle = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const selectedValue = Number(e.currentTarget.value);
    setDiagnoseInfoValue(selectedValue);
  };

  const renderDiagnoseInfoComponent = () => {
    switch (diagnoseInfoValue) {
      case 0:
        return <DiagnoseMethodInfo />;
      case 1:
        return <DiagnoseResultInfo />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full  md:w-auto  p-4 border-4 border-[#5CA7C8] rounded-2xl shadow-xl bg-white">
      <LayoutGroup>
        <nav className="inline-flex space-x-2 bg-[#f0f9fc] p-2 rounded-full relative">
          {tabItems.map((tab) => (
            <button
              key={tab.value}
              value={tab.value}
              onClick={onClickDiagnoseInfoToggle}
              className={`text-md sm:text-lg relative z-10 px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                diagnoseInfoValue === tab.value
                  ? "text-[#5CA7C8] font-extrabold"
                  : "text-blue-100 hover:text-[#5CA7C8]"
              }`}
            >
              {diagnoseInfoValue === tab.value && (
                <motion.div
                  layoutId="pill"
                  className="absolute inset-0 bg-[#5CA7C8]/20 rounded-full z-[-1]"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              {tab.label}
            </button>
          ))}
        </nav>
      </LayoutGroup>

      <div className="mt-6">{renderDiagnoseInfoComponent()}</div>
    </div>
  );
}

export default InfoNav;
