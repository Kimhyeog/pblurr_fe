//ModalUse.tsx
"use client";

import { JSX, ReactNode } from "react";
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
    const container = document.createElement("div");
    container.id = "modal-container";

    // 화면 크기에 따라 모달 width 조절
    const screenWidth = window.innerWidth;
    let modalWidth = "1000px"; // 기본 데스크탑

    if (screenWidth <= 480) {
      modalWidth = "100%"; // 모바일
    } else if (screenWidth <= 768) {
      modalWidth = "700px"; // 태블릿
    }

    const options: SweetAlertOptions = {
      html: container,
      width: modalWidth,
      showCancelButton: false,
      showConfirmButton: false,
      willOpen: () => {
        ReactDOM.createRoot(container).render(
          <div className="w-full mx-auto">{children(() => Swal.close())}</div>
        );
      },
      customClass: {
        popup:
          "!rounded-3xl !p-5 !overflow-visible !border-10 !border-[#bfdbfe] w-full",
      },
      backdrop: true,
    };

    await Swal.fire(options);
  };

  return (
    <div className="w-full">
      <button
        className="w-full text-2xl font-bold my-7 bg-blue-500 rounded-2xl px-2 py-3 text-white cursor-pointer focus:bg-blue-600 transition"
        onClick={onClickOpenModal}
      >
        {buttonText}
      </button>
    </div>
  );
}
