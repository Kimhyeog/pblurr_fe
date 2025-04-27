import ReactDOMServer from "react-dom/server";
import Swal from "sweetalert2";

interface SwalComponentProps {
  title: string;
  content: React.ReactNode;
  icon: "success" | "error" | "warning" | "info" | "question";
}

const SwalComponent = ({ title, content, icon }: SwalComponentProps) => {
  const htmlString = ReactDOMServer.renderToString(<>{content}</>);

  Swal.fire({
    title,
    html: htmlString,
    icon,
  });

  return null; // 이 컴포넌트는 실제 화면에 렌더링할 게 없음
};

export default SwalComponent;
