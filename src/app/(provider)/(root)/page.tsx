import Image from "next/image";
import MainDiagnose from "./components/MainDiagnose";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <MainDiagnose />
    </div>
  );
}
