"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import {
  loadAdminUsers,
  adminUsers,
  removeAdmin,
} from "@/lib/mock-admin-users";

function permLabel(p: { read: boolean; write: boolean; manage: boolean }) {
  const arr = [] as string[];
  if (p.manage) arr.push("จัดการ");
  if (p.write) arr.push("เขียน");
  if (p.read) arr.push("อ่าน");
  return arr.join(", ");
}

export default function AdminsPage() {
  const [list, setList] = useState(adminUsers);
  useEffect(() => {
    loadAdminUsers();
    setList([...adminUsers]);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("ลบผู้ใช้นี้?")) {
      removeAdmin(id);
      setList([...adminUsers]);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">รายชื่อแอดมิน</h1>
        <Link href="/dashboard/settings/admins/add">
          <Button>เพิ่มแอดมิน</Button>
        </Link>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">ชื่อ</th>
            <th className="p-2 text-left">อีเมล</th>
            <th className="p-2 text-left">สิทธิ์</th>
            <th className="p-2 text-right">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {list.map((a) => (
            <tr key={a.id} className="border-b hover:bg-muted/50">
              <td className="p-2">{a.name}</td>
              <td className="p-2">{a.email}</td>
              <td className="p-2">{permLabel(a.permissions)}</td>
              <td className="space-x-2 p-2 text-right">
                <Link href={`/dashboard/settings/admins/edit/${a.id}`}>
                  <Button size="sm" variant="outline">
                    แก้ไข
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(a.id)}
                >
                  ลบ
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
