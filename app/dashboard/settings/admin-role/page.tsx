"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { roles, loadRoles, addRole, removeRole } from "@/lib/mock-admin-roles"

export default function AdminRolePage() {
  const [list, setList] = useState(roles)
  const [name, setName] = useState("")
  useEffect(() => {
    loadRoles()
    setList([...roles])
  }, [])

  const handleAdd = () => {
    if (!name) return
    addRole({ name, permissions: {} })
    setName("")
    setList([...roles])
  }

  const handleDelete = (id: string) => {
    if (confirm("ลบ role นี้?")) {
      removeRole(id)
      setList([...roles])
    }
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Admin Roles</h1>
      <div className="flex gap-2">
        <Input placeholder="Role name" value={name} onChange={e=>setName(e.target.value)} />
        <Button onClick={handleAdd}>เพิ่ม</Button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-left">ชื่อ</th>
            <th className="p-2 text-right">ลบ</th>
          </tr>
        </thead>
        <tbody>
          {list.map(r => (
            <tr key={r.id} className="border-b hover:bg-muted/50">
              <td className="p-2">{r.name}</td>
              <td className="p-2 text-right">
                <Button variant="destructive" size="sm" onClick={()=>handleDelete(r.id)}>ลบ</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
