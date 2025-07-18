"use client"
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/buttons/button'
import { getAdmins, deleteAdmin } from '@/lib/mock-admins'
import { toast } from 'sonner'

export default function AdminListPage() {
  const [admins, setAdmins] = useState(getAdmins())

  const handleDelete = (id: string) => {
    deleteAdmin(id)
    setAdmins(getAdmins())
    toast.success('ลบแล้ว')
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ผู้ดูแลระบบ</h1>
        <Link href="/dashboard/settings/admins/add"><Button>เพิ่มแอดมิน</Button></Link>
      </div>
      {admins.length ? (
        <table className="w-full table-auto border">
          <thead className="bg-muted">
            <tr>
              <th className="p-2 text-left">ชื่อ</th>
              <th className="p-2 text-left">อีเมล</th>
              <th className="p-2 text-left">สิทธิ์</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {admins.map(a => (
              <tr key={a.id} className="border-t">
                <td className="p-2">{a.name}</td>
                <td className="p-2">{a.email}</td>
                <td className="p-2">{a.role}</td>
                <td className="p-2 space-x-2">
                  <Link href={`/dashboard/settings/admins/edit/${a.id}`}><Button size="sm">แก้ไข</Button></Link>
                  <Button size="sm" variant="destructive" onClick={()=>handleDelete(a.id)}>ลบ</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-muted-foreground">ไม่มีผู้ดูแลระบบ</p>
      )}
    </div>
  )
}
