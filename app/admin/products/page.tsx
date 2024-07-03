import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getProducts() {
  return await prisma.product.findMany();
}

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <>
      <Heading>Administrar Productos</Heading>
      <ProductTable products={products} />
    </>
  );
};

export default ProductsPage;
