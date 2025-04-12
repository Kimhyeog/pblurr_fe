import MainDiagnose from "./components/MainDiagnose";
import MainSkinDiagnose from "./components/MainSkinDiagnose";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <MainDiagnose />
      <MainSkinDiagnose />
    </div>
  );
}
