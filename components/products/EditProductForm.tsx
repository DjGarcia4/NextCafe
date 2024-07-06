"use client";

import { createProduct } from "@/actions/create-product-action";
import { updateProduct } from "@/actions/update-product-action";
import { ProductSchema } from "@/src/schema";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const EditProductForm = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const params = useParams();
  const id = +params.id!;
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

    const response = await updateProduct(id, result.data);
    if (response?.errors) {
      response.errors.forEach((issue) => toast.error(issue.message));
    }
    toast.success("Producto Actualizado correctamente!");
    router.push("/admin/products");
  };
  return (
    <div className=" bg-white mt-10 px-5 py-10 rounded-lg shadow max-w-3xl mx-auto">
      <form action={handleSubmit}>
        {children}
        <input
          type="submit"
          value={"Guardar Cambios"}
          className="border border-orange-400 rounded-full text-white py-2 px-4 bg-orange-400 hover:bg-orange-500 transition-colors w-full cursor-pointer mt-5"
        />
      </form>
    </div>
  );
};

export default EditProductForm;
