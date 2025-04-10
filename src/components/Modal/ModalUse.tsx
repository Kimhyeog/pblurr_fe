"use client";

import { JSX, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Swal, { SweetAlertOptions } from "sweetalert2";

interface ModalProps {
  children: (closeModal: () => void) => ReactNode;
  buttonText: string;
}

export default function ModalUse({
  children,
  buttonText,
}: ModalProps): JSX.Element {
  const onClickOpenModal = async (): Promise<void> => {
    const closeModal = () => Swal.close(); // 모달 닫기 함수

    const options: SweetAlertOptions = {
      html: `<div id='modal-root'></div>`,
      width: "50vw", // width는 여기
      showCancelButton: false,
      showConfirmButton: false,
      didOpen: (): void => {
        const modalRoot = document.getElementById("modal-root");

        if (modalRoot) {
          ReactDOM.createRoot(modalRoot).render(
            <div className="relative">
              <button
                className="cursor-pointer absolute top-[10px] right-[10px] text-3xl"
                onClick={closeModal} // 모달을 닫는 함수
              >
                ×
              </button>
              {children(closeModal)}
            </div>
          );
        }
      },
      customClass: {
        container: "flex flex-row",
        popup: "!rounded-3xl !w-[45%]", // 모달 창 테두리를 더 크게 둥글게
      },
    };

    await Swal.fire(options);
  };

  return (
    <div className="w-full">
      <button
        className="w-full text-2xl font-bold bg-blue-500 rounded-2xl px-2 py-3 text-white cursor-pointer focus:bg-blue-600 transition"
        onClick={onClickOpenModal}
      >
        {buttonText}
      </button>
    </div>
  );
}
