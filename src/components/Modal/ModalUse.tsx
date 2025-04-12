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
    const container = document.createElement("div"); // div 따로 만듦
    container.id = "modal-container";

    const options: SweetAlertOptions = {
      html: container, // html: `<div>...</div>`로 string 만드는 게 아니라 아예 DOM element를 넘긴다
      width: "40%",
      showCancelButton: false,
      showConfirmButton: false,
      willOpen: () => {
        // willOpen에서 직접 React 렌더링
        ReactDOM.createRoot(container).render(
          <div className="relative">{children(() => Swal.close())}</div>
        );
      },
      customClass: {
        popup:
          "!rounded-3xl !p-5 !overflow-visible !border-10 !border-[#bfdbfe]", // padding 없애고 overflow visible 줘야 꼬이지 않아
      },
      backdrop: true,
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
