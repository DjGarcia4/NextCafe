"use client";

import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { useMemo } from "react";
import { formatCurrency } from "@/src/utils";
import { createOrder } from "@/actions/create-order-action";
import { OrderSchema } from "@/src/schema";
import toast from "react-hot-toast";

const OrderSummary = () => {
  const { order } = useStore();
  const total = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order]
  );

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total,
      order,
    };
    const result = OrderSchema.safeParse(data);
    console.log(result);
    if (!result.success) {
      result.error.issues.forEach((issue) => toast.error(issue.message));
      return;
    }

    const response = await createOrder(data);
    if (response?.errors) {
      response.errors.forEach((issue) => toast.error(issue.message));
    }
  };
  return (
    <aside className=" lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5 bg-white shadow relative">
      <h1 className=" text-4xl text-center text-slate-700">Mi Pedido</h1>
      {order.length === 0 ? (
        <p className=" text-center text-gray-400 mt-10">
          El carrito esta vacio
        </p>
      ) : (
        <>
          <div className="mt-5 max-h-[65%] overflow-y-scroll">
            {order.map((item) => (
              <ProductDetails key={item.id} item={item} />
            ))}
          </div>
          <div className="absolute bottom-5">
            <div className="flex justify-between mt-5 text-3xl">
              <p className=" text-slate-700">Total</p>
              <p className=" text-orange-400">{formatCurrency(total)}</p>
            </div>
            <form className=" space-y-4 mt-5" action={handleCreateOrder}>
              <input
                type="text"
                placeholder="Tu Nombre"
                className="w-full border border-gray-300 rounded-lg p-3"
                name="name"
              />
              <input
                type="submit"
                className=" border border-orange-400 text-orange-400 rounded-full hover:text-white p-2 hover:bg-orange-400 transition-colors w-full cursor-pointer"
                value={"Confirmar Pedido"}
              />
            </form>
          </div>
        </>
      )}
    </aside>
  );
};

export default OrderSummary;
