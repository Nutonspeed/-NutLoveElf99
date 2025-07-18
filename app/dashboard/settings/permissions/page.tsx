"use client"
import { useState } from 'react'
import { getAdmins } from '@/lib/mock-admins'
import { Button } from '@/components/ui/buttons/button'
import { toast } from 'sonner'

export default function PermissionsPreviewPage() {
  const [admins] = useState(getAdmins())

  const exportCsv = () => {
    toast.success('Exported CSV')
  }

  const canRead = (role: string) => role === 'read' || role === 'write' || role === 'manage'
  const canWrite = (role: string) => role === 'write' || role === 'manage'
  const canManage = (role: string) => role === 'manage'

  return (
    <div className="container mx-auto space-y-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">สรุปสิทธิ์การเข้าถึง</h1>
        <Button onClick={exportCsv}>Export CSV</Button>
      </div>
      <table className="w-full table-auto border">
        <thead className="bg-muted">
          <tr>
            <th className="p-2 text-left">ชื่อ</th>
            <th className="p-2 text-center">อ่าน</th>
            <th className="p-2 text-center">เขียน</th>
            <th className="p-2 text-center">จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(a => (
            <tr key={a.id} className="border-t">
              <td className="p-2">{a.name}</td>
              <td className="p-2 text-center">{canRead(a.role) ? '✓' : ''}</td>
              <td className="p-2 text-center">{canWrite(a.role) ? '✓' : ''}</td>
              <td className="p-2 text-center">{canManage(a.role) ? '✓' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
