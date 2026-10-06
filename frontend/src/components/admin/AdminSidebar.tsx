"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  LogOut,
  MessageSquare,
  Loader2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Pages",
    href: "/admin/pages",
    icon: FileText,
  },
  {
    title: "Events (Blog)",
    icon: MessageSquare,
    children: [
      {
        title: "All Posts",
        href: "/admin/blog",
      },
      {
        title: "Add New",
        href: "/admin/blog/new",
      },
      // {
      //   title: "Categories",
      //   href: "/admin/blog/categories",
      // },
    ],
  },
  {
    title: "Leads",
    href: "/admin/leads",
    icon: Users,
  },
  {
    title: "SEO",
    href: "/admin/seo",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [loadingHref, setLoadingHref] = useState("");
  const [isPending, startTransition] = useTransition();

  const [openMenus, setOpenMenus] = useState({
    Blog: pathname.startsWith("/admin/blog"),
  });

  const navigate = (href: string) => {
    if (pathname === href) return;

    setLoadingHref(href);

    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">CMS Panel</h2>
      </div>

      <nav className="mt-6 space-y-2 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          // ==========================
          // Dropdown Menu
          // ==========================
          if (item.children) {
            const isOpen = openMenus[item.title as keyof typeof openMenus];

            return (
              <div key={item.title}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenMenus((prev) => ({
                      ...prev,
                      [item.title]: !isOpen,
                    }))
                  }
                  className="flex w-full items-center justify-between rounded-md px-4 py-2 text-gray-700 transition hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <Icon className="mr-3 h-5 w-5" />

                    {item.title}
                  </div>

                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-300 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="mt-1 ml-6 space-y-1 border-l pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={(e) => {
                          if (pathname === child.href) return;

                          e.preventDefault();

                          navigate(child.href);
                        }}
                        className={`flex items-center rounded-md px-3 py-2 text-sm transition ${
                          pathname === child.href
                            ? "bg-blue-50 font-medium text-blue-600"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <div className="mr-2 flex h-4 w-4 items-center justify-center">
                          {isPending && loadingHref === child.href ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-gray-400" />
                          )}
                        </div>

                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          // ==========================
          // Normal Menu
          // ==========================
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => {
                if (pathname === item.href) return;

                e.preventDefault();

                navigate(item.href);
              }}
              className={`flex items-center rounded-md px-4 py-2 transition-all duration-200 ${
                pathname === item.href
                  ? "bg-blue-50 font-medium text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="mr-3 flex h-5 w-5 items-center justify-center">
                {isPending && loadingHref === item.href ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>

              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 w-64 p-4">
        <Link
          href="/api/auth/signout"
          className="flex items-center rounded-md px-4 py-2 text-red-600 hover:bg-red-50"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Sign Out
        </Link>
      </div>
    </>
  );
}
