"use client";

import { useStore } from "@/src/store";
import { Product } from "@prisma/client";
import React from "react";

type AddProductButtonProps = {
  product: Product;
};

const AddProductButton = ({ product }: AddProductButtonProps) => {
  const { addToCard } = useStore();
  return (
    <button
      className=" border border-orange-400 text-orange-400 rounded-full hover:text-white p-2 hover:bg-orange-400 transition-colors w-56"
      onClick={() => {
        addToCard(product);
      }}
    >
      Agregar
    </button>
  );
};

export default AddProductButton;
