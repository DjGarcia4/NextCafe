import Heading from "@/components/ui/Heading";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className=" text-center">
      <Heading>Producto no encontrado 🥲</Heading>
      <Link href={"/admin/products"} className=" text-orange-400 text-xl">
        Ir a Productos
      </Link>
    </div>
  );
};

export default NotFound;
