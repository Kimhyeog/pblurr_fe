import Image from "next/image";

interface Props {
  imageUrls: string[];
}

function SkinResultAge(props: Props) {
  const { imageUrls } = props;

  const imagesAlt = ["좌 30도", "정면", "우 30도"];

  return (
    <div className="w-full">
      <div className="w-full bg-white rounded-xl shadow-md p-6 space-y-6">
        {/* 이미지 + 설명 텍스트, 모바일에서는 숨김 */}
        <div className="flex flex-row gap-x-3 sm:flex-row justify-between">
          {imageUrls.map((url, idx) => (
            <div key={idx} className="text-center flex-1">
              <div className="overflow-hidden rounded-lg shadow-md mx-auto">
                <Image
                  width={300}
                  height={450}
                  src={url}
                  alt={imagesAlt[idx] || `분석 이미지 ${idx}`}
                  className="rounded-lg shadow-md object-cover w-full h-full"
                />
              </div>
              <p className="min-w-[50px] inline-block rounded-2xl bg-[#5CA7C8] px-2 py-1 text-sm text-white mt-4">
                {imagesAlt[idx]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkinResultAge;
