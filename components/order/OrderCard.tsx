import { completeOrder } from "@/actions/complete-order-action";
import { OrderWithProducts } from "@/src/types";
import { formatCurrency, getImagePath } from "@/src/utils";
import Image from "next/image";

type OrderCardProps = {
  order: OrderWithProducts;
};

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-5 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4 shadow"
    >
      <p className="text-xl font-medium text-slate-700">
        Cliente: {order.name}
      </p>
      <p className=" font-medium text-slate-700 text-xl">
        Productos Ordenados:
      </p>
      <dl className="space-y-2">
        {order.orderProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-2 border-t border-gray-200 p-4"
          >
            <Image
              src={getImagePath(product.product.image)}
              alt="Imagen Producto"
              width={70}
              height={170}
              quality={100}
              className=" rounded-lg"
            />
            <dt className="text-xl  text-slate-700">
              <span>{product.quantity}</span>
            </dt>
            <dd className="text-xl  text-slate-700">{product.product.name}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt className=" font-medium text-slate-700 text-xl">
            Total a Pagar:
          </dt>
          <dd className=" font-medium text-orange-400 text-xl">
            {formatCurrency(order.total)}
          </dd>
        </div>
      </dl>

      <form action={completeOrder}>
        <input type="hidden" value={order.id} name="order_id" />
        <input
          type="submit"
          className="border border-orange-400 text-orange-400 rounded-full hover:text-white p-2 hover:bg-orange-400 transition-colors w-full cursor-pointer text-1xl"
          value={"Marcar Completada"}
        />
      </form>
    </section>
  );
}
