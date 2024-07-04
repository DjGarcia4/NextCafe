"use client";

import { createProduct } from "@/actions/create-product-action";
import { ProductSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddProductForm = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      description: formData.get("description"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };
    const result = ProductSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => toast.error(issue.message));
      return;
    }
    const response = await createProduct(result.data);
    if (response?.errors) {
      response.errors.forEach((issue) => toast.error(issue.message));
    }
    toast.success("Producto registrado correctamente!");
    router.push("/admin/products");
  };
  return (
    <div className=" bg-white mt-10 px-5 py-10 rounded-lg shadow max-w-3xl mx-auto">
      <form action={handleSubmit}>
        {children}
        <input
          type="submit"
          value={"Registrar Producto"}
          className="border border-orange-400 rounded-full text-white py-2 px-4 bg-orange-400 hover:bg-orange-500 transition-colors w-full cursor-pointer mt-5"
        />
      </form>
    </div>
  );
};

export default AddProductForm;
