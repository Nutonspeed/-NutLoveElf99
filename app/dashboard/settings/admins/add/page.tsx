"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/inputs/input'
import { Button } from '@/components/ui/buttons/button'
import { addAdmin } from '@/lib/mock-admins'
import { toast } from 'sonner'

export default function AddAdminPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<'read' | 'write' | 'manage'>('read')

  const disabled = !name.trim() || !email.trim()

  const handleSave = () => {
    addAdmin({ name, email, role })
    toast.success('เพิ่มแอดมินแล้ว')
    router.push('/dashboard/settings/admins')
  }

  return (
    <div className="container mx-auto space-y-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold">เพิ่มแอดมินใหม่</h1>
      <Input placeholder="ชื่อ" value={name} onChange={e=>setName(e.target.value)} />
      <Input placeholder="อีเมล" value={email} onChange={e=>setEmail(e.target.value)} />
      <select value={role} onChange={e=>setRole(e.target.value as any)} className="w-full rounded border p-2">
        <option value="read">อ่าน</option>
        <option value="write">เขียน</option>
        <option value="manage">จัดการ</option>
      </select>
      <Button onClick={handleSave} disabled={disabled}>Save</Button>
    </div>
  )
}
