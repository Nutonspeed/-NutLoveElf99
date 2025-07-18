"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/buttons/button";
import { downloadCSV } from "@/lib/mock-export";
import { loadAdminUsers, adminUsers } from "@/lib/mock-admin-users";

export default function PermissionsPage() {
  const [list, setList] = useState(adminUsers);
  useEffect(() => {
    loadAdminUsers();
    setList([...adminUsers]);
  }, []);

  const rows = list.map((a) => ({
    name: a.name,
    email: a.email,
    read: a.permissions.read ? "yes" : "",
    write: a.permissions.write ? "yes" : "",
    manage: a.permissions.manage ? "yes" : "",
  }));

  const handleExport = () => downloadCSV(rows, "permissions.csv");

  return (
    <div className="container mx-auto space-y-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ภาพรวมสิทธิ์</h1>
        <Button variant="outline" onClick={handleExport}>
          Export CSV
        </Button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">ชื่อ</th>
            <th className="p-2 text-left">อีเมล</th>
            <th className="p-2 text-center">อ่าน</th>
            <th className="p-2 text-center">เขียน</th>
            <th className="p-2 text-center">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {list.map((a) => (
            <tr key={a.id} className="border-b hover:bg-muted/50">
              <td className="p-2">{a.name}</td>
              <td className="p-2">{a.email}</td>
              <td className="p-2 text-center">{a.permissions.read ? "✓" : ""}</td>
              <td className="p-2 text-center">{a.permissions.write ? "✓" : ""}</td>
              <td className="p-2 text-center">{a.permissions.manage ? "✓" : ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
