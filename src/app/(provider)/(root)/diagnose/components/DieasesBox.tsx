import { data } from "@/data/disease";
import Image from "next/image";

function DieasesBox() {
  return (
    <div className="bg-white flex flex-col items-center p-8 gap-6 rounded-2xl">
      <div className="text-md sm:text-2xl lg:text-2xl font-bold px-3 py-1 text-left w-full">
        {`'`}피부르르{`'`}가 제공하는 피부질환 목록
      </div>
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-row items-center bg-gray-100 rounded-2xl p-6 w-full max-w-3xl shadow-md"
        >
          <Image
            src={item.imgSrc}
            alt={item.title}
            width={150}
            height={150}
            className="w-32 h-32 object-cover rounded-xl mr-6"
          />
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-700">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DieasesBox;
