import Link from "next/link";

type ProductsPaginationProps = {
  page: number;
  totalPages: number;
};

const ProductsPagination = ({ page, totalPages }: ProductsPaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav className="flex justify-end gap-2 items-center">
      {page > 1 && (
        <Link
          href={`/admin/products?page=${page - 1}`}
          className="border border-orange-400 text-orange-400 rounded-lg hover:text-white p-2 hover:bg-orange-400 transition-colors cursor-pointer px-4 py-2"
        >
          &laquo;
        </Link>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={`/admin/products?page=${p}`}
          className={`${
            page === p
              ? "text-white bg-orange-400 ring-inset focus:z-20 focus:outline-offset-9 shadow"
              : "border border-orange-400 text-orange-400 rounded-full hover:text-white p-2 hover:bg-orange-400 transition-colors cursor-pointer"
          } rounded-lg px-4 py-2 text-1xl`}
        >
          {p}
        </Link>
      ))}
      {page < totalPages && (
        <Link
          href={`/admin/products?page=${page + 1}`}
          className="border border-orange-400 text-orange-400 rounded-lg hover:text-white p-2 hover:bg-orange-400 transition-colors cursor-pointer px-4 py-2"
        >
          &raquo;
        </Link>
      )}
    </nav>
  );
};

export default ProductsPagination;
