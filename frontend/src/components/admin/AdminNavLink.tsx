"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Props {
  href: string;
  title: string;
  icon: LucideIcon;
}

export default function AdminNavLink({ href, title, icon: Icon }: Props) {
  const pathname = usePathname();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  return (
    <Link
      href={href}
      onClick={() => {
        if (pathname !== href) {
          setLoading(true);
        }
      }}
      className={`flex items-center rounded-md px-4 py-2 transition-all duration-200 ${
        pathname === href
          ? "bg-blue-50 font-medium text-blue-600"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {loading ? (
        <Loader2 className="mr-3 h-5 w-5 animate-spin" />
      ) : (
        <Icon className="mr-3 h-5 w-5" />
      )}

      {title}
    </Link>
  );
}
