import { formatCurrency } from "@/src/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg p-3 flex gap-4 h-full shadow">
      <div className="flex flex-col justify-center">
        <Image
          src={`/products/${product.image}.jpg`}
          alt="Imagen Producto"
          width={250}
          height={350}
          quality={100}
          className=" rounded-lg"
        />
        {/* <div className="flex justify-around mt-5 text-xl text-slate-700">
          <button className="hover:bg-orange-400 transition-colors hover:text-white rounded-full px-2 ">
            -
          </button>
          <p>1</p>
          <button className="hover:bg-orange-400 transition-colors hover:text-white rounded-full px-2">
            +
          </button>
        </div> */}
      </div>
      <div className="flex flex-col justify-between w-full">
        <div>
          <h1 className="text-xl text-slate-700">{product.name}</h1>
          <p className=" text-gray-400">{product.description}</p>
          <p className="text-2xl text-orange-400 ">
            {formatCurrency(product.price)}
          </p>
        </div>
        <div className="w-full flex justify-center">
          <AddProductButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
