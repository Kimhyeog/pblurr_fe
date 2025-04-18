import CosMeticSession from "./components/CosMeticSession";
import SkinAnalysis from "./components/SkinAnalysis";

export default function Page() {
  const scores = {
    wrinkleScore: 3,
    pigmentationScore: 5,
    poreScore: 7,
  };

  return (
    <div className="max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto min-h-screen mt-5 gap-y-3 ">
      <div className="rounded-2xl flex flex-col items-center px-3 py-5 border-0 bg-white">
        <div
          className="
        text-center sm:text-left
        text-xl sm:text-2xl lg:text-3xl font-bold pl-4 py-1 w-full"
        >
          피부 타입 및 피부질환 분석 결과
        </div>
        <SkinAnalysis />
        {/* <CosMeticSession {...scores} /> */}
      </div>
    </div>
  );
}
