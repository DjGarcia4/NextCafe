/*
  Warnings:

  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- Agrega una columna 'description' con un valor predeterminado
ALTER TABLE "Product" ADD COLUMN "description" TEXT NOT NULL DEFAULT 'Sin descripción';

-- Remueve el valor predeterminado de la columna 'description'
ALTER TABLE "Product" ALTER COLUMN "description" DROP DEFAULT;
