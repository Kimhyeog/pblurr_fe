import CosMeticSession from "./components/CosMeticSession";

export default function Page() {
  const scores = {
    wrinkleScore: 3,
    pigmentationScore: 5,
    poreScore: 7,
  };

  return (
    <div className="mx-auto w-full max-w-[900px] min-h-screen flex flex-col mt-5 gap-y-3 px-4">
      <div className="rounded-2xl flex flex-col items-center px-3 py-5 border-0 bg-white">
        <div className="text-xl sm:text-2xl lg:text-3xl font-bold pl-4 py-1 text-left w-full">
          피부 미용 분석 페이지
        </div>
        {/* <CosMeticSession {...scores} /> */}
      </div>
    </div>
  );
}
