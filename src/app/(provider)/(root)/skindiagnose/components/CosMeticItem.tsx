import { ProductItem } from "@/types/types"; // 개별 제품 타입
import Image from "next/image";
import Link from "next/link";

interface CosMeticItemProps {
  product: ProductItem;
}

function CosMeticItem({ product }: CosMeticItemProps) {
  return (
    <Link
      className="flex flex-col p-3 border-2 rounded-2xl"
      href={product.productLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{ marginBottom: "20px" }}
    >
      <Image
        src={product.productImage}
        alt={product.product}
        width={100}
        height={100}
      />
      <p>브랜드: {product.brand}</p>
      <p>제품명: {product.product}</p>
      <p>가격: {product.productPrice.toLocaleString()} 원</p>
    </Link>
  );
}

export default CosMeticItem;
