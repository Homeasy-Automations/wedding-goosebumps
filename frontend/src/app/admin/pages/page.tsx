import prisma from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

const STATIC_PAGES = [
  { title: "Home", slug: "/" },
  { title: "About", slug: "/about" },
  { title: "Offerings", slug: "/offerings" },
  { title: "Galleries", slug: "/galleries" },
  { title: "Inquire", slug: "/inquire" },
];

export default async function PagesList() {
  // Sync static pages dynamically
  for (const p of STATIC_PAGES) {
    await prisma.page.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        title: p.title,
        slug: p.slug,
        status: "Published",
      }
    });
  }

  const pages = await prisma.page.findMany({
    orderBy: { createdAt: "asc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Static Pages SEO</h1>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">Title</th>
                <th className="px-6 py-4 font-medium text-gray-900">Slug</th>
                <th className="px-6 py-4 font-medium text-gray-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {pages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{page.title}</td>
                  <td className="px-6 py-4 text-gray-500">{page.slug}</td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/admin/pages/${page.id}`}>
                      <Button variant="outline" size="sm">Manage SEO</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
