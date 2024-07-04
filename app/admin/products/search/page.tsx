import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";

async function searchProducts(searchTerm: string) {
  return await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });
}

const page = async ({ searchParams }: { searchParams: { search: string } }) => {
  const products = await searchProducts(searchParams.search);
  console.log(products);

  return (
    <>
      <Heading>
        Resultados de Búsqueda:{" "}
        <span className=" text-orange-400">{searchParams.search}</span>
      </Heading>
      <div className="flex justify-between items-center gap-5">
        <div className="flex items-center w-full gap-7">
          <div>
            <Link
              href={`/admin/products/new`}
              className="border border-orange-400 rounded-full text-white py-2 px-4 bg-orange-400 hover:bg-orange-500 transition-colors w-full cursor-pointer"
            >
              Crear Producto
            </Link>
          </div>
          <div className="w-[65%] justify-center">
            <ProductSearchForm />
          </div>
        </div>
      </div>
      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className=" text-gray-400 text-center mt-10">
          No se encontraron resultados 😅
        </p>
      )}
    </>
  );
};

export default page;
