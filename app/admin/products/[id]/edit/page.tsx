import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";

async function getProductById(id: number) {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
}

const EditProductsPage = async ({ params }: { params: { id: string } }) => {
  const product = await getProductById(+params.id);
  if (!product) notFound();
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading>
          Editando Producto:{" "}
          <span className=" text-orange-400"> {product.name}</span>
        </Heading>
        <GoBackButton />
      </div>
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
};

export default EditProductsPage;
