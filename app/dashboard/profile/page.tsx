"use client"
import { useState } from "react"
import Guard from "@/components/Guard"
import { useAuth } from "@/contexts/auth-context"
import { useAuthStore } from "@/contexts/auth-store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"

export default function AdminProfilePage() {
  const { user } = useAuth()
  const { setUser } = useAuthStore()
  const [name, setName] = useState(user?.name || "")
  const [password, setPassword] = useState("")

  if (!user) return <div className="p-4">Loading...</div>

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setUser({ ...user, name })
    alert("Saved (mock)")
  }

  return (
    <Guard role={["admin", "staff"]}>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Edit Info</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-sm" htmlFor="name">Name</label>
                <Input id="name" value={name} onChange={(e)=>setName(e.target.value)} />
              </div>
              <div>
                <label className="text-sm" htmlFor="pass">Password</label>
                <Input id="pass" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
              </div>
              <Button type="submit">Save</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Guard>
  )
}
