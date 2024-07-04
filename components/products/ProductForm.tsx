import { prisma } from "@/src/lib/prisma";
import ImageUpload from "./ImageUpload";

async function getCategories() {
  return await prisma.category.findMany();
}

export default async function ProductForm() {
  const categories = await getCategories();
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="name">
          Nombre:
        </label>
        <input
          id="name"
          type="text"
          name="name"
          className="block w-full p-3 bg-slate-100 rounded-lg"
          placeholder="Nombre Producto"
        />
      </div>
      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="description">
          Descripción:
        </label>
        <input
          id="description"
          type="text"
          name="description"
          className="block w-full p-3 bg-slate-100 rounded-lg"
          placeholder="Descripción Producto"
        />
      </div>

      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="price">
          Precio:
        </label>
        <input
          id="price"
          name="price"
          className="block w-full p-3 bg-slate-100 rounded-lg"
          placeholder="Precio Producto"
        />
      </div>

      <div className="space-y-2">
        <label className="text-slate-800" htmlFor="categoryId">
          Categoría:
        </label>
        <select
          className="block w-full p-3 bg-slate-100 rounded-lg"
          id="categoryId"
          name="categoryId"
        >
          <option value="">-- Seleccione --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <ImageUpload />
    </div>
  );
}
