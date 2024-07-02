import ProductCard from "@/components/products/ProductCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getProducts(category: string) {
  return await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });
}

const OrderPage = async ({ params }: { params: { category: string } }) => {
  const products = await getProducts(params.category);
  console.log(products);

  return (
    <>
      <Heading>Elige y personaliza tu pedido a continuación</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default OrderPage;
