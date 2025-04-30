import ReactDOMServer from "react-dom/server";
import Swal from "sweetalert2";

interface SwalComponentProps {
  title: string;
  content: React.ReactNode;
  icon: "success" | "error" | "warning" | "info" | "question";
  isthen?: boolean;
  onConfirm?: () => void; // 추가: 확인 누를 때 실행할 콜백
}

const SwalComponent = ({
  title,
  content,
  icon,
  isthen,
  onConfirm,
}: SwalComponentProps) => {
  const htmlString = ReactDOMServer.renderToString(<>{content}</>);

  if (isthen) {
    Swal.fire({
      title,
      html: htmlString,
      icon,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("사용자가 확인 버튼을 눌렀습니다.");
        if (onConfirm) {
          onConfirm(); // prop으로 받은 콜백 실행
        }
      }
    });
  } else {
    Swal.fire({
      title,
      html: htmlString,
      icon,
    });
  }

  return null;
};

export default SwalComponent;
