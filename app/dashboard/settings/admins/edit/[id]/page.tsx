"use client"
import { useRouter, useParams } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/inputs/input'
import { Button } from '@/components/ui/buttons/button'
import { getAdmin, updateAdmin } from '@/lib/mock-admins'
import { toast } from 'sonner'

export default function EditAdminPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const admin = getAdmin(params.id)
  const [name, setName] = useState(admin?.name || '')
  const [email, setEmail] = useState(admin?.email || '')
  const [role, setRole] = useState<'read' | 'write' | 'manage'>(admin?.role || 'read')

  if (!admin) return <div className="p-8">ไม่พบผู้ใช้งาน</div>

  const handleSave = () => {
    updateAdmin(admin.id, { name, email, role })
    toast.success('บันทึกแล้ว')
    router.push('/dashboard/settings/admins')
  }

  const handleReset = () => toast.success('ส่งลิงก์รีเซ็ตรหัสผ่านแล้ว')

  const disabled = !name.trim() || !email.trim()

  return (
    <div className="container mx-auto space-y-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold">แก้ไขแอดมิน</h1>
      <Input value={name} onChange={e=>setName(e.target.value)} />
      <Input value={email} onChange={e=>setEmail(e.target.value)} />
      <select value={role} onChange={e=>setRole(e.target.value as any)} className="w-full rounded border p-2">
        <option value="read">อ่าน</option>
        <option value="write">เขียน</option>
        <option value="manage">จัดการ</option>
      </select>
      <div className="flex gap-2">
        <Button onClick={handleSave} disabled={disabled}>Save</Button>
        <Button variant="outline" onClick={handleReset}>Reset Password</Button>
      </div>
    </div>
  )
}
