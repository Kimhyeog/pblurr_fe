import { ProductItem } from "@/types/types"; // 개별 제품 타입
import Image from "next/image";
import Link from "next/link";

interface CosMeticItemProps {
  product: ProductItem;
  isCenter: boolean;
}

function CosMeticItem({ product, isCenter }: CosMeticItemProps) {
  return (
    <div
      className={`flex flex-col gap-y-1 items-center p-3 border-2 border-[#7FC5E0] bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 ease-in-out 
      w-[200px]  sm:w-full ${isCenter ? "shadow-2xl" : ""}`}
      rel="noopener noreferrer"
      style={{ marginBottom: "20px" }}
    >
      <Image
        src={product.productImage}
        alt={product.product}
        width={100}
        height={100}
        className="rounded mb-2"
      />
      <p className="text-sm text-gray-800">{product.brand}</p>
      {isCenter && (
        <p className="text-sm text-center text-gray-800 font-semibold">
          {product.product}
        </p>
      )}
      <p className="text-sm text-gray-800">
        ￦ {product.productPrice.toLocaleString()} 원
      </p>
      {isCenter && (
        <div className="w-full flex items-center justify-center">
          <Link
            target="_blank"
            href={product.productLink}
            className="px-3 py-1 border-2 text-sm text-[#FFFFFF] bg-[#7FC5E0] rounded-2xl hover:bg-blue-500 transition"
          >
            구매 링크
          </Link>
        </div>
      )}
    </div>
  );
}

export default CosMeticItem;
