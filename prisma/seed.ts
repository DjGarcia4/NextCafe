import { products } from "./data/products";
import { categories } from "./data/categories";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Eliminar todos los productos y categorías
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});

    // Reiniciar el auto-incremento en MySQL
    // await prisma.$executeRaw`TRUNCATE TABLE Product`;
    // await prisma.$executeRaw`TRUNCATE TABLE Category`;

    // Reiniciar el auto-incremento en PostgreSQL
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;

    // Reiniciar el auto-incremento en SQLite
    // await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Product'`;
    // await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Category'`;

    // Agregar las categorías y productos
    await prisma.category.createMany({ data: categories });
    await prisma.product.createMany({ data: products });
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
