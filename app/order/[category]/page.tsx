import ProductCard from "@/components/products/ProductCard";
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
      <h1 className=" text-slate-700 text-2xl mt-8 mb-5">
        Elige y personaliza tu pedido a continuación
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default OrderPage;
