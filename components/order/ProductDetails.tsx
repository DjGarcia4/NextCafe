import { OrderItem } from "@/src/types";
import { formatCurrency, getImagePath } from "@/src/utils";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useStore } from "@/src/store";
import { useMemo } from "react";

type ProductDetailsProps = {
  item: OrderItem;
};

const ProductDetails = ({ item }: ProductDetailsProps) => {
  const imagePath = getImagePath(item.image);
  const { increaseQuantity, decreaseQuantity, deleteItem } = useStore();
  const MIN_ITEM = 1;
  const MAX_ITEM = 5;

  const disableDecreaseButton = useMemo(
    () => item.quantity === MIN_ITEM,
    [item]
  );
  const disableIncreaseButton = useMemo(
    () => item.quantity === MAX_ITEM,
    [item]
  );

  return (
    <div className="bg-white  p-3 flex gap-4 h-full border-b border-gray-300 relative">
      <button
        onClick={() => deleteItem(item.id)}
        type="button"
        className=" absolute right-0 top-4 hover:bg-red-400 transition-all hover:text-white rounded-full px-2 py-1 text-gray-500"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <div className="flex flex-col justify-center">
        <Image
          src={imagePath}
          alt="Imagen Itemo"
          width={80}
          height={180}
          quality={100}
          className=" rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-between w-full">
        <div className=" flex flex-col justify-around h-full">
          <h1 className="text-xl text-slate-700">{item.name}</h1>
          <div className="flex items-center justify-between w-full">
            <p className="text-2xl text-orange-400 ">
              {formatCurrency(item.subtotal)}
            </p>
            <div className="flex justify-around text-xl text-slate-700 w-full">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="hover:bg-orange-400 transition-colors hover:text-white rounded-full px-2 disabled:opacity-10  "
                disabled={disableDecreaseButton}
              >
                -
              </button>
              <p>{item.quantity}</p>
              <button
                disabled={disableIncreaseButton}
                onClick={() => increaseQuantity(item.id)}
                className="hover:bg-orange-400 transition-colors hover:text-white rounded-full px-2 disabled:opacity-10 "
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
