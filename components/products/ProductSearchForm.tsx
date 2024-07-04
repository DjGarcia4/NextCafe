"use client";

import { SearchSchema } from "@/src/schema";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProductSearchForm = () => {
  const router = useRouter();
  const handleSearchForm = (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };
    const result = SearchSchema.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach((issue) => toast.error(issue.message));
      return;
    }
    router.push(`/admin/products/search?search=${result.data.search}`);
  };
  return (
    <form action={handleSearchForm} className=" flex items-center gap-3 ">
      <input
        type="text"
        name="search"
        placeholder="Buscar Producto"
        className=" p-2   rounded-lg shadow w-80"
      />
      <input
        type="submit"
        value="Buscar"
        className="border border-orange-400 text-orange-400 rounded-full hover:text-white p-2 hover:bg-orange-400 transition-colors cursor-pointer"
      />
    </form>
  );
};

export default ProductSearchForm;
