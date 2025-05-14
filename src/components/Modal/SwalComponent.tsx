import ReactDOMServer from "react-dom/server";
import Swal from "sweetalert2";

interface SwalComponentProps {
  title: string;
  content: React.ReactNode;
  icon: "success" | "error" | "warning" | "info" | "question";
  isthen?: boolean;
  onConfirm?: () => void;
  showCancelButton?: boolean;
  onCancel?: () => void;

  // ✅ 추가된 커스텀 버튼 텍스트 옵션
  confirmButtonText?: string;
  cancelButtonText?: string;
}

/**
 * React 컴포넌트를 SweetAlert2로 띄우는 커스텀 컴포넌트입니다.
 */
const SwalComponent = ({
  title,
  content,
  icon,
  isthen,
  onConfirm,
  showCancelButton = false,
  onCancel,
  confirmButtonText = "확인", // ✅ 기본값 설정
  cancelButtonText = "취소", // ✅ 기본값 설정
}: SwalComponentProps) => {
  const htmlString = ReactDOMServer.renderToString(<>{content}</>);

  const options = {
    title,
    html: htmlString,
    icon,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
  };

  if (isthen) {
    Swal.fire(options).then((result) => {
      if (result.isConfirmed) {
        if (onConfirm) onConfirm();
      } else if (
        result.isDismissed &&
        result.dismiss === Swal.DismissReason.cancel
      ) {
        if (onCancel) onCancel();
      }
    });
  } else {
    Swal.fire(options);
  }

  return null;
};

export default SwalComponent;
