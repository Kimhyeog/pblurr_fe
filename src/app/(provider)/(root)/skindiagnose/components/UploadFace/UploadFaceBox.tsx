"use client";

import {
  getSkinAnalysisResult,
  submitSkinAnalysis,
} from "@/api/skinDiagnose/skinAnalysis";
import { SkinAnalysisResult } from "@/types/types";
import SubmitLeftFace from "./SubmitLeftFace";
import SubmitRightFace from "./SubmitRightFace";
import SubmitFrontFace from "./SubmitFrontFace";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  setLoading: (isLoading: boolean) => void;
  setResult: (result: SkinAnalysisResult | null) => void;
  loading: boolean;
  onClose: () => void;
}

function UploadFaceBox(props: Props) {
  const { setLoading, setResult, loading, onClose } = props;

  const [step, setStep] = useState(0);

  const formRef = useRef<HTMLFormElement>(null); // ⬅️ form 참조

  const [leftFile, setLeftFile] = useState<File | null>(null);
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [rightFile, setRightFile] = useState<File | null>(null);

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  // 공통 handleSubmit 함수: form만 넘기면 됨
  const handleSubmit = async (form: HTMLFormElement) => {
    console.log("🚀 handleSubmit called");
    const formData = new FormData();
    formData.append("front", frontFile!);
    formData.append("left", leftFile!);
    formData.append("right", rightFile!);

    // 로그 찍기
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    setLoading(true);
    try {
      const id = await submitSkinAnalysis(formData);
      const data = await getSkinAnalysisResult(id);
      console.log("data", data);
      setResult(data);
    } catch (err) {
      console.error("분석 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  // <form>의 onSubmit에서는 이거 사용
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) {
      await handleSubmit(formRef.current);
    }
  };

  useEffect(() => {
    console.log("SubmitRightFace mounted");
  }, []);
  return (
    <div className="">
      <form
        ref={formRef} // ⬅️ 여기에 ref 추가!!
        onSubmit={handleFormSubmit}
        className="space-y-4 
        relative 
        "
        encType="multipart/form-data"
      >
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <SubmitLeftFace
                onNext={nextStep}
                onClose={onClose}
                onFileSelect={setLeftFile}
              />
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="front"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <SubmitFrontFace
                onNext={nextStep}
                onClose={onClose}
                onFileSelect={setFrontFile}
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="right"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <SubmitRightFace
                onNext={nextStep}
                onClose={onClose}
                onFileSelect={setRightFile}
                triggerSubmit={async () => {
                  if (formRef.current) {
                    await handleSubmit(formRef.current);
                    onClose(); // handleSubmit 끝난 후 모달 닫기
                  }
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}

export default UploadFaceBox;
