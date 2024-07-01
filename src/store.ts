import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

type Store = {
  order: OrderItem[];
  addToCard: (product: Product) => void;
  increaseQuantity: (productId: Product["id"]) => void;
  decreaseQuantity: (productId: Product["id"]) => void;
  deleteItem: (productId: Product["id"]) => void;
};

export const useStore = create<Store>((set, get) => ({
  order: [],
  addToCard: (product) => {
    const { categoryId, description, ...data } = product;
    let order: OrderItem[] = [];
    if (get().order.find((item) => item.id === data.id)) {
      order = get().order.map((item) =>
        item.id === data.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      );
    } else {
      order = [
        ...get().order,
        { ...data, quantity: 1, subtotal: 1 * product.price },
      ];
    }
    set((state) => ({
      order,
    }));
  },
  increaseQuantity: (productId) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item
      ),
    }));
  },
  decreaseQuantity: (productId) => {
    set((state) => ({
      order: state.order.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity - 1,
              subtotal: item.price * (item.quantity - 1),
            }
          : item
      ),
    }));
  },
  deleteItem: (productId) => {
    set((state) => ({
      order: state.order.filter((item) => item.id !== productId),
    }));
  },
}));
