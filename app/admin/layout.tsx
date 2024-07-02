import AdminSidebar from "@/components/admin/AdminSidebar";
import { Toaster } from "react-hot-toast";
import { outfit } from "@/fonts/OutfitFont";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className={`md:flex ${outfit.className}`}>
        <aside className="md:w-72 md:h-screen bg-white shadow">
          <AdminSidebar />
        </aside>

        <main className="md:flex-1 md:h-screen md:overflow-y-scroll bg-gray-100 p-5">
          {children}
        </main>
      </div>
    </>
  );
}
