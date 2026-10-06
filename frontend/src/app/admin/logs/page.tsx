import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function ActivityLogsList() {
  const logs = await prisma.activityLog.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: true },
    take: 100 // show last 100 for now
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Activity Logs</h1>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">Date</th>
                <th className="px-6 py-4 font-medium text-gray-900">User</th>
                <th className="px-6 py-4 font-medium text-gray-900">Action</th>
                <th className="px-6 py-4 font-medium text-gray-900">Module</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {logs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No activity logs found.
                  </td>
                </tr>
              )}
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500">
                    {log.createdAt.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {log.user?.email || 'System'}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {log.module}
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
