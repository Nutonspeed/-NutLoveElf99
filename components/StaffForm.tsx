"use client"
import { useState } from 'react'
import { Input } from '@/components/ui/inputs/input'
import { Button } from '@/components/ui/buttons/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface StaffFormData {
  name: string
  username: string
  password: string
  role: 'admin' | 'staff'
  active: boolean
}

export default function StaffForm({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (data: StaffFormData) => void
  defaultValues?: Partial<StaffFormData>
}) {
  const [name, setName] = useState(defaultValues?.name || '')
  const [username, setUsername] = useState(defaultValues?.username || '')
  const [password, setPassword] = useState(defaultValues?.password || '')
  const [role, setRole] = useState<'admin' | 'staff'>(defaultValues?.role || 'staff')
  const [active, setActive] = useState(defaultValues?.active ?? true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !username || !password) return
    onSubmit({ name, username, password, role, active })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input placeholder="ชื่อ" value={name} onChange={e => setName(e.target.value)} />
      <Input placeholder="ชื่อผู้ใช้" value={username} onChange={e => setUsername(e.target.value)} />
      <Input type="password" placeholder="รหัสผ่าน" value={password} onChange={e => setPassword(e.target.value)} />
      <Select value={role} onValueChange={v => setRole(v as 'admin' | 'staff')}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="เลือกบทบาท" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">admin</SelectItem>
          <SelectItem value="staff">staff</SelectItem>
        </SelectContent>
      </Select>
      <label className="flex items-center space-x-2">
        <Checkbox checked={active} onCheckedChange={() => setActive(!active)} />
        <span>ใช้งานอยู่</span>
      </label>
      <Button type="submit" className="w-full">บันทึก</Button>
    </form>
  )
}
