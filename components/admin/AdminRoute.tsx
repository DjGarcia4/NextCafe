"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRouteProps = {
  link: {
    url: string;
    text: string;
    blank: boolean;
  };
};

const AdminRoute = ({ link }: AdminRouteProps) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(link.url);
  return (
    <Link
      href={link.url}
      className={`${
        isActive ? "text-orange-400" : "text-slate-700"
      } flex w-full pl-10 py-5 items-center gap-4 hover:text-orange-400`}
      target={link.blank ? "_blank" : ""}
    >
      {link.text}
    </Link>
  );
};

export default AdminRoute;
