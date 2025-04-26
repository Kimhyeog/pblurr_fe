import Image from "next/image";

interface Props {
  imageUrls: string[];
  skinAge: number;
}

function SkinResultAge(props: Props) {
  const { skinAge, imageUrls } = props;

  const imagesAlt = ["좌 30도", "정면", "우 30도"];

  return (
    <div>
      <div className="w-full bg-white rounded-xl shadow-md p-6 space-y-6">
        {/* 이미지 + 설명 텍스트, 모바일에서는 숨김 */}
        <div className="items-center gap-4 sm:flex">
          {imageUrls.map((url, idx) => (
            <div
              key={idx}
              className="w-[250px] h-[270px] overflow-hidden rounded-lg shadow-md mx-auto text-center"
            >
              <Image
                width={300}
                height={450}
                src={url}
                alt={imagesAlt[idx] || `분석 이미지 ${idx}`}
                className="rounded-lg shadow-md object-cover w-full h-full"
              />
              <p className="text-sm text-gray-600 mt-2">{imagesAlt[idx]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkinResultAge;
