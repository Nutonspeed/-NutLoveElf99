"use client"
import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useAuthStore } from '@/contexts/auth-store'

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
}

export default function SwitchUserPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const { setUser } = useAuthStore()

  useEffect(() => {
    fetch('/mock/store/users.json')
      .then(r => r.json())
      .then(setUsers)
      .catch(console.error)
  }, [])

  const handleSelect = (id: string) => {
    const u = users.find(user => user.id === id)
    if (u) setUser(u as any)
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Switch Admin User</h1>
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="Choose user" />
        </SelectTrigger>
        <SelectContent>
          {users.map(u => (
            <SelectItem key={u.id} value={u.id}>
              {u.name} ({u.role})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
