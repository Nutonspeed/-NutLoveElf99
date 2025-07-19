"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/buttons/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { loadAdminUsers, getAdminById, updateAdmin } from "@/lib/mock-admin-users"
import { loadRoles, roles } from "@/lib/mock-admin-roles"

export default function MemberRolePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [user, setUser] = useState<{ id: string; name: string; role: string } | null>(null)
  const [roleId, setRoleId] = useState("")

  useEffect(() => {
    loadAdminUsers()
    loadRoles()
    const u = getAdminById(params.id)
    if (u) {
      setUser(u as any)
      setRoleId(u.role || "")
    }
  }, [params.id])

  const handleSave = () => {
    if (!user) return
    updateAdmin(user.id, { role: roleId })
    alert("บันทึกแล้ว")
    router.push("/dashboard/settings/admins")
  }

  if (!user) return <div className="container mx-auto py-8">ไม่พบผู้ใช้</div>

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">กำหนดบทบาทให้ {user.name}</h1>
      <Select value={roleId} onValueChange={setRoleId}>
        <SelectTrigger className="w-52">
          <SelectValue placeholder="เลือก role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map(r => (
            <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleSave}>บันทึก</Button>
    </div>
  )
}
