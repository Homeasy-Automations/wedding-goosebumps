import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Providers } from "@/components/providers";
import Link from "next/link";
import { LayoutDashboard, FileText, Settings, Users, LogOut, MessageSquare } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <Providers>
      <div className="flex min-h-screen bg-gray-100">
        <aside className="w-64 bg-white shadow-md">
          <AdminSidebar />
        </aside>
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </Providers>
  );
}
