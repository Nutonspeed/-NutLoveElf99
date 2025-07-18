"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/inputs/input";
import { Button } from "@/components/ui/buttons/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  loadAdminUsers,
  getAdminById,
  updateAdmin,
} from "@/lib/mock-admin-users";

export default function EditAdminPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [perm, setPerm] = useState({ read: true, write: false, manage: false });

  useEffect(() => {
    loadAdminUsers();
    const admin = getAdminById(id);
    if (admin) {
      setName(admin.name);
      setEmail(admin.email);
      setPerm(admin.permissions);
    }
  }, [id]);

  const handleSave = () => {
    updateAdmin(id, { name, email, permissions: perm });
    alert("บันทึกแล้ว");
    router.push("/dashboard/settings/admins");
  };

  const handleReset = () => {
    alert("ส่งลิงก์รีเซ็ตรหัสแล้ว");
  };

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">แก้ไขแอดมิน</h1>
      <Input placeholder="ชื่อ" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="อีเมล" value={email} onChange={(e) => setEmail(e.target.value)} />
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="read" checked={perm.read} onCheckedChange={(v) => setPerm({ ...perm, read: Boolean(v) })} />
          <Label htmlFor="read">อ่าน</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="write" checked={perm.write} onCheckedChange={(v) => setPerm({ ...perm, write: Boolean(v) })} />
          <Label htmlFor="write">เขียน</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="manage" checked={perm.manage} onCheckedChange={(v) => setPerm({ ...perm, manage: Boolean(v) })} />
          <Label htmlFor="manage">จัดการ</Label>
        </div>
      </div>
      <div className="space-x-2">
        <Button onClick={handleSave}>บันทึก</Button>
        <Button variant="outline" onClick={handleReset}>รีเซ็ตรหัสผ่าน</Button>
      </div>
    </div>
  );
}
