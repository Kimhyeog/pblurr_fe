"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* sm일때, 아래에서 위 적용 */}
          <div
            onClick={onClose}
            className="fixed inset-0 z-40
            bg-gray-300/30 backdrop-blur-[1px]
            transition-all duration-300"
          />

          {/* sm이 아닐때, 일반적인 모달 */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="
    fixed z-50 bg-white p-6
    w-full bottom-0 left-0
    sm:w-[400px] sm:top-1/2 sm:left-1/2 sm:bottom-auto
    sm:translate-x-[-50%] sm:translate-y-[-50%]
    sm:rounded-2xl sm:shadow-xl
    rounded-t-3xl
  "
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveModal;
