import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productCount() {
  return prisma.product.count();
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;
  return await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true,
    },
  });
}

export type ProductWithCategory = Awaited<ReturnType<typeof getProducts>>;

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const page = +searchParams.page || 1;
  const pageSize = 10;
  if (page < 0) redirect(`/admin/products`);
  const productsData = getProducts(page, pageSize);
  const totalProductsData = productCount();
  const [products, totalProducts] = await Promise.all([
    productsData,
    totalProductsData,
  ]);
  const totalPages = Math.ceil(totalProducts / pageSize);
  if (page > totalPages) redirect(`/admin/products`);

  return (
    <>
      <Heading>Administrar Productos</Heading>
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
        <ProductsPagination page={page} totalPages={totalPages} />
      </div>
      <ProductTable products={products} />
    </>
  );
};

export default ProductsPage;
