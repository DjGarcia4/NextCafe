"use client";
import LatestOrderItem from "@/components/order/LatestOrderItem";
import Heading from "@/components/ui/Heading";
import Logo from "@/components/ui/Logo";
import { outfit } from "@/fonts/OutfitFont";
import { OrderWithProducts } from "@/src/types";
import useSWR from "swr";

const OrdersPage = () => {
  const url = "/orders/api";

  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });
  if (data)
    return (
      <>
        <h1 className={`text-center mt-20 text-6xl ${outfit.className}`}>
          Ordenes Listas
        </h1>
        <Logo />
        {data.length ? (
          <div className=" grid grid-cols-1 gap-5 max-w-5xl mx-auto mt-10">
            {data.map((order) => (
              <LatestOrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <Heading>No hay ordenes listas aún</Heading>
        )}
      </>
    );
};

export default OrdersPage;
