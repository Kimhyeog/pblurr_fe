import { ProductRecommendation } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

interface CosMeticItemProps {
  recommendation: ProductRecommendation;
}

function CosMeticCategorieBox({ recommendation }: CosMeticItemProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex">
        <h2>{recommendation.category}</h2>
        &nbsp;
        <p>점수: {recommendation.score}</p>
      </div>
      <div className="flex items-center">
        {recommendation.products.map((product, idx) => (
          <Link
            className="flex flex-col p-3 border-2 rounded-2xl"
            href={product.productLink}
            target="_blank"
            rel="noopener noreferrer"
            key={idx}
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
            <p>가격: {product.productPrice} 원</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CosMeticCategorieBox;
